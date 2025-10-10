/**
 * ============================================================
 * PJH Web Services — Admin Order Record (Unified Final 2025)
 * ============================================================
 * Features:
 *  ✅ Full sync with backend (refund-aware)
 *  ✅ Deposit, Balance, Paid, Refunded, Remaining totals
 *  ✅ Stripe Checkout (Card + Bacs + Direct Debit)
 *  ✅ Refund buttons (auto-sync)
 *  ✅ Clean responsive layout
 * ============================================================
 */

import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function AdminOrderRecord() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [linkedQuote, setLinkedQuote] = useState(null);
  const [payments, setPayments] = useState([]);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  /* ============================================================
     🔐 Admin Check + Initial Load
  ============================================================ */
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
      return;
    }
    if (id) {
      loadOrder();
      loadPayments();
    }
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
      setOrder(o);
      if (o.quote_id) await loadLinkedQuote(o.quote_id);
    } catch (err) {
      console.error("❌ Failed to load order:", err);
      setError("Failed to load order details.");
    }
  }

  async function loadLinkedQuote(quoteId) {
    try {
      const res = await fetch(`${API_BASE}/api/quotes/${quoteId}`);
      if (res.ok) {
        const data = await res.json();
        setLinkedQuote(data.quote || data.data || data);
      }
    } catch {
      /* ignore */
    }
  }

  async function loadPayments() {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}/payments`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPayments(data.payments || []);
    } catch (err) {
      console.warn("⚠️ Failed to load payments:", err);
    }
  }

  async function refreshOrder() {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}/refresh`);
      const data = await res.json();
      setOrder(data.data || {});
      await loadPayments();
      console.log("🔁 Order refreshed");
    } catch (err) {
      console.error("❌ Refresh error:", err);
    }
  }

  /* ============================================================
     💰 Calculated Figures (Refund-Aware)
  ============================================================ */
  const figures = useMemo(() => {
    if (!order) return { deposit: 0, balance: 0, total: 0, paid: 0, refunded: 0, remaining: 0 };

    const deposit = Number(order.deposit || 0);
    const balance = Number(order.balance || 0);
    const total = deposit + balance;

    const paidAmount = payments
      .filter((p) => p.status === "paid" && p.amount > 0)
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const refundedAmount =
      order.refunded_total ||
      payments
        .filter((p) => p.status === "refunded" || p.amount < 0)
        .reduce((sum, p) => sum + Math.abs(Number(p.amount)), 0);

    const netPaid = paidAmount - refundedAmount;
    const remaining = Math.max(total - netPaid, 0);

    return { deposit, balance, total, paid: netPaid, refunded: refundedAmount, remaining };
  }, [order, payments]);

  /* ============================================================
     💳 Stripe Actions + Refunds
  ============================================================ */
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
      if (res.ok && data.url) window.open(data.url, "_blank");
      else alert(`❌ Checkout error: ${data.error || "Unknown error"}`);
    } catch (err) {
      console.error("❌ Checkout error:", err);
      alert("❌ Failed to create checkout session.");
    } finally {
      setWorking(false);
    }
  }

  async function handleRefund(type) {
    const payment = payments.find(
      (p) => p.type?.toLowerCase() === type.toLowerCase() && p.status === "paid"
    );
    if (!payment) return alert(`No ${type} payment found.`);

    const amountStr = prompt(`Enter refund amount (£, max £${payment.amount}):`, payment.amount);
    if (!amountStr) return;
    const amount = Number(amountStr);
    if (amount <= 0 || amount > payment.amount) return alert("Invalid refund amount.");

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
  if (error) return <div className="p-10 text-red-400">{error}</div>;
  if (!order)
    return <div className="p-10 text-pjh-muted animate-pulse">Loading order details…</div>;

  return (
    <div className="p-10 text-white bg-pjh-charcoal min-h-screen">
      <a href="/admin/orders" className="text-sm text-pjh-muted hover:text-pjh-blue">
        ← Back to Orders
      </a>

      <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-pjh-blue">
          Order #{order.id} — {order.title}
        </h1>
        <button onClick={refreshOrder} className="text-xs text-pjh-muted hover:text-pjh-blue">
          🔁 Refresh
        </button>
      </div>

      {linkedQuote && (
        <p className="text-xs text-pjh-muted mt-1">
          🔗 Linked to Quote #{linkedQuote.id} ({linkedQuote.title})
        </p>
      )}

      {/* Totals */}
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <SummaryCard label="Deposit" value={`£${figures.deposit.toFixed(2)}`} />
        <SummaryCard label="Balance" value={`£${figures.balance.toFixed(2)}`} />
        <SummaryCard label="Paid" value={`£${figures.paid.toFixed(2)}`} accent="text-green-300" />
        <SummaryCard
          label="Refunded"
          value={`£${figures.refunded.toFixed(2)}`}
          accent="text-red-300"
        />
        <SummaryCard label="Remaining" value={`£${figures.remaining.toFixed(2)}`} accent="text-amber-300" />
        <SummaryCard label="Total" value={`£${figures.total.toFixed(2)}`} />
      </div>

      {/* Direct Debit */}
      <div className="mt-8 bg-pjh-slate p-6 rounded-xl border border-white/10 space-y-3">
        <h2 className="text-xl font-semibold text-pjh-blue">Payment Status</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-pjh-muted">Direct Debit:</span>
          {order.direct_debit_active ? (
            <span className="px-2 py-1 text-xs rounded bg-green-600/30 text-green-300 border border-green-500/20">
              ✅ Setup
            </span>
          ) : (
            <span className="px-2 py-1 text-xs rounded bg-red-600/30 text-red-300 border border-red-500/20">
              ❌ Not Setup
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 space-y-6">
        {/* Checkout */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleCreateCheckout("card_payment", "deposit")}
            disabled={working}
            className="btn bg-green-600 hover:bg-green-700"
          >
            💳 Card — Deposit
          </button>
          <button
            onClick={() => handleCreateCheckout("card_payment", "balance")}
            disabled={working}
            className="btn bg-green-700 hover:bg-green-800"
          >
            💳 Card — Balance
          </button>
          <button
            onClick={() => handleCreateCheckout("bacs_payment", "deposit")}
            disabled={working}
            className="btn bg-blue-600 hover:bg-blue-700"
          >
            🏦 Bacs — Deposit
          </button>
          <button
            onClick={() => handleCreateCheckout("bacs_payment", "balance")}
            disabled={working}
            className="btn bg-blue-700 hover:bg-blue-800"
          >
            🏦 Bacs — Balance
          </button>
          <button
            onClick={() => handleCreateCheckout("bacs_setup")}
            disabled={working}
            className="btn bg-indigo-600 hover:bg-indigo-700"
          >
            🧾 Setup Direct Debit
          </button>
        </div>

        {/* Refunds */}
        {payments.length > 0 && (
          <div className="border-t border-white/10 pt-4 flex flex-wrap gap-3">
            <h3 className="text-sm text-pjh-muted w-full">Refunds</h3>
            {payments.some((p) => p.type?.toLowerCase() === "deposit" && p.status === "paid") && (
              <button
                onClick={() => handleRefund("deposit")}
                disabled={working}
                className="btn bg-red-600 hover:bg-red-700"
              >
                💸 Refund Deposit
              </button>
            )}
            {payments.some((p) => p.type?.toLowerCase() === "balance" && p.status === "paid") && (
              <button
                onClick={() => handleRefund("balance")}
                disabled={working}
                className="btn bg-red-700 hover:bg-red-800"
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
    <div className="bg-pjh-gray rounded-xl p-4 border border-white/10 text-center">
      <div className="text-pjh-muted text-xs mb-1">{label}</div>
      <div className={`text-xl font-semibold ${accent || ""}`}>{value}</div>
    </div>
  );
}
