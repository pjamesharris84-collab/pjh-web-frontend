/**
 * ============================================================
 * PJH Web Services — Admin Invoices (Enhanced)
 * ============================================================
 * - Lists all customers + related orders
 * - Shows deposit, balance, paid-to-date, and balance due
 * - Allows previewing or sending deposit/balance invoices
 * - Pulls totals dynamically from backend
 * ============================================================
 */

import { useEffect, useState } from "react";

export default function AdminInvoices() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "https://pjh-web-backend-1.onrender.com";

  // ✅ Auth guard
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  // ✅ Load customers on mount
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

  // ✅ Load all or filtered orders
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

      // 🔁 Optionally fetch detailed totals for each order
      const enriched = await Promise.all(
        ordersArray.map(async (o) => {
          try {
            const r = await fetch(`${API_BASE}/api/orders/${o.id}`);
            if (!r.ok) return o;
            const d = await r.json();
            const ord = d.data || d.order || o;
            return {
              ...o,
              total_paid: ord.total_paid || 0,
              deposit: ord.deposit || 0,
              balance: ord.balance || 0,
              balance_due:
                (Number(ord.deposit || 0) + Number(ord.balance || 0)) -
                Number(ord.total_paid || 0),
            };
          } catch {
            return o;
          }
        })
      );

      setOrders(enriched);
    } catch (err) {
      console.error("❌ Failed to load orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  // === Invoice Actions ===
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

  // === UI ===
  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      {/* === HEADER === */}
      <header className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-pjh-blue">Invoices</h1>
          <p className="text-pjh-muted text-sm">
            Filter by customer and send deposit/balance invoices.
          </p>
        </div>
        <a
          href="/admin/dashboard"
          className="text-sm text-pjh-muted hover:text-pjh-blue"
        >
          ← Dashboard
        </a>
      </header>

      {/* === CUSTOMER SELECT === */}
      <div className="bg-pjh-gray p-6 rounded-xl mb-6 border border-white/10">
        <label className="block text-sm font-semibold mb-2">
          Select Customer
        </label>
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

      {/* === INVOICE TABLE === */}
      {loading ? (
        <p className="text-pjh-muted animate-pulse">Loading invoices...</p>
      ) : orders.length === 0 ? (
        <p className="text-pjh-muted">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/10 rounded-lg">
            <thead className="bg-pjh-gray/60">
              <tr className="text-left text-sm text-pjh-muted">
                <th className="p-3">Order #</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Project</th>
                <th className="p-3">Deposit (£)</th>
                <th className="p-3">Balance (£)</th>
                <th className="p-3">Paid to Date (£)</th>
                <th className="p-3">Balance Due (£)</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const paid = Number(o.total_paid || 0);
                const deposit = Number(o.deposit || 0);
                const balance = Number(o.balance || 0);
                const balanceDue = Math.max(deposit + balance - paid, 0);

                return (
                  <tr
                    key={o.id}
                    className="border-t border-white/5 hover:bg-pjh-gray/30 transition"
                  >
                    <td className="p-3">{o.id}</td>
                    <td className="p-3">
                      {o.customer_business || o.customer_name || "—"}
                    </td>
                    <td className="p-3">{o.title || "Untitled"}</td>
                    <td className="p-3">£{deposit.toFixed(2)}</td>
                    <td className="p-3">£{balance.toFixed(2)}</td>
                    <td className="p-3 text-green-300 font-medium">
                      £{paid.toFixed(2)}
                    </td>
                    <td className="p-3 text-amber-300 font-medium">
                      £{balanceDue.toFixed(2)}
                    </td>
                    <td className="p-3 text-right space-x-3 whitespace-nowrap">
                      <button
                        onClick={() => previewInvoice(o.id, "deposit")}
                        className="text-pjh-blue hover:underline text-sm"
                      >
                        View Deposit
                      </button>
                      <button
                        onClick={() => previewInvoice(o.id, "balance")}
                        className="text-pjh-blue hover:underline text-sm"
                      >
                        View Balance
                      </button>
                      <button
                        onClick={() => sendInvoice(o.id, "deposit")}
                        className="text-green-400 hover:text-green-500 text-sm"
                      >
                        Send Deposit
                      </button>
                      <button
                        onClick={() => sendInvoice(o.id, "balance")}
                        className="text-yellow-400 hover:text-yellow-500 text-sm"
                      >
                        Send Balance
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
