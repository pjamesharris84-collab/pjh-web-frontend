/**
 * ============================================================
 * PJH Web Services — Admin Order Record
 * ============================================================
 * - Loads order
 * - Shows dynamic totals (overall remaining)
 * - Creates Checkout sessions (card/bacs + setup)
 * - Runs monthly billing (off-session)
 * ============================================================
 */
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function AdminOrderRecord() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
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
    if (id) loadOrder();
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

  function parseMaybeJSON(val) {
    if (typeof val === "string") {
      try { return JSON.parse(val); } catch { return []; }
    }
    return Array.isArray(val) ? val : [];
  }

  // Quick overall figures for display only
  const figures = useMemo(() => {
    if (!order) return { deposit: 0, balance: 0, total: 0, paid: 0, remaining: 0 };
    const deposit = Number(order.deposit || 0);
    const balance = Number(order.balance || 0);
    const total = deposit + balance;
    const paid = Number(order.total_paid || 0);
    const remaining = Math.max(total - paid, 0);
    return { deposit, balance, total, paid, remaining };
  }, [order]);

  // Create a Checkout session (server dynamically calculates the correct amount)
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

  // Trigger monthly billing run (Bacs off-session)
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
    } catch (e) {
      console.error("❌ Billing error:", e);
      alert("❌ Billing run failed.");
    } finally {
      setWorking(false);
    }
  }

  if (error) return <div className="p-10 text-red-400">❌ {error}</div>;
  if (!order) return <div className="p-10 text-pjh-muted animate-pulse">Loading order…</div>;

  return (
    <div className="p-10 text-white bg-pjh-charcoal min-h-screen">
      <a href="/admin/orders" className="text-sm text-pjh-muted hover:text-pjh-blue transition">
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

      {/* Quick Summary */}
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-pjh-gray rounded-xl p-4 border border-white/10">
          <div className="text-pjh-muted text-xs">Deposit</div>
          <div className="text-xl font-semibold">£{figures.deposit.toFixed(2)}</div>
        </div>
        <div className="bg-pjh-gray rounded-xl p-4 border border-white/10">
          <div className="text-pjh-muted text-xs">Balance</div>
          <div className="text-xl font-semibold">£{figures.balance.toFixed(2)}</div>
        </div>
        <div className="bg-pjh-gray rounded-xl p-4 border border-white/10">
          <div className="text-pjh-muted text-xs">Paid</div>
          <div className="text-xl font-semibold text-green-300">£{figures.paid.toFixed(2)}</div>
        </div>
        <div className="bg-pjh-gray rounded-xl p-4 border border-white/10">
          <div className="text-pjh-muted text-xs">Remaining (overall)</div>
          <div className="text-xl font-semibold text-amber-300">£{figures.remaining.toFixed(2)}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
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
          🧾 Setup Direct Debit Mandate
        </button>

        <button
          onClick={handleRunBilling}
          disabled={working}
          className="btn bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
        >
          🔁 Run Monthly Billing
        </button>
      </div>

      {/* Minimal order fields */}
      <div className="mt-6 bg-pjh-slate p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-pjh-blue mb-3">Customer</h2>
        <p>Name: {order.customer_name}</p>
        <p>Email: {order.email}</p>
      </div>

      {/* Items */}
      {Array.isArray(order.items) && order.items.length > 0 && (
        <div className="bg-pjh-slate p-6 rounded-xl mt-6">
          <h2 className="text-xl font-semibold text-pjh-blue mb-3">Line Items</h2>
          <table className="min-w-full border border-white/10 rounded-lg mb-3">
            <thead className="bg-pjh-gray/60">
              <tr className="text-left text-sm text-pjh-muted">
                <th className="p-3">Item</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Unit (£)</th>
                <th className="p-3">Total (£)</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((it, i) => {
                const unit = Number(it.unit_price ?? it.price ?? 0);
                const rowTotal = Number(it.qty ?? 1) * unit;
                return (
                  <tr key={i} className="border-t border-white/5">
                    <td className="p-3">{it.name}</td>
                    <td className="p-3">{it.qty}</td>
                    <td className="p-3">{unit.toFixed(2)}</td>
                    <td className="p-3">{rowTotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="text-right text-lg font-semibold space-y-1">
            <p>Deposit: £{Number(order.deposit || 0).toFixed(2)}</p>
            <p>Balance: £{Number(order.balance || 0).toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
