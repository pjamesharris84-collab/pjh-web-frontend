/**
 * ============================================================
 * PJH Web Services — Admin Order Record (Final 2025)
 * ============================================================
 * Features:
 *  ✅ Always synced with linked quote data
 *  ✅ Reflects real-time deposit, balance, and totals
 *  ✅ Displays Stripe/Bacs/DD payment status
 *  ✅ Supports Card + Bacs Checkout, DD setup, Billing, and Refunds
 *  ✅ Clean responsive layout with grouped action sections
 * ============================================================
 */

import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function AdminOrderRecord() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [linkedQuote, setLinkedQuote] = useState(null);
  const [payments, setPayments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  /* ============================================================
     🔐 Admin Guard + Initial Data Load
  ============================================================ */
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
  }, [id]);

  /* ============================================================
     🔁 Auto-refresh after Stripe redirect
  ============================================================ */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") refreshOrder();
  }, [id]);

  /* ============================================================
     🧱 Loaders
  ============================================================ */
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
      if (o.quote_id) await loadLinkedQuote(o.quote_id);
    } catch (e) {
      console.error("❌ Failed to load order:", e);
      setError("Failed to load order details.");
    }
  }

  async function loadLinkedQuote(quoteId) {
    try {
      const res = await fetch(`${API_BASE}/api/quotes/${quoteId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const q = data.quote || data.data || data;
      setLinkedQuote(q);
    } catch (e) {
      console.warn("⚠️ Linked quote fetch failed:", e.message);
    }
  }

  async function loadPayments() {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}/payments`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = data.payments || data.data || (Array.isArray(data) ? data : []);
      setPayments(list);
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

  async function refreshOrder() {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}/refresh`);
      if (!res.ok) throw new Error("Refresh failed");
      const data = await res.json();
      setOrder(data.data || {});
      console.log("🔁 Order refreshed after payment");
      await loadPayments();
      if (data.data?.quote_id) await loadLinkedQuote(data.data.quote_id);
    } catch (err) {
      console.error("❌ Failed to refresh order:", err);
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

  /* ============================================================
     🔗 Sync Order with Linked Quote
  ============================================================ */
  const syncedOrder = useMemo(() => {
    if (!order) return null;
    if (!linkedQuote) return order;

    return {
      ...order,
      title: linkedQuote.title || order.title,
      deposit: Number(linkedQuote.deposit ?? order.deposit ?? 0),
      balance:
        Number(
          (linkedQuote.custom_price ||
            linkedQuote.total_after_discount ||
            0) - (linkedQuote.deposit || 0)
        ) || order.balance,
      quote_synced_at: new Date().toISOString(),
    };
  }, [order, linkedQuote]);

  /* ============================================================
     💰 Computed Figures
  ============================================================ */
  const figures = useMemo(() => {
    if (!syncedOrder)
      return { deposit: 0, balance: 0, total: 0, paid: 0, remaining: 0 };
    const deposit = Number(syncedOrder.deposit || 0);
    const balance = Number(syncedOrder.balance || 0);
    const total = deposit + balance;
    const paid = Number(syncedOrder.total_paid || 0);
    const remaining = Math.max(total - paid, 0);
    return { deposit, balance, total, paid, remaining };
  }, [syncedOrder]);

  const depositPayment = payments.find(
    (p) => p.type?.toLowerCase() === "deposit"
  );
  const balancePayment = payments.find(
    (p) => p.type?.toLowerCase() === "balance"
  );

  /* ============================================================
     💳 Stripe Checkout + Billing + Refunds
  ============================================================ */
  async function handleCreateCheckout(flow, type) {
    if (!syncedOrder) return;
    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/payments/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: syncedOrder.id, flow, type }),
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

  async function handleRefund(type) {
    const payment = payments.find(
      (p) => p.type?.toLowerCase() === type.toLowerCase()
    );
    if (!payment) return alert("No payment found for " + type);
    const amountStr = prompt(
      `Enter refund amount (£, max £${payment.amount}):`,
      payment.amount
    );
    if (!amountStr) return;
    const amount = Number(amountStr);
    if (amount <= 0 || amount > payment.amount)
      return alert("Invalid refund amount.");

    if (!confirm(`Confirm refund of £${amount.toFixed(2)} for ${type}?`)) return;

    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/payments/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_id: payment.id, amount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Refund failed");
      alert("✅ Refund processed successfully.");
      await loadPayments();
      await refreshOrder();
    } catch (err) {
      console.error("❌ Refund error:", err);
      alert("❌ Refund failed: " + err.message);
    } finally {
      setWorking(false);
    }
  }

  /* ============================================================
     🖥️ Render
  ============================================================ */
  if (error) return <div className="p-10 text-red-400">❌ {error}</div>;
  if (!syncedOrder)
    return (
      <div className="p-10 text-pjh-muted animate-pulse">Loading order…</div>
    );

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
          Order #{syncedOrder.id} — {syncedOrder.title}
        </h1>
        <button
          onClick={refreshOrder}
          className="text-xs text-pjh-muted hover:text-pjh-blue transition"
        >
          🔁 Refresh
        </button>
      </div>

      {linkedQuote && (
        <p className="text-xs text-pjh-muted mt-1">
          🔗 Linked to Quote #{linkedQuote.id} (auto-synced)
        </p>
      )}

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
        <h2 className="text-xl font-semibold text-pjh-blue">Payment Status</h2>

        <StatusRow
          title="Deposit"
          paid={syncedOrder.deposit_paid}
          method={depositPayment?.method}
          amount={depositPayment?.amount}
        />
        <StatusRow
          title="Balance"
          paid={syncedOrder.balance_paid}
          method={balancePayment?.method}
          amount={balancePayment?.amount}
        />

        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-pjh-muted">Direct Debit:</span>
          {syncedOrder.direct_debit_active ? (
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

      {/* Actions */}
      <div className="mt-8 space-y-6">
        {/* Payment & Billing */}
        <div className="flex flex-wrap gap-3">
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

        {/* Refunds */}
        {payments.length > 0 && (
          <div className="border-t border-white/10 pt-4 flex flex-wrap gap-3">
            <h3 className="text-sm text-pjh-muted w-full">Refunds</h3>
            {payments.some((p) => p.type?.toLowerCase() === "deposit") && (
              <button
                onClick={() => handleRefund("deposit")}
                disabled={working}
                className="btn bg-red-600 hover:bg-red-700 disabled:opacity-50"
              >
                💸 Refund Deposit
              </button>
            )}
            {payments.some((p) => p.type?.toLowerCase() === "balance") && (
              <button
                onClick={() => handleRefund("balance")}
                disabled={working}
                className="btn bg-red-700 hover:bg-red-800 disabled:opacity-50"
              >
                💸 Refund Balance
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Subcomponents
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
