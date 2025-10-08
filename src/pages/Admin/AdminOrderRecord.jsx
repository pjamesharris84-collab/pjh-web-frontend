import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AdminOrderRecord() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [working, setWorking] = useState(false);
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    } else if (id) loadOrder();
  }, [id]);

  async function loadOrder() {
    const res = await fetch(`${API_BASE}/api/orders/${id}`);
    const data = await res.json();
    setOrder(data.data);
  }

  async function handleCreateCheckout(flow, type) {
    setWorking(true);
    const res = await fetch(`${API_BASE}/api/payments/create-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id, flow, type }),
    });
    const data = await res.json();
    if (data.url) window.open(data.url, "_blank");
    setWorking(false);
  }

  async function handleRunBilling() {
    const amount = prompt("Enter monthly amount (£):", "50");
    if (!amount) return;
    setWorking(true);
    const res = await fetch(`${API_BASE}/api/payments/bill-recurring`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    });
    const data = await res.json();
    alert(data.message || "Done");
    setWorking(false);
  }

  if (!order) return <div>Loading...</div>;

  return (
    <div className="p-10 text-white bg-pjh-charcoal min-h-screen">
      <h1 className="text-2xl font-bold text-pjh-blue mb-4">
        Order #{order.id} — {order.title}
      </h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => handleCreateCheckout("card_payment", "deposit")}
          className="btn bg-green-600 hover:bg-green-700"
        >
          💳 Card Deposit
        </button>
        <button
          onClick={() => handleCreateCheckout("bacs_payment", "deposit")}
          className="btn bg-blue-600 hover:bg-blue-700"
        >
          🏦 Bacs Deposit
        </button>
        <button
          onClick={() => handleCreateCheckout("bacs_setup")}
          className="btn bg-indigo-600 hover:bg-indigo-700"
        >
          🧾 Setup Direct Debit
        </button>
        <button
          onClick={handleRunBilling}
          className="btn bg-orange-600 hover:bg-orange-700"
        >
          🔁 Run Monthly Billing
        </button>
      </div>

      <p>Customer: {order.customer_name}</p>
      <p>Email: {order.email}</p>
      <p>Deposit: £{order.deposit}</p>
      <p>Balance: £{order.balance}</p>
    </div>
  );
}
