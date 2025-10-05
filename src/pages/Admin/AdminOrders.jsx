import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [payments, setPayments] = useState(null);
  const [error, setError] = useState("");

  // 🌍 Use Vercel/Render environment-aware backend
  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "https://pjh-web-backend.onrender.com"; // fallback if .env not configured

  // 🔐 Protect admin route
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  // 🧠 Load all orders on mount
  useEffect(() => {
    loadOrders();
  }, []);

  // ==========================
  // 📦 LOAD ORDERS
  // ==========================
  async function loadOrders() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/orders`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data && Array.isArray(data.rows)) {
        setOrders(data.rows);
      } else {
        console.warn("⚠️ Unexpected orders API format:", data);
        setOrders([]);
      }
    } catch (err) {
      console.error("❌ Error loading orders:", err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // ✅ TOGGLE TASK
  // ==========================
  async function toggleTask(orderId, task) {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });

      if (!res.ok) throw new Error("Failed to update tasks");
      await loadOrders();
    } catch (err) {
      console.error("❌ Error updating tasks:", err);
      alert("❌ Failed to update tasks");
    }
  }

  // ==========================
  // 💰 LOAD PAYMENTS
  // ==========================
  async function loadPayments(orderId) {
    setPayments(null);
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}/payments`);
      const data = await res.json();

      if (data && data.payments) {
        setPayments(data);
        setSelectedOrder(orderId);
      } else {
        console.warn("⚠️ Unexpected payments format:", data);
        alert("Could not load payments for this order.");
      }
    } catch (err) {
      console.error("❌ Error loading payments:", err);
      alert("❌ Failed to load payments");
    }
  }

  // ==========================
  // 💳 SEND INVOICE
  // ==========================
  async function sendInvoice(orderId, type) {
    if (!confirm(`Send ${type} invoice to customer?`)) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/orders/${orderId}/invoice/${type}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Failed to send invoice");
      alert(`✅ ${type.toUpperCase()} invoice sent successfully.`);
    } catch (err) {
      console.error("❌ Error sending invoice:", err);
      alert("❌ Failed to send invoice.");
    }
  }

  // ==========================
  // 👁️ PREVIEW INVOICE
  // ==========================
  function previewInvoice(orderId, type) {
    window.open(`${API_BASE}/api/orders/${orderId}/invoice/${type}`, "_blank");
  }

  // ==========================
  // 🕓 RENDER
  // ==========================
  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      {/* === HEADER === */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-pjh-blue">Manage Orders</h1>
          <p className="text-pjh-muted">
            View, track, and manage all active or completed orders.
          </p>
        </div>
        <a
          href="/admin/dashboard"
          className="text-sm text-pjh-muted hover:text-pjh-blue transition"
        >
          ← Back to Dashboard
        </a>
      </header>

      {/* === ERROR / LOADING STATES === */}
      {loading ? (
        <p className="text-pjh-muted animate-pulse">Loading orders...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-pjh-muted">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/10 rounded-lg">
            <thead className="bg-pjh-gray/60">
              <tr className="text-left text-sm text-pjh-muted">
                <th className="p-3">Order ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Deposit</th>
                <th className="p-3">Balance</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-white/5">
                  <td className="p-3">{o.id}</td>
                  <td className="p-3">{o.title || "Untitled"}</td>
                  <td className="p-3">
                    {o.customer_business || o.customer_name || "Unknown"}
                  </td>
                  <td className="p-3">£{Number(o.deposit || 0).toFixed(2)}</td>
                  <td className="p-3">£{Number(o.balance || 0).toFixed(2)}</td>
                  <td className="p-3 capitalize">{o.status}</td>

                  <td className="p-3 text-right flex flex-wrap justify-end gap-2">
                    <button
                      onClick={() => loadPayments(o.id)}
                      className="text-pjh-blue hover:underline"
                    >
                      Payments
                    </button>
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
                      className="text-green-400 hover:text-green-500 transition"
                    >
                      Send Deposit
                    </button>
                    <button
                      onClick={() => sendInvoice(o.id, "balance")}
                      className="text-yellow-400 hover:text-yellow-500 transition"
                    >
                      Send Balance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* === PAYMENTS PANEL === */}
      {selectedOrder && payments && (
        <div className="bg-pjh-gray p-6 rounded-xl mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Payments for Order #{selectedOrder}
          </h2>

          <p className="text-pjh-muted mb-4">
            Paid: £{Number(payments.paid || 0).toFixed(2)} | Outstanding: £
            {Number(payments.outstanding || 0).toFixed(2)}
          </p>

          {Array.isArray(payments.payments) &&
          payments.payments.length > 0 ? (
            <ul className="space-y-2">
              {payments.payments.map((p) => (
                <li
                  key={p.id}
                  className="bg-pjh-slate p-3 rounded-md text-sm flex justify-between"
                >
                  <span>
                    {p.type?.toUpperCase()} – {p.method || "Unknown"} (
                    {p.reference || "No ref"})
                  </span>
                  <span>£{Number(p.amount || 0).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-pjh-muted">No payments recorded yet.</p>
          )}
        </div>
      )}

      {/* === FOOTER === */}
      <footer className="mt-16 text-center text-sm text-pjh-muted border-t border-white/10 pt-6">
        © {new Date().getFullYear()} PJH Web Services — Internal Dashboard
      </footer>
    </div>
  );
}
