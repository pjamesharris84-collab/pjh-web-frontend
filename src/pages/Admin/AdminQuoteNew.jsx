// ============================================
// PJH Web Services — Admin New Quote
// ============================================
// Auto-populates weighted line items from selected package
// Includes One-Off / Monthly pricing modes and a visual breakdown
// ============================================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminQuoteNew() {
  const { id: customerId } = useParams();
  const navigate = useNavigate();
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend-1.onrender.com";

  const [customer, setCustomer] = useState(null);
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    notes: "",
    package_id: "",
    custom_price: "",
    discount_percent: 0,
  });

  const [pricingMode, setPricingMode] = useState("oneoff");
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [balance, setBalance] = useState(0);
  const [saving, setSaving] = useState(false);
  const [breakdown, setBreakdown] = useState([]); // 💡 new weighted summary

  // 🧠 Auth check
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  // 🧩 Load customer
  useEffect(() => {
    if (!customerId) return;
    (async () => {
      const res = await fetch(`${API_BASE}/api/customers/${customerId}`);
      const data = await res.json();
      setCustomer(data.data || data);
    })();
  }, [customerId]);

  // 🧩 Load packages
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/packages`);
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.packages)
          ? data.packages
          : data.data || [];
        setPackages(list);
      } catch (err) {
        console.error("❌ Failed to load packages:", err);
      }
    })();
  }, []);

  // 💰 Totals recalculation
  useEffect(() => {
    const newSubtotal = items.reduce(
      (sum, item) => sum + (Number(item.qty) * Number(item.unit_price) || 0),
      0
    );
    const newDeposit = newSubtotal * 0.5;
    setSubtotal(newSubtotal);
    setDeposit(newDeposit);
    setBalance(newSubtotal - newDeposit);
  }, [items]);

  // 🧩 Handle package selection
  function handlePackageChange(packageId) {
    const pkg = packages.find((p) => p.id === Number(packageId));
    if (!pkg) return;

    const basePrice =
      pricingMode === "monthly"
        ? Number(pkg.price_monthly || 0)
        : Number(pkg.price_oneoff || 0);

    // Weighted pricing map
    const weights = {
      design: 4,
      website: 4,
      crm: 5,
      booking: 3,
      scheduler: 3,
      payment: 3,
      seo: 1,
      domain: 1,
      hosting: 1,
      social: 1,
    };

    const features = pkg.features || [];
    const featureWeights = features.map((f) => {
      const key = Object.keys(weights).find((k) =>
        f.toLowerCase().includes(k)
      );
      return weights[key] || 2; // default medium
    });

    const totalWeight = featureWeights.reduce((sum, w) => sum + w, 0) || 1;

    // Build weighted line items
    const autoItems = features.map((f, i) => {
      const share = featureWeights[i] / totalWeight;
      const price = basePrice * share;
      return {
        name: f,
        qty: 1,
        unit_price: Number(price.toFixed(2)),
        total: Number(price.toFixed(2)),
        weight: featureWeights[i],
        share: share * 100,
      };
    });

    // Build summary breakdown for visualisation
    const grouped = features.map((f, i) => ({
      name: f,
      weight: featureWeights[i],
      percent: ((featureWeights[i] / totalWeight) * 100).toFixed(1),
      value: ((featureWeights[i] / totalWeight) * basePrice).toFixed(2),
    }));

    setBreakdown(grouped);
    setForm({
      ...form,
      package_id: packageId,
      title: pkg.name,
      description: pkg.tagline || "",
      custom_price: basePrice,
    });
    setItems(autoItems);
  }

  // ➕ Manual item edits
  const addItem = () =>
    setItems([...items, { name: "", qty: 1, unit_price: 0, total: 0 }]);

  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const updateItem = (i, key, value) => {
    const updated = [...items];
    updated[i][key] = value;
    updated[i].total =
      Number(updated[i].qty) * Number(updated[i].unit_price) || 0;
    setItems(updated);
  };

  // 💾 Save quote
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      items,
      subtotal,
      deposit,
      balance,
      pricing_mode: pricingMode,
      customer_id: customerId,
      package_id: form.package_id ? Number(form.package_id) : null,
      custom_price: form.custom_price ? Number(form.custom_price) : null,
      discount_percent: form.discount_percent
        ? Number(form.discount_percent)
        : 0,
    };

    try {
      const res = await fetch(`${API_BASE}/api/customers/${customerId}/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save quote");

      alert("✅ Quote created successfully!");
      navigate(`/admin/customers/${customerId}`);
    } catch (err) {
      console.error("❌ Quote creation error:", err);
      alert("❌ Failed to create quote — check console for details.");
    } finally {
      setSaving(false);
    }
  }

  if (!customer)
    return <div className="p-10 text-pjh-muted">Loading customer...</div>;

  // =============================================
  // 🖥️ RENDER
  // =============================================
  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      <a
        href={`/admin/customers/${customerId}`}
        className="text-sm text-pjh-muted hover:text-pjh-blue"
      >
        ← Back to {customer.business || customer.name}
      </a>

      <h1 className="text-3xl font-bold text-pjh-blue mb-6">
        Create Quote for {customer.business || customer.name}
      </h1>

      <form onSubmit={handleSave} className="space-y-8">
        {/* === Package Selection === */}
        <div className="bg-pjh-gray p-6 rounded-xl grid md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between md:col-span-2">
            <label className="text-sm text-pjh-muted">Select Package</label>
            <div className="flex items-center gap-2 text-sm">
              <span
                onClick={() => setPricingMode("oneoff")}
                className={`cursor-pointer px-3 py-1 rounded-md ${
                  pricingMode === "oneoff"
                    ? "bg-pjh-blue text-white"
                    : "bg-pjh-slate text-pjh-muted hover:bg-pjh-gray"
                }`}
              >
                One-Off
              </span>
              <span
                onClick={() => setPricingMode("monthly")}
                className={`cursor-pointer px-3 py-1 rounded-md ${
                  pricingMode === "monthly"
                    ? "bg-pjh-blue text-white"
                    : "bg-pjh-slate text-pjh-muted hover:bg-pjh-gray"
                }`}
              >
                Monthly
              </span>
            </div>
          </div>

          <select
            value={form.package_id}
            onChange={(e) => handlePackageChange(e.target.value)}
            className="form-input md:col-span-2"
          >
            <option value="">— Choose a Package —</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (£
                {pricingMode === "monthly"
                  ? p.price_monthly
                  : p.price_oneoff}
                )
              </option>
            ))}
          </select>
        </div>

        {/* === Weighted Breakdown Summary === */}
        {breakdown.length > 0 && (
          <div className="bg-pjh-gray p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-pjh-blue mb-3">
              Weighted Pricing Breakdown
            </h3>
            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-pjh-muted border-b border-white/10">
                <tr>
                  <th className="py-1">Feature</th>
                  <th className="py-1">Weight</th>
                  <th className="py-1">% of Total</th>
                  <th className="py-1">Value (£)</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((b, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-pjh-slate/40 transition"
                  >
                    <td className="py-1">{b.name}</td>
                    <td className="py-1">{b.weight}</td>
                    <td className="py-1">{b.percent}%</td>
                    <td className="py-1">£{b.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* === Items === */}
        <div className="bg-pjh-gray p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-pjh-blue mb-4">
            Quote Items
          </h2>

          {items.map((item, i) => (
            <div key={i} className="grid md:grid-cols-5 gap-4 items-center mb-4">
              <input
                type="text"
                placeholder="Service Name"
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                className="form-input"
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.qty}
                onChange={(e) => updateItem(i, "qty", +e.target.value)}
                className="form-input"
              />
              <input
                type="number"
                placeholder="Unit Price (£)"
                value={item.unit_price}
                onChange={(e) =>
                  updateItem(i, "unit_price", +e.target.value)
                }
                className="form-input"
              />
              <div className="text-center font-semibold">
                £{!isNaN(item.total) ? Number(item.total).toFixed(2) : "0.00"}
              </div>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-red-400 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={addItem} className="mt-2 btn-secondary">
            + Add Item
          </button>
        </div>

        {/* === Totals === */}
        <div className="bg-pjh-gray p-6 rounded-xl grid md:grid-cols-3 gap-6 text-lg font-medium">
          <div>
            <p className="text-pjh-muted">Subtotal</p>
            <p>£{subtotal.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-pjh-muted">Deposit (50%)</p>
            <p>£{deposit.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-pjh-muted">Balance</p>
            <p>£{balance.toFixed(2)}</p>
          </div>
        </div>

        <textarea
          placeholder="Additional Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="form-input"
          rows="3"
        />

        <button
          type="submit"
          disabled={saving}
          className="btn-primary w-full sm:w-auto"
        >
          {saving ? "Saving..." : "Save Quote"}
        </button>
      </form>
    </div>
  );
}
