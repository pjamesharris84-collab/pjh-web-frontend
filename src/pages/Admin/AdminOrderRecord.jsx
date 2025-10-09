/**
 * ============================================================
 * PJH Web Services — Admin Order Record (Enhanced)
 * ============================================================
 * - Loads order + payments
 * - Displays deposit/balance payment status + method
 * - Displays DD setup indicator
 * - Shows live DD payment schedule (monthly billing)
 * ============================================================
 */

import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function AdminOrderRecord() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [payments, setPayments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  // Auth guard + load
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
      return;
    }
    if (id) {
      loadOrder();
      loadPayments();
      loadSchedule();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadOrder() {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const o = data.data || data.order || {};

      o.items = parseMaybeJSON(o.items);
      o.tasks = parseMaybeJSON(o.tasks);
      o.diary = parseMaybeJSON(o.diary);
      setOrder(o);
    } catch (e) {
      console.error("❌ Failed to load order:", e);
      setError("Failed to load order details.");
    }
  }

  async function loadPayments() {
    try {
      const res = await fetch(`${API_BASE}/api/payments/order/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPayments(Array.isArray(data.data) ? data.data : []);
    } catch (e) {
      console.warn("⚠️ Failed to load payments:", e.message);
    }
  }

  async function loadSchedule() {
    try {
      const res = await fetch(`${API_BASE}/api/payments/schedule/${id}`);
      if (!res.ok) return;
      const data = await res.json();
      setSchedule(Array.isArray(data.schedule) ? data.schedule : []);
    } catch {
      /* ignore */
    }
  }

  function parseMaybeJSON(val) {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return Array.isArray(val) ? val : [];
  }

  // Quick overall figures
  const figures = useMemo(() => {
    if (!order)
      return { deposit: 0, balance: 0, total: 0, paid: 0, remaining: 0 };
    const deposit = Number(order.deposit || 0);
    const balance = Number(order.balance || 0);
    const total = deposit + balance;
    const paid = Number(order.total_paid || 0);
    const remaining = Math.max(total - paid, 0);
    return { deposit, balance, total, paid, remaining };
  }, [order]);

  // Payment helpers
  const depositPayment = payments.find((p) => p.type === "deposit");
  const balancePayment = payments.find((p) => p.type === "balance");
  const monthlyPayments = payments.filter((p) => p.type === "monthly");

  // Create a Checkout session
  async function handleCreateCheckout(flow, type) {
    if (!order) return;
    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/payments/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, flow, type }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.open(data.url, "_blank", "noopener");
      } else {
        alert(`❌ Could not create checkout: ${data.error || "Unknown error"}`);
      }
    } catch (e) {
      console.error("❌ Checkout error:", e);
      alert("❌ Could not create Stripe Checkout session.");
    } finally {
      setWorking(false);
    }
  }

  async function handleRunBilling() {
    const amountStr = prompt("Enter monthly amount (£):", "50");
    if (!amountStr) return;
    const amount = Number(amountStr);
    if (!amount || amount <= 0) return alert("Please enter a positive amount.");

    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/payments/bill-recurring`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Billing failed");
      alert(data.message || "Billing run complete.");
      loadPayments();
    } catch (e) {
      console.error("❌ Billing error:", e);
      alert("❌ Billing run failed.");
    } finally {
      setWorking(false);
    }
  }

  if (error)
    return <div className="p-10 text-red-400">❌ {error}</div>;
  if (!order)
    return <div className="p-10 text-pjh-muted animate-pulse">Loading order…</div>;

  return (
    <div className="p-10 text-white bg-pjh-charcoal min-h-screen">
      <a
        href="/admin/orders"
        className="text-sm text-pjh-muted hover:text-pjh-blue transition"
      >
        ← Back to Orders
      </a>

      <div className="flex items-center justify-between mt-2 flex-wrap gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-pjh-blue">
          Order #{order.id} — {order.title}
        </h1>
        <span
          className={`px-3 py-1 rounded text-xs font-semibold ${
            order.status === "completed"
              ? "bg-green-500/20 text-green-300 border border-green-400/30"
              : order.status === "cancelled"
              ? "bg-red-500/20 text-red-300 border border-red-400/30"
              : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Totals */}
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Deposit" value={`£${figures.deposit.toFixed(2)}`} />
        <SummaryCard label="Balance" value={`£${figures.balance.toFixed(2)}`} />
        <SummaryCard
          label="Paid"
          value={`£${figures.paid.toFixed(2)}`}
          accent="text-green-300"
        />
        <SummaryCard
          label="Remaining"
          value={`£${figures.remaining.toFixed(2)}`}
          accent="text-amber-300"
        />
      </div>

      {/* Payment Status */}
      <div className="mt-8 bg-pjh-slate p-6 rounded-xl border border-white/10 space-y-4">
        <h2 className="text-xl font-semibold text-pjh-blue">
          💰 Payment Status
        </h2>

        <StatusRow
          title="Deposit"
          paid={order.deposit_paid}
          method={depositPayment?.method}
          amount={depositPayment?.amount}
        />

        <StatusRow
          title="Balance"
          paid={order.balance_paid}
          method={balancePayment?.method}
          amount={balancePayment?.amount}
        />

        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-pjh-muted">Direct Debit:</span>
          {order.direct_debit_active ? (
            <span className="px-2 py-1 text-xs rounded bg-green-600/30 text-green-300 border border-green-500/20">
              ✅ Setup
            </span>
          ) : (
            <span className="px-2 py-1 text-xs rounded bg-red-600/30 text-red-300 border border-red-500/20">
              ❌ Not setup
            </span>
          )}
        </div>
      </div>

      {/* Direct Debit Schedule */}
      {order.direct_debit_active && (
        <div className="mt-8 bg-pjh-slate p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold text-pjh-blue mb-3">
            🔁 Direct Debit Schedule
          </h2>

          {schedule.length === 0 ? (
            <p className="text-pjh-muted text-sm">
              No recurring payments yet. Use “Run Monthly Billing” to trigger the
              first cycle.
            </p>
          ) : (
            <table className="min-w-full border border-white/10 text-sm">
              <thead className="bg-pjh-gray/60 text-pjh-muted">
                <tr>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Amount (£)</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((s, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="p-2">
                      {new Date(s.date).toLocaleDateString()}
                    </td>
                    <td className="p-2">{s.amount.toFixed(2)}</td>
                    <td className="p-2">
                      {s.paid ? (
                        <span className="text-green-400">Paid</span>
                      ) : (
                        <span className="text-amber-300">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => handleCreateCheckout("card_payment", "deposit")}
          disabled={working}
          className="btn bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          💳 Card — Deposit
        </button>
        <button
          onClick={() => handleCreateCheckout("card_payment", "balance")}
          disabled={working}
          className="btn bg-green-700 hover:bg-green-800 disabled:opacity-50"
        >
          💳 Card — Balance
        </button>
        <button
          onClick={() => handleCreateCheckout("bacs_payment", "deposit")}
          disabled={working}
          className="btn bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          🏦 Bacs — Deposit
        </button>
        <button
          onClick={() => handleCreateCheckout("bacs_payment", "balance")}
          disabled={working}
          className="btn bg-blue-700 hover:bg-blue-800 disabled:opacity-50"
        >
          🏦 Bacs — Balance
        </button>
        <button
          onClick={() => handleCreateCheckout("bacs_setup")}
          disabled={working}
          className="btn bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          🧾 Setup Direct Debit
        </button>
        <button
          onClick={handleRunBilling}
          disabled={working}
          className="btn bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
        >
          🔁 Run Monthly Billing
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Small components
============================================================ */

function SummaryCard({ label, value, accent }) {
  return (
    <div className="bg-pjh-gray rounded-xl p-4 border border-white/10">
      <div className="text-pjh-muted text-xs">{label}</div>
      <div className={`text-xl font-semibold ${accent || ""}`}>{value}</div>
    </div>
  );
}

function StatusRow({ title, paid, method, amount }) {
  return (
    <div className="flex justify-between items-center border-t border-white/10 pt-2 text-sm">
      <div className="text-pjh-muted">{title}</div>
      <div>
        {paid ? (
          <span className="text-green-400 font-medium">Paid</span>
        ) : (
          <span className="text-amber-300">Pending</span>
        )}
        {method && (
          <span className="ml-2 text-pjh-muted text-xs">
            ({method} {amount ? `£${Number(amount).toFixed(2)}` : ""})
          </span>
        )}
      </div>
    </div>
  );
}
