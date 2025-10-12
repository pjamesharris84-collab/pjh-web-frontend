/**
 * ============================================================
 * PJH Web Services — Admin Quote New (2025 Production Ready)
 * ============================================================
 *  • Loads packages from /api/packages
 *  • Loads maintenance plans from /api/maintenance/plans
 *  • Subtotal → After Discounts → Deposit (auto) → Balance
 *  • Deposit auto: 50% (one-off) | full month (monthly)
 *  • Add/delete lines, global delete + close buttons
 * ============================================================
 */

import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminQuoteNew() {
  const { id: customerId } = useParams();
  const navigate = useNavigate();
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  const [customer, setCustomer] = useState(null);
  const [packages, setPackages] = useState([]);
  const [maintenancePlans, setMaintenancePlans] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    notes: "",
    package_id: "",
    maintenance_id: "",
    pricing_mode: "oneoff",
    discount_percent: 0,
    items: [],
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [closing, setClosing] = useState(false);

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
      pricingMode === "monthly"
        ? toNum(pkg.price_monthly, 0)
        : toNum(pkg.price_oneoff, 0);

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
  // Load customer + packages + maintenance plans
  // ──────────────────────────────
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true")
      window.location.href = "/admin";
  }, []);

  useEffect(() => {
    (async () => {
      if (!customerId) return;
      const res = await fetch(`${API_BASE}/api/customers/${customerId}`);
      const data = await res.json();
      setCustomer(data.data || data);
    })();
  }, [customerId]);

  useEffect(() => {
    (async () => {
      try {
        const [pkgRes, maintRes] = await Promise.all([
          fetch(`${API_BASE}/api/packages`),
          fetch(`${API_BASE}/api/maintenance/plans`),
        ]);
        const pkgData = await pkgRes.json();
        const maintData = await maintRes.json();

        setPackages(
          Array.isArray(pkgData)
            ? pkgData
            : Array.isArray(pkgData.data)
            ? pkgData.data
            : []
        );
        setMaintenancePlans(
          Array.isArray(maintData)
            ? maintData
            : Array.isArray(maintData.data)
            ? maintData.data
            : []
        );
      } catch (err) {
        console.error("❌ Failed to load packages or maintenance plans:", err);
        setPackages([]);
        setMaintenancePlans([]);
      }
    })();
  }, []);

  // ──────────────────────────────
  // Package & maintenance logic
  // ──────────────────────────────
  function handlePackageChange(packageId) {
    if (!packageId)
      return setForm((f) => ({ ...f, package_id: "", items: f.items }));
    const pkg = packages.find((p) => String(p.id) === String(packageId));
    if (!pkg) return;
    if (!confirm("Replace current items with this package’s features?")) {
      setForm((f) => ({ ...f, package_id: pkg.id }));
      return;
    }
    const { items } = buildItemsFromPackage(pkg, form.pricing_mode);
    setForm((f) => ({
      ...f,
      package_id: pkg.id,
      title: f.title || pkg.name,
      description: f.description || pkg.tagline,
      items,
    }));
  }

  function handleMaintenanceChange(maintId) {
    const plan = maintenancePlans.find((m) => String(m.id) === String(maintId));
    if (!plan) return;
    setForm((f) => {
      const exists = f.items.some((it) => it.name === plan.name);
      if (exists) return { ...f, maintenance_id: maintId };
      const newItem = {
        id: `maint-${plan.id}-${Date.now()}`,
        name: plan.name,
        qty: 1,
        unit_price: toNum(plan.price, 0),
        discount_percent: 0,
      };
      return { ...f, maintenance_id: maintId, items: [...f.items, newItem] };
    });
  }

  function handlePricingModeChange(mode) {
    if (mode === form.pricing_mode) return;
    if (!form.package_id)
      return setForm((f) => ({ ...f, pricing_mode: mode }));
    const pkg = packages.find((p) => String(p.id) === String(form.package_id));
    if (!pkg)
      return setForm((f) => ({ ...f, pricing_mode: mode }));
    if (confirm("Switch pricing mode and rebuild items?")) {
      const { items } = buildItemsFromPackage(pkg, mode);
      setForm((f) => ({ ...f, pricing_mode: mode, items }));
    } else {
      setForm((f) => ({ ...f, pricing_mode: mode }));
    }
  }

  // ──────────────────────────────
  // Line items + totals
  // ──────────────────────────────
  const addItem = () =>
    setForm((f) => ({
      ...f,
      items: [
        ...f.items,
        { id: `item-${Date.now()}`, name: "New Item", qty: 1, unit_price: 0, discount_percent: 0 },
      ],
    }));

  const removeItem = (i) =>
    setForm((f) => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }));

  const updateItem = (i, patch) =>
    setForm((f) => {
      const items = [...f.items];
      items[i] = {
        ...items[i],
        ...patch,
        discount_percent: clampPct(patch.discount_percent ?? items[i].discount_percent),
      };
      return { ...f, items };
    });

const totals = useMemo(() => {
  const items = form.items || [];
  const subtotal = items.reduce(
    (sum, it) => sum + toNum(it.qty, 1) * toNum(it.unit_price, 0),
    0
  );

  const afterLine = items.reduce((sum, it) => {
    const gross = toNum(it.qty, 1) * toNum(it.unit_price, 0);
    const net = gross * (1 - clampPct(it.discount_percent) / 100);
    return sum + net;
  }, 0);

  const afterDiscounts = afterLine * (1 - clampPct(form.discount_percent) / 100);

  // ──────────────────────────────
  // 💰 Deposit + Balance Rules (Fixed)
  // ──────────────────────────────
  const pkg = packages.find((p) => String(p.id) === String(form.package_id));
  const maint = maintenancePlans.find(
    (m) => String(m.id) === String(form.maintenance_id)
  );

  const packagePrice =
    form.pricing_mode === "monthly"
      ? toNum(pkg?.price_monthly, 0)
      : toNum(pkg?.price_oneoff, 0);

  const maintenancePrice = toNum(maint?.price, 0);

  let deposit = 0;
  let balance = 0;

  if (form.pricing_mode === "monthly") {
    // Monthly → pay full first month of both
    deposit = packagePrice + maintenancePrice;
    balance = 0;
  } else {
    // One-off → 50% of package + first month maintenance upfront
    deposit = packagePrice * 0.5 + maintenancePrice;
    // Balance = remaining 50% of package only (maintenance already included)
    balance = packagePrice * 0.5;
  }

  return { subtotal, afterDiscounts, deposit, balance };
}, [form, packages, maintenancePlans]);

  // ──────────────────────────────
  // Save / Delete / Close
  // ──────────────────────────────
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        customer_id: customerId,
        title: form.title,
        description: form.description,
        items: form.items.map(({ id, ...r }) => r),
        notes: form.notes,
        package_id: form.package_id ? Number(form.package_id) : null,
        discount_percent: clampPct(form.discount_percent),
        pricing_mode: form.pricing_mode,
        deposit: Number((totals.deposit ?? 0).toFixed(2)),
      };
      const res = await fetch(`${API_BASE}/api/customers/${customerId}/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("✅ Quote created successfully!");
      navigate(`/admin/customers/${customerId}`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create quote");
    } finally {
      setSaving(false);
    }
  }

  function handleDelete() {
    if (!confirm("Delete this quote draft?")) return;
    navigate(`/admin/customers/${customerId}`);
  }

  function handleClose() {
    if (!confirm("Close this quote as declined?")) return;
    alert("📁 Quote closed (visual only — handled post-save).");
  }

  // ──────────────────────────────
  // Render
  // ──────────────────────────────
  if (!customer) return <div className="p-10 text-pjh-muted">Loading customer…</div>;

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      <a href={`/admin/customers/${customerId}`} className="text-sm text-pjh-muted hover:text-pjh-blue">
        ← Back to {customer.business || customer.name}
      </a>

      <h1 className="text-3xl font-bold text-pjh-blue mb-6">
        Create Quote for {customer.business || customer.name}
      </h1>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-pjh-gray p-6 rounded-xl grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-sm text-pjh-muted">Website Package</label>
            <select
              className="form-input mt-1"
              value={form.package_id || ""}
              onChange={(e) => handlePackageChange(e.target.value)}
            >
              <option value="">— Select package —</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (One-off £{money(toNum(p.price_oneoff))} • Monthly £{money(toNum(p.price_monthly))})
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-pjh-muted">Maintenance Plan</label>
            <select
              className="form-input mt-1"
              value={form.maintenance_id || ""}
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
                  form.pricing_mode === "oneoff"
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
                  form.pricing_mode === "monthly"
                    ? "bg-pjh-blue text-white"
                    : "bg-pjh-slate text-pjh-muted"
                }`}
                onClick={() => handlePricingModeChange("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-pjh-muted">Global Discount (%)</label>
            <input
              type="number"
              className="form-input mt-1"
              value={form.discount_percent ?? 0}
              onChange={(e) =>
                setForm({ ...form, discount_percent: clampPct(e.target.value) })
              }
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>

        {/* Items */}
        <div className="bg-pjh-slate p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-pjh-blue">Line Items</h2>
            <button type="button" onClick={addItem} className="btn-secondary">
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
                {form.items.map((it, i) => {
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
                          onChange={(e) => updateItem(i, { qty: toNum(e.target.value) })}
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
                            updateItem(i, { unit_price: toNum(e.target.value) })
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
                            updateItem(i, { discount_percent: clampPct(e.target.value) })
                          }
                        />
                      </td>
                      <td className="p-2 font-semibold">£{money(net)}</td>
                      <td className="p-2 text-right">
                        <button
                          type="button"
                          onClick={() => removeItem(i)}
                          className="btn-danger"
                        >
                          ✖
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {form.items.length === 0 && (
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
                Subtotal: £{money(totals.subtotal)}
              </p>
              <p className="text-sm">
                After discounts: <b>£{money(totals.afterDiscounts)}</b>
              </p>
              <p className="text-lg">
                Deposit {form.pricing_mode === "monthly" ? "(first month)" : "(50%)"}:{" "}
                <b>£{money(totals.deposit)}</b>
              </p>
              <p className="text-lg">
                Balance: <b>£{money(totals.balance)}</b>
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving…" : "💾 Save Quote"}
          </button>
          <button type="button" onClick={handleClose} className="btn-secondary">
            📁 Close Quote
          </button>
          <button type="button" onClick={handleDelete} className="btn-danger">
            🗑️ Delete
          </button>
        </div>
      </form>
    </div>
  );
}
