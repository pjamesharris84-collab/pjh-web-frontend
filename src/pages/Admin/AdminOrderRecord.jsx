/**
 * ============================================================
 * PJH Web Services — Admin Order Record (Final Unified 2025)
 * ============================================================
 * Features:
 *  ✅ Accurate 5-key financials (Total, Deposit, Paid, Refunds, Balance)
 *  ✅ Stripe & Bacs checkout actions
 *  ✅ Direct Debit visibility (maintenance plan + mandate)
 *  ✅ Manual re-charge trigger (maintenance)
 *  ✅ Full payment history tab
 *  ✅ Refund + re-charge awareness
 *  ✅ Delete + refresh order buttons
 * ============================================================
 */

import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminOrderRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend-1.onrender.com";

  const [order, setOrder] = useState(null);
  const [linkedQuote, setLinkedQuote] = useState(null);
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("overview");

  /* ============================================================
     🔐 Admin Guard + Load
  ============================================================ */
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
      return;
    }
    if (id) {
      refreshOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function refreshOrder() {
    await loadOrder();
    await loadPayments();
    await loadSummary();
  }

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
      if (!res.ok) return;
      const data = await res.json();
      setLinkedQuote(data.quote || data.data || data);
    } catch (err) {
      console.warn("⚠️ Linked quote fetch failed:", err.message);
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

  async function loadSummary() {
    try {
      const res = await fetch(`${API_BASE}/api/payments/summary/${id}`);
      if (!res.ok) throw new Error("Failed summary");
      const data = await res.json();
      setSummary(data.data);
    } catch (err) {
      console.warn("⚠️ Failed to load payments summary:", err);
    }
  }

  /* ============================================================
     🗑️ Delete Order
  ============================================================ */
  async function handleDeleteOrder() {
    if (!confirm("Are you sure you want to delete this order?")) return;
    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert("✅ Order deleted successfully.");
      navigate("/admin/orders");
    } catch (err) {
      console.error("❌ Delete order failed:", err);
      alert("❌ Failed to delete order.");
    } finally {
      setWorking(false);
    }
  }

  /* ============================================================
     💳 Checkout + Refund
  ============================================================ */
  async function handleCreateCheckout(flow, type) {
    if (!order) return;
    setWorking(true);

    try {
      const payload =
        flow === "bacs_setup"
          ? { orderId: order.id, flow }
          : {
              orderId: order.id,
              flow,
              type,
              amount:
                type === "deposit"
                  ? Number(order.deposit || 0)
                  : Number(order.balance || 0),
            };

      const res = await fetch(`${API_BASE}/api/payments/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        const msg =
          flow === "bacs_setup"
            ? "This will open Stripe's Direct Debit setup page. No charge will occur."
            : `This will charge £${(data.amount ?? payload.amount ?? 0).toFixed(2)}. Continue?`;
        if (confirm(msg)) window.open(data.url, "_blank");
      } else {
        alert(`❌ Checkout error: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("❌ Checkout error:", err);
      alert("❌ Failed to create checkout session.");
    } finally {
      setWorking(false);
    }
  }

  async function handleRefund(type) {
    if (!order) return;
    const payment = payments.find(
      (p) => p.type?.toLowerCase() === type && p.status === "paid"
    );
    if (!payment) return alert(`No paid ${type} payment found.`);

    const amount = Math.abs(Number(payment.amount || 0));
    if (!confirm(`Refund £${amount.toFixed(2)} ${type}?`)) return;

    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/payments/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_id: payment.id, amount }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Refund processed successfully.");
        refreshOrder();
      } else {
        alert(`❌ Refund failed: ${data.error}`);
      }
    } catch (err) {
      console.error("❌ Refund error:", err);
      alert("❌ Refund request failed.");
    } finally {
      setWorking(false);
    }
  }

  /* ============================================================
     ⚡ Manual Direct Debit Charge (Maintenance Re-run)
  ============================================================ */
  async function handleManualMaintenanceCharge() {
    if (!order || !summary?.direct_debit_active) {
      return alert("No active Direct Debit found for this order.");
    }

    const amt = Number(summary?.maintenance_monthly || 0);
    if (!(amt > 0)) return alert("No monthly maintenance amount set.");

    const confirmCharge = confirm(
      `Run Direct Debit maintenance charge of £${amt.toFixed(2)} now?`
    );
    if (!confirmCharge) return;

    setWorking(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/automation/directdebit/run?orderId=${order.id}`
      );
      if (!res.ok) throw new Error("Failed to trigger maintenance charge");
      alert("✅ Maintenance charge initiated. It will appear once Stripe confirms.");
      refreshOrder();
    } catch (err) {
      console.error("❌ Maintenance charge error:", err);
      alert("❌ Failed to trigger maintenance charge.");
    } finally {
      setWorking(false);
    }
  }

  /* ============================================================
     💰 Figures
  ============================================================ */
  const figures = useMemo(() => {
    if (!order)
      return { total: 0, deposit: 0, paid: 0, refunded: 0, balance: 0 };

    const deposit = Number(order.deposit || 0);
    const baseBalance = Number(order.balance || 0);
    const paid = Number(order.total_paid || 0);
    const refunded = Math.abs(Number(order.refunded_total || 0));
    const total = deposit + baseBalance;
    const netPaid = paid - refunded;
    const remaining = Math.max(total - netPaid, 0);

    return { total, deposit, paid, refunded, balance: remaining };
  }, [order]);

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

      {/* Header */}
      <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-pjh-blue">
          Order #{order.id} — {order.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={refreshOrder} className="text-xs text-pjh-muted hover:text-pjh-blue">
            🔁 Refresh
          </button>
          <button
            onClick={handleDeleteOrder}
            disabled={working}
            className="text-xs bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md"
          >
            🗑️ Delete Order
          </button>
        </div>
      </div>

      {linkedQuote && (
        <p className="text-xs text-pjh-muted mt-1">
          🔗 Linked to Quote #{linkedQuote.id} ({linkedQuote.title})
        </p>
      )}

      {/* Tabs */}
      <div className="mt-6 border-b border-white/10 flex gap-6 text-sm">
        <button
          onClick={() => setTab("overview")}
          className={`pb-2 ${
            tab === "overview" ? "text-pjh-blue border-b border-pjh-blue" : "text-pjh-muted"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("payments")}
          className={`pb-2 ${
            tab === "payments" ? "text-pjh-blue border-b border-pjh-blue" : "text-pjh-muted"
          }`}
        >
          Payments
        </button>
      </div>

      {tab === "overview" && (
        <>
          {/* Totals */}
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <SummaryCard label="Total Order Value" value={`£${figures.total.toFixed(2)}`} />
            <SummaryCard label="Deposit Required" value={`£${figures.deposit.toFixed(2)}`} />
            <SummaryCard label="Payments Made" value={`£${figures.paid.toFixed(2)}`} accent="text-green-300" />
            <SummaryCard label="Refunds" value={`£${figures.refunded.toFixed(2)}`} accent="text-red-300" />
            <SummaryCard label="Balance Remaining" value={`£${figures.balance.toFixed(2)}`} accent="text-amber-300" />
          </div>

          {/* Direct Debit */}
          {summary && (
            <div className="mt-8 bg-pjh-slate p-6 rounded-xl border border-white/10 space-y-3">
              <h2 className="text-xl font-semibold text-pjh-blue">Direct Debit & Maintenance</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-pjh-muted">Status:</span>
                {summary.direct_debit_active ? (
                  <span className="px-2 py-1 text-xs rounded bg-green-600/30 text-green-300 border border-green-500/20">
                    ✅ Active {summary.mandate_id ? `(Mandate: ${String(summary.mandate_id).slice(0, 8)}…)` : ""}
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded bg-red-600/30 text-red-300 border border-red-500/20">
                    ❌ Not Setup
                  </span>
                )}
              </div>
              <p className="text-sm text-pjh-muted">
                Maintenance Plan: £{Number(summary.maintenance_monthly || 0).toFixed(2)}/month
              </p>

              {/* Manual Direct Debit Re-run */}
              {summary.direct_debit_active && Number(summary.maintenance_monthly || 0) > 0 && (
                <button
                  onClick={handleManualMaintenanceCharge}
                  disabled={working}
                  className="btn bg-pjh-blue hover:bg-pjh-blue-dark mt-3"
                >
                  ⚡ Run Maintenance Charge Now
                </button>
              )}
            </div>
          )}

          {/* Payment Actions */}
          <div className="mt-10 space-y-6">
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
        </>
      )}

      {/* ======================================================== */}
      {tab === "payments" && <PaymentsTab order={order} payments={payments} summary={summary} />}
    </div>
  );
}

/* ============================================================
   PaymentsTab — shows full ledger and outstanding balances
============================================================ */
function PaymentsTab({ order, payments, summary }) {
  return (
    <div className="mt-6 bg-pjh-slate p-6 rounded-xl border border-white/10">
      <h2 className="text-xl font-semibold text-pjh-blue mb-4">Payments Overview</h2>
      {summary && (
        <div className="grid sm:grid-cols-3 gap-3 text-sm mb-4">
          <div>Deposit Outstanding: £{Number(summary.deposit_outstanding || 0).toFixed(2)}</div>
          <div>Balance Outstanding: £{Number(summary.balance_outstanding || 0).toFixed(2)}</div>
          <div>Monthly Maintenance: £{Number(summary.maintenance_monthly || 0).toFixed(2)}</div>
        </div>
      )}

      <table className="min-w-full text-sm border border-white/10 rounded-lg">
        <thead className="bg-pjh-gray/60 text-left text-pjh-muted">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Type</th>
            <th className="p-2">Method</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t border-white/5">
              <td className="p-2">{new Date(p.created_at).toLocaleDateString()}</td>
              <td className="p-2 capitalize">{p.type}</td>
              <td className="p-2 uppercase">{p.method}</td>
              <td className="p-2">£{Number(p.amount).toFixed(2)}</td>
              <td className="p-2">
                {p.status === "paid" && <span className="text-green-400">Paid</span>}
                {p.status === "processing" && <span className="text-amber-300">Processing</span>}
                {p.status === "failed" && <span className="text-red-400">Failed</span>}
                {p.status === "refunded" && <span className="text-blue-300">Refunded</span>}
              </td>
            </tr>
          ))}
          {payments.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-pjh-muted">
                No payments recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================
   SummaryCard
============================================================ */
function SummaryCard({ label, value, accent }) {
  return (
    <div className="bg-pjh-gray rounded-xl p-4 border border-white/10 text-center">
      <div className="text-pjh-muted text-xs mb-1">{label}</div>
      <div className={`text-xl font-semibold ${accent || ""}`}>{value}</div>
    </div>
  );
}
