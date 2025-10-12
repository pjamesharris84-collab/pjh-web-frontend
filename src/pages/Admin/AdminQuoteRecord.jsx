/**
 * ============================================================
 * PJH Web Services — Admin Quote Record (2025 Parity & Clean Maths)
 * ============================================================
 * Rules:
 *  • Packages populate line items and define total cost
 *  • Subtotal = sum of items before discounts
 *  • After Discounts = Subtotal minus line discounts, then global discount
 *  • Deposit (NOT editable):
 *      - oneoff  → 50% of After Discounts
 *      - monthly → first month's charge (After Discounts)
 *  • Balance = After Discounts - Deposit (monthly → £0.00)
 *  • Package + pricing mode can be changed any time (with rebuild confirm)
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
  const [saving, setSaving] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  // ──────────────────────────────
  // Helpers
  // ──────────────────────────────
  const toNum = (v, f = 0) => (Number.isFinite(Number(v)) ? Number(v) : f);
  const clampPct = (n) => Math.min(Math.max(toNum(n, 0), 0), 100);
  const money = (n) => (Number.isFinite(n) ? n.toFixed(2) : "0.00");

  // Distribute base amount across features by weights and ensure the sum is exact
  function distributeAmount(amount, weights) {
    const totalW = weights.reduce((a, b) => a + b, 0) || 1;
    const raw = weights.map((w) => (amount * w) / totalW);
    const rounded = raw.map((x) => Math.floor(x * 100) / 100);
    const diff = Number((amount - rounded.reduce((a, b) => a + b, 0)).toFixed(2));
    if (diff !== 0) {
      // add remainder to the largest raw share to keep proportionality sensible
      let idx = 0;
      let max = -Infinity;
      raw.forEach((x, i) => {
        if (x > max) {
          max = x;
          idx = i;
        }
      });
      rounded[idx] = Number((rounded[idx] + diff).toFixed(2));
    }
    return rounded;
  }

  // Build line items from a package for a pricing mode
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
      return 1; // default
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

  // ──────────────────────────────
  // Auth / load
  // ──────────────────────────────
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") window.location.href = "/admin";
  }, []);

  useEffect(() => {
    if (quoteId) loadQuote();
    loadPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteId]);

  async function loadPackages() {
    try {
      const res = await fetch(`${API_BASE}/api/packages`);
      const data = await res.json();
      setPackages(Array.isArray(data) ? data : data.data || []);
    } catch {
      setPackages([]);
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

      const q = data.quote || data.data || data;

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
        pricing_mode: q.pricing_mode === "monthly" ? "monthly" : "oneoff",
        order_id: q.order_id || null,
      });
    } catch {
      setError("Failed to load quote.");
    }
  }

  // ──────────────────────────────
  // Totals
  // ──────────────────────────────
  const totals = useMemo(() => {
    if (!quote) return null;

    // Subtotal (before any discounts)
    const subtotal = quote.items.reduce(
      (sum, it) => sum + toNum(it.qty, 1) * toNum(it.unit_price, 0),
      0
    );

    // After line discounts
    const afterLine = quote.items.reduce((sum, it) => {
      const gross = toNum(it.qty, 1) * toNum(it.unit_price, 0);
      const lineDisc = clampPct(it.discount_percent);
      const net = gross * (1 - lineDisc / 100);
      return sum + net;
    }, 0);

    // After global discount
    const globalDisc = clampPct(quote.discount_percent);
    const afterDiscounts = afterLine * (1 - globalDisc / 100);

    // Deposit logic
    const deposit =
      quote.pricing_mode === "monthly"
        ? afterDiscounts // first month
        : afterDiscounts * 0.5; // 50% for one-off

    // Balance
    const balance =
      quote.pricing_mode === "monthly" ? 0 : Math.max(afterDiscounts - deposit, 0);

    return { subtotal, afterDiscounts, deposit, balance };
  }, [quote]);

  // ──────────────────────────────
  // Line items CRUD
  // ──────────────────────────────
  const updateItem = (i, patch) =>
    setQuote((q) => {
      const items = [...q.items];
      items[i] = { ...items[i], ...patch, discount_percent: clampPct(patch.discount_percent ?? items[i].discount_percent) };
      return { ...q, items };
    });

  const addItem = () =>
    setQuote((q) => ({
      ...q,
      items: [
        ...q.items,
        { id: `item-${Date.now()}`, name: "New Item", qty: 1, unit_price: 0, discount_percent: 0 },
      ],
    }));

  const removeItem = (i) =>
    setQuote((q) => ({ ...q, items: q.items.filter((_, idx) => idx !== i) }));

  // ──────────────────────────────
  // Package & Pricing mode controls
  // ──────────────────────────────
  function handlePackageChange(packageId) {
    if (!packageId) {
      setQuote((q) => ({ ...q, package_id: "", items: q.items })); // keep current items
      return;
    }
    const pkg = packages.find((p) => String(p.id) === String(packageId));
    if (!pkg) return;

    if (!confirm("Replace current items with items from this package?")) {
      setQuote((q) => ({ ...q, package_id: pkg.id })); // just store selection
      return;
    }

    const { items } = buildItemsFromPackage(pkg, quote.pricing_mode);
    setQuote((q) => ({
      ...q,
      package_id: pkg.id,
      title: q.title || pkg.name || "Quote",
      description: q.description || pkg.tagline || "",
      items,
    }));
  }

  function handlePricingModeChange(mode) {
    if (mode === quote.pricing_mode) return;
    if (!quote.package_id) {
      // No package selected → just switch mode, keep manual items as-is
      setQuote((q) => ({ ...q, pricing_mode: mode }));
      return;
    }
    const pkg = packages.find((p) => String(p.id) === String(quote.package_id));
    if (!pkg) {
      setQuote((q) => ({ ...q, pricing_mode: mode }));
      return;
    }

    if (confirm("Switch pricing mode and rebuild items from the selected package?")) {
      const { items } = buildItemsFromPackage(pkg, mode);
      setQuote((q) => ({ ...q, pricing_mode: mode, items }));
    } else {
      setQuote((q) => ({ ...q, pricing_mode: mode }));
    }
  }

  // ──────────────────────────────
  // Actions
  // ──────────────────────────────
  async function handleSave() {
    if (!quote) return;
    setSaving(true);
    try {
      const url = customerId
        ? `${API_BASE}/api/customers/${customerId}/quotes/${quoteId}`
        : `${API_BASE}/api/quotes/${quoteId}`;

      const payload = {
        title: quote.title,
        description: quote.description,
        items: quote.items.map(({ id, ...r }) => r),
        notes: quote.notes,
        status: quote.status,
        discount_percent: clampPct(quote.discount_percent),
        package_id: quote.package_id ? Number(quote.package_id) : null,
        pricing_mode: quote.pricing_mode || "oneoff",
        deposit: Number((totals?.deposit ?? 0).toFixed(2)),
      };

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      alert("✅ Quote saved");
      await loadQuote();
    } catch (e) {
      console.error(e);
      alert("❌ Save failed");
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
        alert("❌ Failed to create order");
      }
    } finally {
      setWorking(false);
    }
  }

  // ──────────────────────────────
  // Render
  // ──────────────────────────────
  if (error) return <div className="p-10 text-red-400">❌ {error}</div>;
  if (!quote) return <div className="p-10 text-pjh-muted">Loading…</div>;

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
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
        <button
          onClick={handleCreateOrder}
          disabled={working}
          className="btn-secondary bg-green-600 hover:bg-green-500 text-white"
        >
          🪄 Convert to Order
        </button>
      </div>

      {/* META */}
      <div className="bg-pjh-gray p-6 rounded-xl mt-6 grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-sm text-pjh-muted">Package</label>
          <select
            className="form-input mt-1"
            value={quote.package_id || ""}
            onChange={(e) => handlePackageChange(e.target.value)}
          >
            <option value="">— No Package —</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (One-off £{money(toNum(p.price_oneoff))} • Monthly £{money(toNum(p.price_monthly))})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-pjh-muted">Pricing Mode</label>
          <div className="flex gap-2 mt-1">
            <button
              type="button"
              className={`px-3 py-1 rounded-md ${
                quote.pricing_mode === "oneoff" ? "bg-pjh-blue text-white" : "bg-pjh-slate text-pjh-muted"
              }`}
              onClick={() => handlePricingModeChange("oneoff")}
            >
              One-off
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-md ${
                quote.pricing_mode === "monthly" ? "bg-pjh-blue text-white" : "bg-pjh-slate text-pjh-muted"
              }`}
              onClick={() => handlePricingModeChange("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm text-pjh-muted">Status</label>
          <select
            className="form-input mt-1"
            value={quote.status}
            onChange={(e) => setQuote({ ...quote, status: e.target.value })}
          >
            <option value="pending">pending</option>
            <option value="closed">closed</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm text-pjh-muted">Title</label>
          <input
            className="form-input mt-1"
            value={quote.title}
            onChange={(e) => setQuote({ ...quote, title: e.target.value })}
            placeholder="Project Title"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm text-pjh-muted">Description</label>
          <textarea
            className="form-input mt-1"
            rows={3}
            value={quote.description}
            onChange={(e) => setQuote({ ...quote, description: e.target.value })}
            placeholder="Short description"
          />
        </div>

        <div>
          <label className="text-sm text-pjh-muted">Global Discount (%)</label>
          <input
            type="number"
            className="form-input mt-1"
            value={quote.discount_percent ?? 0}
            onChange={(e) => setQuote({ ...quote, discount_percent: clampPct(e.target.value) })}
            min="0"
            max="100"
            step="0.01"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm text-pjh-muted">Notes</label>
          <textarea
            className="form-input mt-1"
            rows={2}
            value={quote.notes}
            onChange={(e) => setQuote({ ...quote, notes: e.target.value })}
            placeholder="Internal notes"
          />
        </div>
      </div>

      {/* ITEMS */}
      <div className="bg-pjh-slate p-6 rounded-xl mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-pjh-blue">Line Items</h2>
          <button onClick={addItem} className="btn-secondary">➕ Add Line</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/10 rounded-lg">
            <thead className="bg-pjh-gray/60 text-left text-sm text-pjh-muted">
              <tr>
                <th className="p-3 w-[36%]">Item</th>
                <th className="p-3 w-[10%]">Qty</th>
                <th className="p-3 w-[14%]">Unit (£)</th>
                <th className="p-3 w-[14%]">Line Discount %</th>
                <th className="p-3 w-[16%]">Line Total (£)</th>
                <th className="p-3 w-[10%]"></th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((it, i) => {
                const gross = toNum(it.qty, 1) * toNum(it.unit_price, 0);
                const net = gross * (1 - clampPct(it.discount_percent) / 100);
                return (
                  <tr key={it.id} className="border-t border-white/5">
                    <td className="p-2">
                      <input
                        className="form-input w-full"
                        value={it.name}
                        onChange={(e) => updateItem(i, { name: e.target.value })}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        className="form-input w-24"
                        value={it.qty}
                        onChange={(e) => updateItem(i, { qty: toNum(e.target.value, 0) })}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="form-input w-32"
                        value={it.unit_price}
                        onChange={(e) => updateItem(i, { unit_price: toNum(e.target.value, 0) })}
                      />
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col">
                        <label className="text-xs text-pjh-muted mb-1">Discount %</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          className="form-input w-28"
                          value={it.discount_percent}
                          onChange={(e) => updateItem(i, { discount_percent: clampPct(e.target.value) })}
                        />
                      </div>
                    </td>
                    <td className="p-2 font-semibold">£{money(net)}</td>
                    <td className="p-2 text-right">
                      <button onClick={() => removeItem(i)} className="btn-danger" title="Remove line">
                        ✖
                      </button>
                    </td>
                  </tr>
                );
              })}
              {quote.items.length === 0 && (
                <tr>
                  <td className="p-4 text-pjh-muted" colSpan={6}>
                    No line items. Choose a package or add lines.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TOTALS */}
        {totals && (
          <div className="mt-6 grid gap-1 justify-end text-right">
            <p className="text-sm text-pjh-muted">
              Subtotal{quote.pricing_mode === "monthly" ? " (per month)" : ""}: £{money(totals.subtotal)}
            </p>
            <p className="text-sm">
              After discounts: <b>£{money(totals.afterDiscounts)}</b>
            </p>
            <p className="text-lg">
              Deposit {quote.pricing_mode === "monthly" ? "(first month)" : "(50%)"}:{" "}
              <b>£{money(totals.deposit)}</b>
            </p>
            <p className="text-lg">
              Balance: <b>£{money(totals.balance)}</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
