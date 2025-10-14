/**
 * ============================================================
 * PJH Web Services — Admin Order Record (Unified 2025 • Full)
 * ============================================================
 * Features:
 *  ✅ Accurate 5-key financials (Total, Deposit, Paid, Refunds, Balance)
 *  ✅ Stripe & Bacs checkout actions (deposit/balance + DD setup)
 *  ✅ Direct Debit visibility (status + mandate + Stripe IDs from summary)
 *  ✅ Manual maintenance re-charge trigger (automation endpoint)
 *  ✅ Manual monthly build re-charge trigger (automation endpoint)
 *  ✅ Payments tab (history with statuses)
 *  ✅ Refund actions (deposit/balance)
 *  ✅ Admin notes panel (/api/diary/:orderId)
 *  ✅ 20s polling to reflect Stripe webhook updates
 * ============================================================
 */

import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

/* ============================================================
   Helpers
============================================================ */
function fmtMoney(n) {
  const v = Number(n || 0);
  return `£${v.toFixed(2)}`;
}
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ============================================================
   Main Component
============================================================ */
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
     Loaders + Polling
  ============================================================ */
  useEffect(() => {
    if (!id) return;
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
      return;
    }
    refreshAll();
    const interval = setInterval(() => {
      loadPayments();
      loadSummary();
    }, 20000);
    return () => clearInterval(interval);
  }, [id]);

  async function refreshAll() {
    await loadOrder();
    await loadPayments();
    await loadSummary();
  }

  async function loadOrder() {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const o = data.data || data.order || {};
      setOrder(o);
      if (o.quote_id) loadLinkedQuote(o.quote_id);
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
      console.warn("⚠️ Linked quote fetch failed:", err?.message);
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
      console.warn("⚠️ Failed to load summary:", err);
    }
  }

  /* ============================================================
     Delete Order
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
     Checkout + Refund
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
            ? "This opens Stripe’s Direct Debit setup — no charge yet."
            : `Charge ${fmtMoney(data.amount ?? payload.amount ?? 0)} now?`;
        if (confirm(msg)) window.open(data.url, "_blank");
      } else alert(`❌ Checkout error: ${data.error || "Unknown error"}`);
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
    if (!confirm(`Refund ${fmtMoney(amount)} ${type}?`)) return;
    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/payments/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_id: payment.id, amount }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Refund processed.");
        refreshAll();
      } else alert(`❌ Refund failed: ${data.error}`);
    } catch (err) {
      console.error("❌ Refund error:", err);
      alert("❌ Refund request failed.");
    } finally {
      setWorking(false);
    }
  }

  /* ============================================================
     Manual Direct Debit Charges (Maintenance + Build)
  ============================================================ */
  async function handleManualMaintenanceCharge() {
    if (!order || !summary?.direct_debit_active)
      return alert("No active Direct Debit found.");
    const amt = Number(summary?.maintenance_monthly || order?.maintenance_monthly || 0);
    if (!(amt > 0)) return alert("No maintenance amount set.");
    if (!confirm(`Run maintenance Direct Debit for ${fmtMoney(amt)} now?`)) return;
    setWorking(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/automation/directdebit/run?orderId=${order.id}`
      );
      if (!res.ok) throw new Error("Failed");
      alert("✅ Maintenance charge initiated.");
      refreshAll();
    } catch (err) {
      console.error("❌ Maintenance charge error:", err);
      alert("❌ Failed to trigger maintenance charge.");
    } finally {
      setWorking(false);
    }
  }

  async function handleManualMonthlyBuildCharge() {
    if (!order || !summary?.direct_debit_active)
      return alert("No active Direct Debit found for this customer.");

    const amt = Number(order?.monthly_amount || 0);
    if (!(amt > 0)) return alert("No monthly build amount set on this order.");

    if (!confirm(`Run monthly build Direct Debit charge of ${fmtMoney(amt)} now?`))
      return;

    setWorking(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/automation/directdebit/build-run?orderId=${order.id}`,
        { method: "GET" }
      );
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        console.log("✅ Build run response:", data);
        alert("✅ Monthly build Direct Debit initiated successfully.");
        await refreshAll();
      } else {
        console.error("❌ Build run error:", data);
        alert(`❌ Failed to initiate monthly build charge — ${data.error || "unknown error"}`);
      }
    } catch (err) {
      console.error("❌ Monthly build automation error:", err);
      alert("❌ Failed to trigger monthly build charge.");
    } finally {
      setWorking(false);
    }
  }


  /* ============================================================
     Monthly Subscription Start (Stripe Checkout)
  ============================================================ */
  async function startMonthlyBilling() {
    if (!order) return alert("Order not loaded yet.");
    if (!order.maintenance_name && order.pricing_mode !== "monthly")
      return alert("No recurring billing for this order.");
    try {
      const body = {
        orderId: order.id,
        customerId: order.customer_id,
        packageId:
          order.pricing_mode === "monthly" ? order.package_id || null : null,
        maintenanceId: order.maintenance_id || null,
        mode:
          order.pricing_mode === "monthly"
            ? "full-monthly"
            : order.maintenance_name
            ? "maintenance-only"
            : "oneoff",
      };
      const res = await fetch(`${API_BASE}/api/billing/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error("Stripe checkout failed");
      window.location.href = data.url;
    } catch (err) {
      console.error("❌ Billing error:", err);
      alert("❌ Failed to start monthly billing.");
    }
  }

  /* ============================================================
     Figures
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
     Render
  ============================================================ */
  if (error) return <div className="p-10 text-red-400">{error}</div>;
  if (!order)
    return <div className="p-10 text-pjh-muted animate-pulse">Loading order…</div>;

  const monthlyMaintenance = Number(summary?.maintenance_monthly || 0);
  const monthlyBuild = Number(order?.monthly_amount || 0);

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
          <button onClick={refreshAll} className="text-xs text-pjh-muted hover:text-pjh-blue">
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

      {/* Overview + Tabs */}
      <div className="mt-6 border-b border-white/10 flex gap-6 text-sm">
        {["overview", "payments"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cx(
              "pb-2",
              tab === t ? "text-pjh-blue border-b border-pjh-blue" : "text-pjh-muted"
            )}
          >
            {t === "overview" ? "Overview" : "Payments"}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          {/* Totals */}
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <SummaryCard label="Total Order Value" value={fmtMoney(figures.total)} />
            <SummaryCard label="Deposit Required" value={fmtMoney(figures.deposit)} />
            <SummaryCard label="Payments Made" value={fmtMoney(figures.paid)} accent="text-green-300" />
            <SummaryCard label="Refunds" value={fmtMoney(figures.refunded)} accent="text-red-300" />
            <SummaryCard label="Balance Remaining" value={fmtMoney(figures.balance)} accent="text-amber-300" />
          </div>

          {/* Direct Debit & Maintenance */}
          {summary && (
            <div className="mt-8 bg-pjh-slate p-6 rounded-xl border border-white/10 space-y-3">
              <h2 className="text-xl font-semibold text-pjh-blue">Direct Debit & Maintenance</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-pjh-muted">Status:</span>
                {summary.direct_debit_active ? (
                  <span className="px-2 py-1 text-xs rounded bg-green-600/30 text-green-300 border border-green-500/20">
                    ✅ Active
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded bg-red-600/30 text-red-300 border border-red-500/20">
                    ❌ Not Setup
                  </span>
                )}
              </div>
              <p className="text-sm text-pjh-muted">
                Maintenance: {fmtMoney(monthlyMaintenance)}/month
              </p>

              {/* Start Monthly Billing */}
              {(order.pricing_mode === "monthly" || order.maintenance_name) && (
                <button
                  onClick={startMonthlyBilling}
                  className="btn bg-indigo-600 hover:bg-indigo-500 mt-3"
                >
                  💳 Start Monthly Billing
                </button>
              )}

              {/* Manual re-run buttons */}
              {summary.direct_debit_active && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {monthlyMaintenance > 0 && (
                    <button
                      onClick={handleManualMaintenanceCharge}
                      disabled={working}
                      className="btn bg-pjh-blue hover:bg-pjh-blue-dark"
                    >
                      ⚡ Run Maintenance Charge Now
                    </button>
                  )}
                  {order.pricing_mode === "monthly" && monthlyBuild > 0 && (
                    <button
                      onClick={handleManualMonthlyBuildCharge}
                      disabled={working}
                      className="btn bg-amber-600 hover:bg-amber-700"
                    >
                      ⚡ Run Monthly Build Charge Now
                    </button>
                  )}
                </div>
              )}

              {/* Mandate Details */}
              {summary?.direct_debit_active && (
                <div className="mt-6 bg-pjh-gray p-5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-pjh-blue mb-2">
                    Direct Debit Mandate Details
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-pjh-muted">
                    <div><b>Mandate ID:</b> {summary?.mandate_id || "N/A"}</div>
                    <div><b>Stripe Customer ID:</b> {summary?.stripe_customer_id || "N/A"}</div>
                    <div><b>Payment Method ID:</b> {summary?.stripe_payment_method_id || "N/A"}</div>
                  </div>
                  <p className="mt-2 text-xs text-pjh-muted">
                    💡 View full mandate & transactions in Stripe → Customer.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Payment Actions */}
          <div className="mt-10 space-y-6">
            <div className="flex flex-wrap gap-3">
              <button onClick={() => handleCreateCheckout("card_payment", "deposit")} className="btn bg-green-600 hover:bg-green-700">
                💳 Card — Deposit
              </button>
              <button onClick={() => handleCreateCheckout("card_payment", "balance")} className="btn bg-green-700 hover:bg-green-800">
                💳 Card — Balance
              </button>
              <button onClick={() => handleCreateCheckout("bacs_payment", "deposit")} className="btn bg-blue-600 hover:bg-blue-700">
                🏦 Bacs — Deposit
              </button>
              <button onClick={() => handleCreateCheckout("bacs_payment", "balance")} className="btn bg-blue-700 hover:bg-blue-800">
                🏦 Bacs — Balance
              </button>
              <button onClick={() => handleCreateCheckout("bacs_setup")} className="btn bg-indigo-600 hover:bg-indigo-700">
                🧾 Setup Direct Debit
              </button>
            </div>
          </div>
        </>
      )}

      {tab === "payments" && (
        <PaymentsTab order={order} payments={payments} summary={summary} />
      )}

      <OrderUpdates orderId={order.id} />
    </div>
  );
}

/* ============================================================
   PaymentsTab
============================================================ */
function PaymentsTab({ order, payments, summary }) {
  const monthly = Number(summary?.maintenance_monthly || order?.maintenance_monthly || 0);
  return (
    <div className="mt-6 bg-pjh-slate p-6 rounded-xl border border-white/10">
      <h2 className="text-xl font-semibold text-pjh-blue mb-4">Payments Overview</h2>
      <div className="grid sm:grid-cols-3 gap-3 text-sm mb-4">
        <div>Deposit Outstanding: {fmtMoney(summary?.deposit_outstanding || 0)}</div>
        <div>Balance Outstanding: {fmtMoney(summary?.balance_outstanding || 0)}</div>
        <div>Monthly Maintenance: {fmtMoney(monthly)}</div>
      </div>
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
              <td className="p-2">{fmtMoney(p.amount)}</td>
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
   Order Updates (Admin Notes)
============================================================ */
function OrderUpdates({ orderId }) {
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend-1.onrender.com";
  const [updates, setUpdates] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUpdates();
  }, [orderId]);

  async function loadUpdates() {
    try {
      const res = await fetch(`${API_BASE}/api/diary/${orderId}`);
      if (!res.ok) return;
      const data = await res.json();
      setUpdates(data.entries || data.data || []);
    } catch (err) {
      console.warn("⚠️ Failed to load diary:", err);
    }
  }

  async function addUpdate() {
    if (!note.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/diary/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: note }),
      });
      if (res.ok) {
        setNote("");
        loadUpdates();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(`❌ Failed to add update${data.error ? `: ${data.error}` : ""}`);
      }
    } catch (err) {
      console.error("❌ Add update error:", err);
      alert("❌ Failed to add update.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 bg-pjh-slate p-6 rounded-xl border border-white/10">
      <h2 className="text-xl font-semibold text-pjh-blue mb-3">Order Updates & Notes</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add an update or note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="flex-grow bg-pjh-gray text-white p-2 rounded-md border border-white/10"
        />
        <button
          onClick={addUpdate}
          disabled={loading}
          className="bg-pjh-blue hover:bg-pjh-blue-dark px-4 py-2 rounded-md text-sm font-semibold"
        >
          {loading ? "Saving..." : "Add"}
        </button>
      </div>
      {updates.length === 0 ? (
        <p className="text-sm text-pjh-muted">No updates recorded yet.</p>
      ) : (
        <ul className="divide-y divide-white/10 text-sm">
          {updates.map((u) => (
            <li key={u.id} className="py-2 flex justify-between items-center">
              <span className="text-white">{u.text}</span>
              <span className="text-xs text-pjh-muted">
                {new Date(u.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ============================================================
   Summary Card
============================================================ */
function SummaryCard({ label, value, accent }) {
  return (
    <div className="bg-pjh-gray rounded-xl p-4 border border-white/10 text-center">
      <div className="text-pjh-muted text-xs mb-1">{label}</div>
      <div className={cx("text-xl font-semibold", accent)}>{value}</div>
    </div>
  );
}
