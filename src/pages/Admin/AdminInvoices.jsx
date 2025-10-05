import { useEffect, useState } from "react";

export default function AdminInvoices() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔐 Protect access
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  // 🧾 Load all orders
  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data && Array.isArray(data.rows)) {
        setOrders(data.rows);
      } else {
        console.warn("⚠️ Unexpected orders response:", data);
        setOrders([]);
      }
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      setError("Failed to load invoices. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  // 👁️ Preview invoice PDF
  function previewInvoice(orderId, type) {
    window.open(
      `http://localhost:5000/api/orders/${orderId}/invoice/${type}`,
      "_blank"
    );
  }

  // 📤 Send invoice via email
  async function sendInvoice(orderId, type) {
    if (!confirm(`Send ${type} invoice to this customer?`)) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${orderId}/invoice/${type}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Failed to send invoice");
      alert(`✅ ${type.toUpperCase()} invoice sent successfully.`);
      loadOrders(); // Refresh status flags after send
    } catch (err) {
      console.error("❌ Error sending invoice:", err);
      alert(`❌ Failed to send ${type} invoice.`);
    }
  }

  // 💰 View payments for context
  async function viewPayments(orderId) {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${orderId}/payments`
      );
      const data = await res.json();
      if (!data || typeof data.paid !== "number") {
        throw new Error("Invalid payment data");
      }
      alert(
        `💳 Payments for Order #${orderId}\n\nPaid: £${data.paid.toFixed(
          2
        )}\nOutstanding: £${data.outstanding.toFixed(2)}`
      );
    } catch (err) {
      console.error("❌ Error loading payments:", err);
      alert("❌ Failed to fetch payments for this order.");
    }
  }

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      {/* === HEADER === */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-pjh-blue">Invoices</h1>
          <p className="text-pjh-muted">
            Manage and send deposit or balance invoices for all projects.
          </p>
        </div>
        <a
          href="/admin/dashboard"
          className="text-sm text-pjh-muted hover:text-pjh-blue transition"
        >
          ← Back to Dashboard
        </a>
      </header>

      {/* === CONTENT === */}
      {loading ? (
        <p className="text-pjh-muted animate-pulse">Loading invoices...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-pjh-muted">No orders with invoices yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/10 rounded-lg">
            <thead className="bg-pjh-gray/60">
              <tr className="text-left text-sm text-pjh-muted">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Project</th>
                <th className="p-3">Deposit</th>
                <th className="p-3">Balance</th>
                <th className="p-3">Deposit Invoiced</th>
                <th className="p-3">Balance Invoiced</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-white/5">
                  <td className="p-3">{o.id}</td>
                  <td className="p-3">
                    {o.customer_business || o.customer_name || "—"}
                  </td>
                  <td className="p-3">{o.title || "Untitled"}</td>
                  <td className="p-3">£{Number(o.deposit || 0).toFixed(2)}</td>
                  <td className="p-3">£{Number(o.balance || 0).toFixed(2)}</td>
                  <td className="p-3">
                    {o.deposit_invoiced ? (
                      <span className="text-green-400">✅ Yes</span>
                    ) : (
                      <span className="text-pjh-muted">❌ No</span>
                    )}
                  </td>
                  <td className="p-3">
                    {o.balance_invoiced ? (
                      <span className="text-green-400">✅ Yes</span>
                    ) : (
                      <span className="text-pjh-muted">❌ No</span>
                    )}
                  </td>

                  <td className="p-3 text-right flex flex-wrap justify-end gap-2">
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
                    <button
                      onClick={() => viewPayments(o.id)}
                      className="text-pjh-blue hover:underline"
                    >
                      Payments
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* === FOOTER === */}
      <footer className="mt-16 text-center text-sm text-pjh-muted border-t border-white/10 pt-6">
        © {new Date().getFullYear()} PJH Web Services — Internal Dashboard
      </footer>
    </div>
  );
}
