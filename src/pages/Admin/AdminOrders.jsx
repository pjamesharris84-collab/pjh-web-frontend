import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") window.location.href = "/admin";
  }, []);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders`);
      const data = await res.json();
      setOrders(data.data || []);
    } catch {
      alert("❌ Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function loadPayments(orderId) {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}/payments`);
      const data = await res.json();
      setPayments(data);
      setSelectedOrder(orderId);
    } catch {
      alert("❌ Failed to load payments");
    }
  }

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-pjh-blue">Manage Orders</h1>
          <p className="text-pjh-muted">Track payments and balances in real time.</p>
        </div>
        <a href="/admin/dashboard" className="text-sm text-pjh-muted hover:text-pjh-blue">← Dashboard</a>
      </header>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="min-w-full border border-white/10 rounded-lg">
          <thead className="bg-pjh-gray/60">
            <tr className="text-left text-sm text-pjh-muted">
              <th className="p-3">Order ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Deposit</th>
              <th className="p-3">Outstanding</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-white/5">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.title}</td>
                <td className="p-3">{o.customer_business || o.customer_name}</td>
                <td className="p-3">£{Number(o.deposit || 0).toFixed(2)}</td>
                <td className="p-3">£{Number(o.balance || 0).toFixed(2)}</td>
                <td className="p-3 capitalize">{o.status}</td>
                <td className="p-3 text-right">
                  <button onClick={() => loadPayments(o.id)} className="text-pjh-blue hover:underline">Payments</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedOrder && payments && (
        <div className="bg-pjh-gray p-6 rounded-xl mt-10">
          <h2 className="text-xl font-semibold mb-4">Payments for Order #{selectedOrder}</h2>
          <p className="text-pjh-muted mb-4">
            Paid: £{Number(payments.paid).toFixed(2)} | Outstanding: £
            {Number(payments.outstanding).toFixed(2)}
          </p>
          {payments.payments?.length ? (
            <ul className="space-y-2">
              {payments.payments.map((p) => (
                <li key={p.id} className="bg-pjh-slate p-3 rounded-md flex justify-between text-sm">
                  <span>{p.type.toUpperCase()} – {p.method} ({p.reference})</span>
                  <span>£{Number(p.amount).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-pjh-muted">No payments yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
