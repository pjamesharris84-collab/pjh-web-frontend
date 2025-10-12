/**
 * ============================================================
 * PJH Web Services — Admin Quote Record (2025 Parity Build)
 * ============================================================
 * Full parity with AdminQuoteNew:
 *  • Loads Packages + Maintenance Plans
 *  • Smart deposit logic:
 *      - One-off  → 50% of package + 100% maintenance
 *      - Monthly  → 100% of both (first month)
 *  • Mirrors full discount and totals math
 *  • Auto-adds/removes maintenance line items
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
  const [maintenancePlans, setMaintenancePlans] = useState([]); // ✅ added
  const [saving, setSaving] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  // ──────────────────────────────
  // Helpers
  // ──────────────────────────────
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

  // ──────────────────────────────
  // Auth / load
  // ──────────────────────────────
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") window.location.href = "/admin";
  }, []);

  useEffect(() => {
    if (quoteId) loadQuote();
    loadPackages();
    loadMaintenancePlans(); // ✅ added
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

  async function loadMaintenancePlans() {
    try {
      const res = await fetch(`${API_BASE}/api/maintenance/plans`);
      const data = await res.json();
      setMaintenancePlans(
        Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : []
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
        maintenance_id: q.maintenance_id || "",
        pricing_mode: q.pricing_mode === "monthly" ? "monthly" : "oneoff",
        order_id: q.order_id || null,
      });
    } catch {
      setError("Failed to load quote.");
    }
  }

  function inferMaintenancePrice(quote, maintenancePlans, toNum) {
  // 1) Prefer by saved maintenance_id
  const plan = maintenancePlans.find(
    (m) => String(m.id) === String(quote?.maintenance_id)
  );
  if (plan) return toNum(plan.price, 0);

  // 2) Fall back: infer from line items
  const names = maintenancePlans.map((m) => (m.name || "").toLowerCase());
  const maintItem = (quote?.items || []).find((it) => {
    const nm = (it.name || "").toLowerCase();
    return (
      names.includes(nm) ||
      /(maintenance|webcare|care\s*plan|support)/i.test(nm)
    );
  });
  return maintItem ? toNum(maintItem.unit_price, 0) : 0;
}

const totals = useMemo(() => {
  if (!quote) return null;

  // Line-item maths (keeps discounts intact)
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

  // Determine package price from selected package (monthly vs one-off)
  const pkg = packages.find((p) => String(p.id) === String(quote.package_id));
  const packagePrice =
    quote.pricing_mode === "monthly"
      ? toNum(pkg?.price_monthly, 0)
      : toNum(pkg?.price_oneoff, 0);

  // Maintenance: robust — use maintenance_id if present, else infer from items
  const maintenancePrice = inferMaintenancePrice(quote, maintenancePlans, toNum);

  // Deposit rules:
  //  - One-off: 50% of package + first month of maintenance
  //  - Monthly: 100% of package (first month) + 100% of maintenance (first month)
  let deposit = 0;
  if (quote.pricing_mode === "monthly") {
    deposit = packagePrice + maintenancePrice;
  } else {
    deposit = packagePrice * 0.5 + maintenancePrice;
  }

  // Balance rules:
  //  - One-off: remaining 50% of package ONLY (maintenance first month already covered in deposit)
  //  - Monthly: 0 (ongoing monthly billing handled separately)
  const balance =
    quote.pricing_mode === "monthly"
      ? 0
      : Math.max(afterDiscounts - (packagePrice * 0.5 + maintenancePrice), 0);

  return { subtotal, afterDiscounts, deposit, balance };
}, [quote, packages, maintenancePlans]);



  // ──────────────────────────────
  // Line items CRUD
  // ──────────────────────────────
  const updateItem = (i, patch) =>
    setQuote((q) => {
      const items = [...q.items];
      items[i] = {
        ...items[i],
        ...patch,
        discount_percent: clampPct(patch.discount_percent ?? items[i].discount_percent),
      };
      return { ...q, items };
    });

  const addItem = () =>
    setQuote((q) => ({
      ...q,
      items: [
        ...q.items,
        {
          id: `item-${Date.now()}`,
          name: "New Item",
          qty: 1,
          unit_price: 0,
          discount_percent: 0,
        },
      ],
    }));

  const removeItem = (i) =>
    setQuote((q) => ({ ...q, items: q.items.filter((_, idx) => idx !== i) }));

  // ──────────────────────────────
  // Package, Maintenance & Pricing mode controls
  // ──────────────────────────────
  function handlePackageChange(packageId) {
    if (!packageId) {
      setQuote((q) => ({ ...q, package_id: "", items: q.items }));
      return;
    }
    const pkg = packages.find((p) => String(p.id) === String(packageId));
    if (!pkg) return;

    if (!confirm("Replace current items with this package’s features?")) {
      setQuote((q) => ({ ...q, package_id: pkg.id }));
      return;
    }

    const { items } = buildItemsFromPackage(pkg, quote.pricing_mode);
    setQuote((q) => ({
      ...q,
      package_id: pkg.id,
      title: q.title || pkg.name,
      description: q.description || pkg.tagline,
      items,
    }));
  }

  function handleMaintenanceChange(maintId) {
    const plan = maintenancePlans.find((m) => String(m.id) === String(maintId));
    if (!plan) return;
    setQuote((q) => {
      // Remove any previous maintenance lines
      const filtered = q.items.filter(
        (it) => !/(maintenance|care|support|plan)/i.test(it.name)
      );
      // Add selected plan as line item
      const newItem = {
        id: `maint-${plan.id}-${Date.now()}`,
        name: plan.name,
        qty: 1,
        unit_price: toNum(plan.price, 0),
        discount_percent: 0,
      };
      return { ...q, maintenance_id: maintId, items: [...filtered, newItem] };
    });
  }

  function handlePricingModeChange(mode) {
    if (mode === quote.pricing_mode) return;
    if (!quote.package_id) {
      setQuote((q) => ({ ...q, pricing_mode: mode }));
      return;
    }
    const pkg = packages.find((p) => String(p.id) === String(quote.package_id));
    if (!pkg) return;
    if (confirm("Switch pricing mode and rebuild items from package?")) {
      const { items } = buildItemsFromPackage(pkg, mode);
      setQuote((q) => ({ ...q, pricing_mode: mode, items }));
    } else {
      setQuote((q) => ({ ...q, pricing_mode: mode }));
    }
  }

  // ──────────────────────────────
  // Save / Order Actions
  // ──────────────────────────────
  async function handleSave() {
    if (!quote) return;
    setSaving(true);
    try {
      const url = customerId
        ? `${API_BASE}/api/customers/${customerId}/quotes/${quoteId}`
        : `${API_BASE}/api/quotes/${quoteId}`;

const payload = {
  customer_id: customerId,
  title: form.title,
  description: form.description,
  items: form.items.map(({ id, ...r }) => r),
  notes: form.notes,
  package_id: form.package_id ? Number(form.package_id) : null,
  maintenance_id: form.maintenance_id ? Number(form.maintenance_id) : null, // ✅ Added
  discount_percent: clampPct(form.discount_percent),
  pricing_mode: form.pricing_mode,
  deposit: Number((totals.deposit ?? 0).toFixed(2)),
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

     <div className="mt-6 grid sm:grid-cols-2 gap-4">
  <button onClick={handleSave} disabled={saving} className="btn-primary">
    {saving ? "Saving…" : "💾 Save Changes"}
  </button>

  {quote.order_id ? (
    <button
      onClick={() => navigate(`/admin/orders/${quote.order_id}`)}
      className="btn-secondary bg-blue-600 hover:bg-blue-500 text-white"
    >
      🔗 View Created Order
    </button>
  ) : (
    <button
      onClick={handleCreateOrder}
      disabled={working}
      className="btn-secondary bg-green-600 hover:bg-green-500 text-white"
    >
      🪄 Convert to Order
    </button>
  )}
</div>


      {/* META */}
      <div className="bg-pjh-gray p-6 rounded-xl mt-6 grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-sm text-pjh-muted">Website Package</label>
          <select
            className="form-input mt-1"
            value={quote.package_id || ""}
            onChange={(e) => handlePackageChange(e.target.value)}
          >
            <option value="">— No Package —</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (One-off £{money(toNum(p.price_oneoff))} • Monthly £
                {money(toNum(p.price_monthly))})
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Maintenance Plan */}
        <div className="sm:col-span-2">
          <label className="text-sm text-pjh-muted">Maintenance Plan</label>
          <select
            className="form-input mt-1"
            value={quote.maintenance_id || ""}
            onChange={(e) => handleMaintenanceChange(e.target.value)}
          >
            <option value="">— Optional maintenance plan —</option>
            {maintenancePlans.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} (£{money(toNum(m.price))}/month)
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
                quote.pricing_mode === "oneoff"
                  ? "bg-pjh-blue text-white"
                  : "bg-pjh-slate text-pjh-muted"
              }`}
              onClick={() => handlePricingModeChange("oneoff")}
            >
              One-off
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-md ${
                quote.pricing_mode === "monthly"
                  ? "bg-pjh-blue text-white"
                  : "bg-pjh-slate text-pjh-muted"
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
            onChange={(e) =>
              setQuote({ ...quote, description: e.target.value })
            }
            placeholder="Short description"
          />
        </div>

        <div>
          <label className="text-sm text-pjh-muted">Global Discount (%)</label>
          <input
            type="number"
            className="form-input mt-1"
            value={quote.discount_percent ?? 0}
            onChange={(e) =>
              setQuote({ ...quote, discount_percent: clampPct(e.target.value) })
            }
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
          <button onClick={addItem} className="btn-secondary">
            ➕ Add Line
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/10 rounded-lg">
            <thead className="bg-pjh-gray/60 text-left text-sm text-pjh-muted">
              <tr>
                <th className="p-3 w-[36%]">Item</th>
                <th className="p-3 w-[10%]">Qty</th>
                <th className="p-3 w-[14%]">Unit (£)</th>
                <th className="p-3 w-[14%]">Discount %</th>
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
                        onChange={(e) =>
                          updateItem(i, { name: e.target.value })
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        className="form-input w-24"
                        value={it.qty}
                        onChange={(e) =>
                          updateItem(i, { qty: toNum(e.target.value, 0) })
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="form-input w-32"
                        value={it.unit_price}
                        onChange={(e) =>
                          updateItem(i, {
                            unit_price: toNum(e.target.value, 0),
                          })
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        className="form-input w-24"
                        value={it.discount_percent}
                        onChange={(e) =>
                          updateItem(i, {
                            discount_percent: clampPct(e.target.value),
                          })
                        }
                      />
                    </td>
                    <td className="p-2 font-semibold">£{money(net)}</td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => removeItem(i)}
                        className="btn-danger"
                      >
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

        {totals && (
          <div className="mt-6 grid gap-1 justify-end text-right">
            <p className="text-sm text-pjh-muted">
              Subtotal
              {quote.pricing_mode === "monthly" ? " (per month)" : ""}: £
              {money(totals.subtotal)}
            </p>
            <p className="text-sm">
              After discounts: <b>£{money(totals.afterDiscounts)}</b>
            </p>
            <p className="text-lg">
              Deposit{" "}
              {quote.pricing_mode === "monthly"
                ? "(first month)"
                : quote.maintenance_id
                ? "(50% + first month of maintenance)"
                : "(50%)"}
              : <b>£{money(totals.deposit)}</b>
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
