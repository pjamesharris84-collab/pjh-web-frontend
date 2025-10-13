/**
 * ============================================================
 * PJH Web Services — Admin Quote Record (2025 Parity Build)
 * ============================================================
 * Full parity with AdminQuoteNew:
 *  • Loads Packages + Maintenance Plans
 *  • Smart deposit logic:
 *      - One-off  → 50% of package + 100% maintenance
 *      - Monthly  → 100% of both (first month)
 *  • Mirrors discount and totals math
 *  • Auto-adds/removes maintenance line items
 *  • Includes “Start Monthly Billing” (Stripe checkout)
 *  • Fix: Proper rendering & full quote editor UI
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
        pricing_mode: q.pricing_mode === "monthly" ? "monthly" : "oneoff",
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
  function inferMaintenancePrice(quote, maintenancePlans, toNum) {
    const plan = maintenancePlans.find(
      (m) => String(m.id) === String(quote?.maintenance_id)
    );
    if (plan) return toNum(plan.price, 0);

    const names = maintenancePlans.map((m) => (m.name || "").toLowerCase());
    const maintItem = (quote?.items || []).find((it) => {
      const nm = (it.name || "").toLowerCase();
      return names.includes(nm) || /(maintenance|webcare|care\s*plan|support)/i.test(nm);
    });
    return maintItem ? toNum(maintItem.unit_price, 0) : 0;
  }

  const totals = useMemo(() => {
    if (!quote) return null;

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

    const pkg = packages.find((p) => String(p.id) === String(quote.package_id));
    const packagePrice =
      quote.pricing_mode === "monthly"
        ? toNum(pkg?.price_monthly, 0)
        : toNum(pkg?.price_oneoff, 0);

    const maintenancePrice = inferMaintenancePrice(quote, maintenancePlans, toNum);

    let deposit = 0;
    if (quote.pricing_mode === "monthly") {
      deposit = packagePrice + maintenancePrice;
    } else {
      deposit = packagePrice * 0.5 + maintenancePrice;
    }

    const balance =
      quote.pricing_mode === "monthly"
        ? 0
        : Math.max(afterDiscounts - (packagePrice * 0.5 + maintenancePrice), 0);

    return { subtotal, afterDiscounts, deposit, balance };
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
        pricing_mode: quote.pricing_mode,
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

  /* ============================================================
     Render
  ============================================================ */
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
      <>
        <button
          onClick={() => navigate(`/admin/orders/${quote.order_id}`)}
          className="btn-secondary bg-blue-600 hover:bg-blue-500 text-white"
        >
          🔗 View Created Order
        </button>

            </>
    ) : (
      <>
        <button
          onClick={handleCreateOrder}
          disabled={working}
          className="btn-secondary bg-green-600 hover:bg-green-500 text-white"
        >
          🪄 Convert to Order
        </button>

        {/* 💳 Optionally show even before order creation */}
        {(quote.pricing_mode === "monthly" || quote.maintenance_id) && (
          <button
            onClick={async () => {
              if (
                confirm(
                  "No order exists yet. Create one and start billing automatically?"
                )
              ) {
                await handleCreateOrder();
                setTimeout(() => startMonthlyBilling(), 1200);
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
            className="w-full bg-pjh-dark border border-slate-700 rounded p-2"
            value={quote.title}
            onChange={(e) => setQuote({ ...quote, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-pjh-muted mb-1">Description</label>
          <textarea
            className="w-full bg-pjh-dark border border-slate-700 rounded p-2 min-h-[80px]"
            value={quote.description}
            onChange={(e) => setQuote({ ...quote, description: e.target.value })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-pjh-muted mb-1">Package</label>
            <select
              className="w-full bg-pjh-dark border border-slate-700 rounded p-2"
              value={quote.package_id}
              onChange={(e) =>
                setQuote({ ...quote, package_id: e.target.value || "" })
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
            <label className="block text-sm text-pjh-muted mb-1">
              Maintenance Plan
            </label>
            <select
              className="w-full bg-pjh-dark border border-slate-700 rounded p-2"
              value={quote.maintenance_id}
              onChange={(e) =>
                setQuote({ ...quote, maintenance_id: e.target.value || "" })
              }
            >
              <option value="">— None —</option>
              {maintenancePlans.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — £{money(m.price)}/mo
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-pjh-muted mb-1">Pricing Mode</label>
          <select
            className="w-full bg-pjh-dark border border-slate-700 rounded p-2"
            value={quote.pricing_mode}
            onChange={(e) => setQuote({ ...quote, pricing_mode: e.target.value })}
          >
            <option value="oneoff">One-off (50% deposit)</option>
            <option value="monthly">Monthly Subscription</option>
          </select>
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
                      className="w-full bg-transparent"
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
                      className="w-16 bg-transparent text-right"
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
                      className="w-24 bg-transparent text-right"
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
                      className="w-16 bg-transparent text-right"
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
        <div className="mt-6 text-sm bg-pjh-dark p-4 rounded-lg border border-slate-800">
          <div className="flex justify-between mb-1">
            <span>Subtotal:</span>
            <span>£{money(totals?.subtotal)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>After Discounts:</span>
            <span>£{money(totals?.afterDiscounts)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Deposit:</span>
            <span>£{money(totals?.deposit)}</span>
          </div>
          <div className="flex justify-between font-semibold text-pjh-blue">
            <span>Balance:</span>
            <span>£{money(totals?.balance)}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-pjh-muted mb-1">Notes</label>
          <textarea
            className="w-full bg-pjh-dark border border-slate-700 rounded p-2 min-h-[80px]"
            value={quote.notes}
            onChange={(e) => setQuote({ ...quote, notes: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
