import { useEffect, useState } from "react";

export default function AdminInvoices() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const res = await fetch(`${API_BASE}/api/customers`);
      const data = await res.json();

      let customersArray = [];
      if (Array.isArray(data)) customersArray = data;
      else if (Array.isArray(data.data)) customersArray = data.data;
      else if (Array.isArray(data.rows)) customersArray = data.rows;
      else if (typeof data === "object") {
        const arr = Object.values(data).find((v) => Array.isArray(v));
        customersArray = arr || [];
      }

      setCustomers(customersArray);
    } catch (err) {
      console.error("❌ Failed to load customers:", err);
      setCustomers([]);
    }
  }

  async function loadOrders(customerId = "") {
    setLoading(true);
    try {
      const url = customerId
        ? `${API_BASE}/api/customers/${customerId}/orders`
        : `${API_BASE}/api/orders`;
      const res = await fetch(url);
      const data = await res.json();

      const ordersArray =
        data.orders || data.data || data.rows || (Array.isArray(data) ? data : []);
      setOrders(ordersArray);
    } catch (err) {
      console.error("❌ Failed to load orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  function previewInvoice(orderId, type) {
    window.open(`${API_BASE}/api/orders/${orderId}/invoice/${type}`, "_blank");
  }

  async function sendInvoice(orderId, type) {
    if (!confirm(`Send ${type} invoice?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}/invoice/${type}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Send failed");
      alert(`✅ ${type} invoice sent.`);
      loadOrders(selectedCustomer);
    } catch (err) {
      alert("❌ Failed to send invoice.");
    }
  }

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-pjh-blue">Invoices</h1>
          <p className="text-pjh-muted">
            Filter invoices by customer and send deposit/balance statements.
          </p>
        </div>
        <a href="/admin/dashboard" className="text-sm text-pjh-muted hover:text-pjh-blue">
          ← Dashboard
        </a>
      </header>

      {/* === CUSTOMER SELECT === */}
      <div className="bg-pjh-gray p-6 rounded-xl mb-6">
        <label className="block text-sm font-semibold mb-2">Select Customer</label>
        <select
          value={selectedCustomer}
          onChange={(e) => {
            setSelectedCustomer(e.target.value);
            loadOrders(e.target.value);
          }}
          className="form-input w-full sm:w-1/2"
        >
          <option value="">— Show All Customers —</option>
          {Array.isArray(customers) &&
            customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.business || c.name || "Unnamed"}
              </option>
            ))}
        </select>
      </div>

      {/* === TABLE === */}
      {loading ? (
        <p className="text-pjh-muted animate-pulse">Loading invoices...</p>
      ) : orders.length === 0 ? (
        <p className="text-pjh-muted">No orders found for this customer.</p>
      ) : (
        <table className="min-w-full border border-white/10 rounded-lg">
          <thead className="bg-pjh-gray/60">
            <tr className="text-left text-sm text-pjh-muted">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Project</th>
              <th className="p-3">Deposit</th>
              <th className="p-3">Balance</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-white/5">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.customer_business || o.customer_name}</td>
                <td className="p-3">{o.title}</td>
                <td className="p-3">£{Number(o.deposit || 0).toFixed(2)}</td>
                <td className="p-3">£{Number(o.balance || 0).toFixed(2)}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => previewInvoice(o.id, "deposit")}
                    className="text-pjh-cyan hover:underline"
                  >
                    View Deposit
                  </button>
                  <button
                    onClick={() => previewInvoice(o.id, "balance")}
                    className="text-pjh-cyan hover:underline"
                  >
                    View Balance
                  </button>
                  <button
                    onClick={() => sendInvoice(o.id, "deposit")}
                    className="text-green-400 hover:text-green-500"
                  >
                    Send Deposit
                  </button>
                  <button
                    onClick={() => sendInvoice(o.id, "balance")}
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    Send Balance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
