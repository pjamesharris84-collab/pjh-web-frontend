/**
 * ============================================================
 * PJH Web Services — Admin Quote Record (2025 Parity Build)
 * ============================================================
 * Full parity with AdminQuoteNew:
 *  • Loads Packages + Maintenance Plans
 *  • Dual billing modes:
 *      BUILD:
 *        - One-off  → 50% deposit
 *        - Monthly  → 24-month term, deposit = first month
 *      MAINTENANCE:
 *        - One-off (annual) → 100% on quote
 *        - Monthly          → 3-month minimum, deposit = first month
 *  • Mirrors discount and totals math
 *  • Auto-adds/removes maintenance line items (server-driven)
 *  • Includes “Start Monthly Billing” (Stripe checkout) trigger placeholder
 *  • Clean UI: white inputs (black text) on dark admin background
 * ============================================================
 */

import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminQuoteRecord() {
  const { id: customerId, quoteId } = useParams();
  const navigate = useNavigate();
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  const [quote, setQuote] = useState(null);
  const [packages, setPackages] = useState([]);
  const [maintenancePlans, setMaintenancePlans] = useState([]);
  const [saving, setSaving] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  /* ============================================================
     Helpers
  ============================================================ */
  const toNum = (v, f = 0) => (Number.isFinite(Number(v)) ? Number(v) : f);
  const clampPct = (n) => Math.min(Math.max(toNum(n, 0), 0), 100);
  const money = (n) => (Number.isFinite(n) ? n.toFixed(2) : "0.00");

  function distributeAmount(amount, weights) {
    const totalW = weights.reduce((a, b) => a + b, 0) || 1;
    const raw = weights.map((w) => (amount * w) / totalW);
    const rounded = raw.map((x) => Math.floor(x * 100) / 100);
    const diff = Number((amount - rounded.reduce((a, b) => a + b, 0)).toFixed(2));
    if (diff !== 0) {
      const idx = raw.indexOf(Math.max(...raw));
      rounded[idx] = Number((rounded[idx] + diff).toFixed(2));
    }
    return rounded;
  }

  function buildItemsFromPackage(pkg, pricingMode) {
    const features = Array.isArray(pkg.features) ? pkg.features : [];
    const basePrice =
      pricingMode === "monthly" ? toNum(pkg.price_monthly, 0) : toNum(pkg.price_oneoff, 0);

    if (!features.length || basePrice <= 0) {
      return {
        items: [
          {
            id: `pkg-${pkg.id}-${Date.now()}`,
            name: pkg.name || "Package",
            qty: 1,
            unit_price: basePrice,
            discount_percent: 0,
          },
        ],
      };
    }

    const weights = features.map((f) => {
      const s = (f || "").toLowerCase();
      if (/(design|build|development|ui|ux)/.test(s)) return 4;
      if (/(booking|crm|portal|system|scheduler|payment)/.test(s)) return 3;
      if (/(content|seo|hosting|support|training|domain)/.test(s)) return 1.5;
      return 1;
    });

    const amounts = distributeAmount(basePrice, weights);
    const items = features.map((f, i) => ({
      id: `pkg-${pkg.id}-${i}-${Date.now()}`,
      name: f,
      qty: 1,
      unit_price: amounts[i],
      discount_percent: 0,
    }));

    return { items };
  }

  /* ============================================================
     Load Data
  ============================================================ */
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
      return;
    }
    loadPackages();
    loadMaintenancePlans();
  }, []);

  useEffect(() => {
    if (quoteId) loadQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteId]);

  async function loadPackages() {
    try {
      const res = await fetch(`${API_BASE}/api/packages`);
      const data = await res.json();
      setPackages(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("❌ Failed to load packages:", err);
      setPackages([]);
    }
  }

  async function loadMaintenancePlans() {
    try {
      const res = await fetch(`${API_BASE}/api/maintenance/plans`);
      const data = await res.json();
      setMaintenancePlans(
        Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : []
      );
    } catch (err) {
      console.error("❌ Failed to load maintenance plans:", err);
      setMaintenancePlans([]);
    }
  }

  async function loadQuote() {
    try {
      const url = customerId
        ? `${API_BASE}/api/customers/${customerId}/quotes/${quoteId}`
        : `${API_BASE}/api/quotes/${quoteId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const q = data?.quote || data?.data?.quote || data?.data || data;
      if (!q || !q.id) throw new Error("Invalid quote response.");

      const items = Array.isArray(q.items)
        ? q.items.map((it, i) => ({
            id: it.id ?? `item-${i}-${Date.now()}`,
            name: it.name || "Item",
            qty: toNum(it.qty, 1),
            unit_price: toNum(it.unit_price, 0),
            discount_percent: clampPct(it.discount_percent),
          }))
        : [];

      setQuote({
        id: q.id,
        quote_number: q.quote_number,
        customer_id: q.customer_id,
        title: q.title || "",
        description: q.description || "",
        items,
        discount_percent: clampPct(q.discount_percent),
        notes: q.notes || "",
        status: q.status || "pending",
        package_id: q.package_id || "",
        maintenance_id: q.maintenance_id || "",
        // BUILD billing mode
        pricing_mode: q.pricing_mode === "monthly" ? "monthly" : "oneoff",
        // MAINTENANCE billing mode (default to oneoff if absent)
        maintenance_mode: q.maintenance_mode === "monthly" ? "monthly" : "oneoff",
        order_id: q.order_id || null,
      });
    } catch (err) {
      console.error("❌ loadQuote error:", err);
      setError("Failed to load quote details. Check console for details.");
    }
  }

  /* ============================================================
     Derived Totals
  ============================================================ */
  function inferMaintenancePrice(q, plans, toNumber) {
    const plan = plans.find((m) => String(m.id) === String(q?.maintenance_id));
    if (plan) return toNumber(plan.price, 0);

    const names = plans.map((m) => (m.name || "").toLowerCase());
    const maintItem = (q?.items || []).find((it) => {
      const nm = (it.name || "").toLowerCase();
      return names.includes(nm) || /(maintenance|webcare|care\s*plan|support)/i.test(nm);
    });
    return maintItem ? toNumber(maintItem.unit_price, 0) : 0;
  }

  const totals = useMemo(() => {
    if (!quote) return null;

    // Base math (items + discounts)
    const subtotal = quote.items.reduce(
      (sum, it) => sum + toNum(it.qty, 1) * toNum(it.unit_price, 0),
      0
    );

    const afterLine = quote.items.reduce((sum, it) => {
      const gross = toNum(it.qty, 1) * toNum(it.unit_price, 0);
      const lineDisc = clampPct(it.discount_percent);
      const net = gross * (1 - lineDisc / 100);
      return sum + net;
    }, 0);

    const globalDisc = clampPct(quote.discount_percent);
    const afterDiscounts = afterLine * (1 - globalDisc / 100);

    // Package prices
    const pkg = packages.find((p) => String(p.id) === String(quote.package_id));
    const packagePriceMonthly = toNum(pkg?.price_monthly, 0);
    const packagePriceOneoff = toNum(pkg?.price_oneoff, 0);

    // Maintenance price (monthly unit value)
    const maintenancePlan = maintenancePlans.find(
      (m) => String(m.id) === String(quote.maintenance_id)
    );
    const maintenanceMonthly = toNum(maintenancePlan?.price, 0);
const maintenanceAnnual = maintenancePlan?.annual_price
  ? toNum(maintenancePlan.annual_price, 0)
  : maintenanceMonthly * 12 * 0.7778; // fallback if not provided


    let deposit = 0;
    let balance = 0;
    const monthlyBreakdown = [];

    /* ===========================
        BUILD PRICING LOGIC
    =========================== */
    if (quote.pricing_mode === "monthly") {
      const buildMonthly = packagePriceMonthly;
      const buildTotal = buildMonthly * 24;
      monthlyBreakdown.push({
        label: "Website Build (24-month term)",
        monthly: buildMonthly,
        term: 24,
        total: buildTotal,
      });
      deposit += buildMonthly; // first month up-front
      balance += buildMonthly * 23;
    } else {
      // One-off build → 50% deposit / 50% balance (based on item totals equivalence)
      deposit += packagePriceOneoff * 0.5;
      balance += Math.max(packagePriceOneoff * 0.5, 0);
    }

    /* ===========================
        MAINTENANCE PRICING LOGIC
    =========================== */
if (quote.maintenance_id) {
  if (quote.maintenance_mode === "monthly") {
    const maintMonthly = maintenanceMonthly;
    const maintTotal = maintMonthly * 3;
    monthlyBreakdown.push({
      label: "Maintenance Plan (3-month minimum)",
      monthly: maintMonthly,
      term: 3,
      total: maintTotal,
    });
    deposit += maintMonthly;
    balance += maintMonthly * 2;
  } else {
    // Annual one-off maintenance → charged on quote
    monthlyBreakdown.push({
      label: "Maintenance Plan (annual)",
      monthly: maintenanceAnnual,
      term: 1,
      total: maintenanceAnnual,
    });
    deposit += maintenanceAnnual;
  }
}


    return { subtotal, afterDiscounts, deposit, balance, monthlyBreakdown };
  }, [quote, packages, maintenancePlans]);

  /* ============================================================
     Actions
  ============================================================ */
  async function handleSave() {
    if (!quote) return;
    setSaving(true);
    try {
      const url = customerId
        ? `${API_BASE}/api/customers/${customerId}/quotes/${quoteId}`
        : `${API_BASE}/api/quotes/${quoteId}`;

      const payload = {
        customer_id: customerId,
        title: quote.title,
        description: quote.description,
        items: quote.items.map(({ id, ...r }) => r),
        notes: quote.notes,
        package_id: quote.package_id ? Number(quote.package_id) : null,
        maintenance_id: quote.maintenance_id ? Number(quote.maintenance_id) : null,
        discount_percent: clampPct(quote.discount_percent),
        pricing_mode: quote.pricing_mode,          // build billing mode
        maintenance_mode: quote.maintenance_mode,  // maintenance billing mode
        deposit: Number((totals?.deposit ?? 0).toFixed(2)),
      };

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      alert("✅ Quote saved successfully");
      await loadQuote();
    } catch (e) {
      console.error("❌ Save error:", e);
      alert("❌ Failed to save quote.");
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateOrder() {
    if (!quote) return;
    if (!confirm("Convert this quote into an order?")) return;
    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/quotes/${quote.id}/create-order`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data.order) {
        alert("✅ Order created successfully!");
        navigate(`/admin/orders/${data.order.id}`);
      } else {
        alert("❌ Failed to create order.");
      }
    } catch (err) {
      console.error("❌ Create order error:", err);
    } finally {
      setWorking(false);
    }
  }

  // Optional: placeholder if you wire Stripe session creation client-side
  function startMonthlyBilling() {
    alert("Stripe monthly billing flow not yet implemented on this screen.");
  }

  /* ============================================================
     Render
  ============================================================ */

  // Debug line (safe to remove)
  // console.log("Quote totals:", totals, "Build mode:", quote?.pricing_mode, "Maint mode:", quote?.maintenance_mode);

  if (error)
    return (
      <div className="p-10 text-red-400">
        ❌ {error}
        <p className="text-sm text-pjh-muted mt-2">
          Try reloading or check your console for details.
        </p>
      </div>
    );

  if (!quote)
    return (
      <div className="p-10 text-pjh-muted">
        Loading quote details…
        <br />
        <span className="text-xs text-pjh-muted/70">
          (Ensure the backend returns {"{ success: true, quote: {...} }"})
        </span>
      </div>
    );

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-pjh-blue">
          Quote #{quote.quote_number}
        </h1>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              quote.status === "closed"
                ? "bg-slate-500/20 text-slate-300 border border-slate-400/30"
                : "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
            }`}
          >
            {quote.status}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? "Saving…" : "💾 Save Changes"}
        </button>

        <div className="flex flex-wrap gap-3">
          {quote.order_id ? (
            <button
              onClick={() => navigate(`/admin/orders/${quote.order_id}`)}
              className="btn-secondary bg-blue-600 hover:bg-blue-500 text-white"
            >
              🔗 View Created Order
            </button>
          ) : (
            <>
              <button
                onClick={handleCreateOrder}
                disabled={working}
                className="btn-secondary bg-green-600 hover:bg-green-500 text-white"
              >
                🪄 Convert to Order
              </button>

              {(quote.pricing_mode === "monthly" || quote.maintenance_mode === "monthly") && (
                <button
                  onClick={async () => {
                    if (
                      confirm(
                        "No order exists yet. Create one and start monthly billing automatically?"
                      )
                    ) {
                      await handleCreateOrder();
                      setTimeout(() => startMonthlyBilling(), 800);
                    }
                  }}
                  className="btn-primary bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  💳 Start Monthly Billing
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="mt-8 space-y-6">
        <div>
          <label className="block text-sm text-pjh-muted mb-1">Title</label>
          <input
            type="text"
            className="w-full bg-white text-black border border-slate-300 rounded p-2"
            value={quote.title}
            onChange={(e) => setQuote((q) => ({ ...q, title: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm text-pjh-muted mb-1">Description</label>
          <textarea
            className="w-full bg-white text-black border border-slate-300 rounded p-2 min-h-[80px]"
            value={quote.description}
            onChange={(e) => setQuote((q) => ({ ...q, description: e.target.value }))}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-pjh-muted mb-1">Package</label>
            <select
              className="w-full bg-white text-black border border-slate-300 rounded p-2"
              value={quote.package_id}
              onChange={(e) =>
                setQuote((q) => ({ ...q, package_id: e.target.value || "" }))
              }
            >
              <option value="">— Select Package —</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — £{money(p.price_oneoff)}
                </option>
              ))}
            </select>
          </div>

          <div>
  <label className="block text-sm text-pjh-muted mb-1">Maintenance Plan</label>
  <select
    className="w-full bg-white text-black border border-slate-300 rounded p-2"
    value={quote.maintenance_id}
    onChange={(e) =>
      setQuote((q) => ({ ...q, maintenance_id: e.target.value || "" }))
    }
  >
    <option value="">— None —</option>
    {maintenancePlans.map((m) => {
      // derive annual if not stored
      const monthly = toNum(m.price, 0);
      const annual = m.annual_price
        ? toNum(m.annual_price, 0)
        : Math.round(monthly * 12 * 0.7778); // roughly your pricing pattern (e.g., £45/mo → £420/yr)
      return (
        <option key={m.id} value={m.id}>
          {m.name} — £{money(monthly)}/mo (£{money(annual)}/yr)
        </option>
      );
    })}
  </select>
</div>

        </div>

        {/* Billing modes */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-pjh-muted mb-1">Build Billing Mode</label>
            <select
              className="w-full bg-white text-black border border-slate-300 rounded p-2"
              value={quote.pricing_mode}
              onChange={(e) =>
                setQuote((q) => ({ ...q, pricing_mode: e.target.value }))
              }
            >
              <option value="oneoff">One-off (50% deposit)</option>
              <option value="monthly">Monthly (24-month term)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-pjh-muted mb-1">
              Maintenance Billing Mode
            </label>
            <select
              className="w-full bg-white text-black border border-slate-300 rounded p-2"
              value={quote.maintenance_mode}
              onChange={(e) =>
                setQuote((q) => ({ ...q, maintenance_mode: e.target.value }))
              }
            >
              <option value="oneoff">One-off (annual payment)</option>
              <option value="monthly">Monthly (3-month minimum)</option>
            </select>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="overflow-x-auto mt-8">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-pjh-dark text-pjh-blue uppercase text-xs">
              <tr>
                <th className="p-2 text-left">Item</th>
                <th className="p-2 text-right">Qty</th>
                <th className="p-2 text-right">Unit (£)</th>
                <th className="p-2 text-right">Disc %</th>
                <th className="p-2 text-right">Line Total (£)</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((it, i) => (
                <tr key={it.id} className="border-b border-slate-800">
                  <td className="p-2">
                    <input
                      className="w-full bg-white text-black border border-slate-300 rounded p-1"
                      value={it.name}
                      onChange={(e) =>
                        setQuote((q) => {
                          const items = [...q.items];
                          items[i].name = e.target.value;
                          return { ...q, items };
                        })
                      }
                    />
                  </td>
                  <td className="p-2 text-right">
                    <input
                      type="number"
                      className="w-20 bg-white text-black border border-slate-300 rounded p-1 text-right"
                      value={it.qty}
                      onChange={(e) =>
                        setQuote((q) => {
                          const items = [...q.items];
                          items[i].qty = toNum(e.target.value, 1);
                          return { ...q, items };
                        })
                      }
                    />
                  </td>
                  <td className="p-2 text-right">
                    <input
                      type="number"
                      className="w-28 bg-white text-black border border-slate-300 rounded p-1 text-right"
                      value={it.unit_price}
                      onChange={(e) =>
                        setQuote((q) => {
                          const items = [...q.items];
                          items[i].unit_price = toNum(e.target.value, 0);
                          return { ...q, items };
                        })
                      }
                    />
                  </td>
                  <td className="p-2 text-right">
                    <input
                      type="number"
                      className="w-20 bg-white text-black border border-slate-300 rounded p-1 text-right"
                      value={it.discount_percent}
                      onChange={(e) =>
                        setQuote((q) => {
                          const items = [...q.items];
                          items[i].discount_percent = clampPct(e.target.value);
                          return { ...q, items };
                        })
                      }
                    />
                  </td>
                  <td className="p-2 text-right">
                    £{money(it.qty * it.unit_price * (1 - it.discount_percent / 100))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTALS */}
        <div className="mt-6 text-sm bg-pjh-dark p-4 rounded-lg border border-slate-800 space-y-2">
          <div className="flex justify-between mb-1">
            <span>Subtotal:</span>
            <span>£{money(totals?.subtotal)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>After Discounts:</span>
            <span>£{money(totals?.afterDiscounts)}</span>
          </div>

          {/* Payment Breakdown (shows if any part uses a term or we want to show annual line) */}
          {totals?.monthlyBreakdown?.length > 0 && (
            <div className="mt-3 border-t border-slate-700 pt-3">
              <p className="font-semibold text-pjh-blue mb-1">Payment Breakdown</p>
              {totals.monthlyBreakdown.map((b, i) => (
                <div key={i} className="flex justify-between text-pjh-muted">
                  <span>{b.label}</span>
                  <span>
                    £{money(b.monthly)} × {b.term} {b.term === 1 ? "time" : "months"} = £{money(b.total)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between mb-1 border-t border-slate-700 pt-2">
            <span>
              {(quote.pricing_mode === "monthly" || quote.maintenance_mode === "monthly")
                ? "Deposit (first month + any one-off maintenance):"
                : "Deposit:"}
            </span>
            <span>£{money(totals?.deposit)}</span>
          </div>

          <div className="flex justify-between font-semibold text-pjh-blue">
            <span>Balance Remaining:</span>
            <span>£{money(totals?.balance)}</span>
          </div>
        </div>

        {/* NOTES */}
        <div>
          <label className="block text-sm text-pjh-muted mb-1">Notes</label>
          <textarea
            className="w-full bg-white text-black border border-slate-300 rounded p-2 min-h-[80px]"
            value={quote.notes}
            onChange={(e) => setQuote((q) => ({ ...q, notes: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
}
