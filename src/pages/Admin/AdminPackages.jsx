import { useEffect, useState } from "react";

export default function AdminPackages() {
  const API_BASE = import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    name: "",
    tagline: "",
    price_oneoff: "",
    price_monthly: "",
    term_months: "",
    discount_percent: "",
    features: "",
    visible: true,
    pricing_guardrails: {
      require_deposit_months: 1,
      min_term_months: 24,
      early_exit_fee_pct: 40,
      ownership_until_paid: true,
      late_fee_pct: 5,
      default_payment_method: "direct_debit",
      tcs_version: "2025-01",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    } else {
      loadPackages();
    }
  }, []);

  async function loadPackages() {
    try {
      const res = await fetch(`${API_BASE}/api/packages/all`);
      const data = await res.json();
      const list = data?.data || data?.packages || [];
      setPackages(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("❌ Failed to fetch packages:", err);
      setPackages([]);
    }
  }

  function handleEdit(pkg) {
    setEditing(pkg.id);
    setForm({
      name: pkg.name || "",
      tagline: pkg.tagline || "",
      price_oneoff: pkg.price_oneoff ?? "",
      price_monthly: pkg.price_monthly ?? "",
      term_months: pkg.term_months ?? "",
      discount_percent: pkg.discount_percent ?? "",
      features: (pkg.features || []).join(", "),
      visible: !!pkg.visible,
      pricing_guardrails: {
        require_deposit_months: pkg.pricing_guardrails?.require_deposit_months ?? 1,
        min_term_months: pkg.pricing_guardrails?.min_term_months ?? 24,
        early_exit_fee_pct: pkg.pricing_guardrails?.early_exit_fee_pct ?? 40,
        ownership_until_paid: pkg.pricing_guardrails?.ownership_until_paid !== false,
        late_fee_pct: pkg.pricing_guardrails?.late_fee_pct ?? 5,
        default_payment_method: pkg.pricing_guardrails?.default_payment_method || "direct_debit",
        tcs_version: pkg.pricing_guardrails?.tcs_version || "2025-01",
      },
    });
  }

  function resetForm() {
    setEditing(null);
    setForm({
      name: "",
      tagline: "",
      price_oneoff: "",
      price_monthly: "",
      term_months: "",
      discount_percent: "",
      features: "",
      visible: true,
      pricing_guardrails: {
        require_deposit_months: 1,
        min_term_months: 24,
        early_exit_fee_pct: 40,
        ownership_until_paid: true,
        late_fee_pct: 5,
        default_payment_method: "direct_debit",
        tcs_version: "2025-01",
      },
    });
  }

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("Saving...");

    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `${API_BASE}/api/packages/${editing}` : `${API_BASE}/api/packages`;

      const payload = {
        ...form,
        price_oneoff: form.price_oneoff === "" ? null : parseFloat(form.price_oneoff),
        price_monthly: form.price_monthly === "" ? null : parseFloat(form.price_monthly),
        term_months: form.term_months === "" ? null : parseInt(form.term_months, 10),
        discount_percent: form.discount_percent === "" ? 0 : parseFloat(form.discount_percent),
        features: form.features
          ? form.features.split(",").map((f) => f.trim()).filter(Boolean)
          : [],
        pricing_guardrails: {
          ...form.pricing_guardrails,
          require_deposit_months: Number(form.pricing_guardrails.require_deposit_months || 1),
          min_term_months: Number(form.pricing_guardrails.min_term_months || 24),
          early_exit_fee_pct: Number(form.pricing_guardrails.early_exit_fee_pct || 0),
          late_fee_pct: Number(form.pricing_guardrails.late_fee_pct || 0),
        },
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to save package");

      await loadPackages();
      resetForm();
      setStatus("✅ Package saved successfully!");
    } catch (err) {
      console.error("❌ Save error:", err);
      setStatus(`❌ Could not save package: ${err.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 2500);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/packages/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        await loadPackages();
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("❌ Failed to delete package.");
    }
  }

  async function handleToggleVisibility(pkg) {
    try {
      await fetch(`${API_BASE}/api/packages/${pkg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !pkg.visible }),
      });
      await loadPackages();
    } catch (err) {
      console.error("❌ Visibility toggle failed:", err);
    }
  }

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10 font-outfit">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-pjh-blue">Package Manager</h1>
        <a href="/admin/dashboard" className="text-sm text-pjh-muted hover:text-pjh-blue transition">
          ← Back to Dashboard
        </a>
      </header>

      {/* FORM */}
      <form onSubmit={handleSave} className="bg-pjh-gray p-6 rounded-2xl max-w-4xl mb-12 shadow-xl border border-white/10 space-y-5">
        <h2 className="text-xl font-semibold text-pjh-blue">
          {editing ? "Edit Package" : "Add New Package"}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Package Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input w-full" required />
          </div>
          <div>
            <label className="form-label">Tagline</label>
            <input type="text" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="form-input w-full" placeholder="Short description line" />
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <div>
            <label className="form-label">One-off Price (£)</label>
            <input type="number" value={form.price_oneoff} onChange={(e) => setForm({ ...form, price_oneoff: e.target.value })} className="form-input w-full" />
          </div>
          <div>
            <label className="form-label">Monthly Price (£)</label>
            <input type="number" value={form.price_monthly} onChange={(e) => setForm({ ...form, price_monthly: e.target.value })} className="form-input w-full" />
          </div>
          <div>
            <label className="form-label">Min Term (months)</label>
            <input type="number" value={form.term_months} onChange={(e) => setForm({ ...form, term_months: e.target.value })} className="form-input w-full" />
          </div>
          <div>
            <label className="form-label">Discount (%)</label>
            <input type="number" value={form.discount_percent} onChange={(e) => setForm({ ...form, discount_percent: e.target.value })} className="form-input w-full" />
          </div>
        </div>

        <div>
          <label className="form-label">Features (comma-separated)</label>
          <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="form-input w-full resize-none" rows="2" placeholder="e.g. Custom CRM, Booking System, Hosting..." />
        </div>

        {/* Monthly Guardrails */}
        <div className="bg-pjh-slate/60 border border-white/10 rounded-xl p-4 space-y-3">
          <p className="text-sm text-pjh-muted">Monthly Plan Settings (applies if monthly price is set)</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Deposit at Signup (months)</label>
              <input
                type="number"
                value={form.pricing_guardrails.require_deposit_months}
                onChange={(e) => setForm({
                  ...form,
                  pricing_guardrails: { ...form.pricing_guardrails, require_deposit_months: e.target.value }
                })}
                className="form-input w-full"
              />
            </div>
            <div>
              <label className="form-label">Early Exit Fee (%)</label>
              <input
                type="number"
                value={form.pricing_guardrails.early_exit_fee_pct}
                onChange={(e) => setForm({
                  ...form,
                  pricing_guardrails: { ...form.pricing_guardrails, early_exit_fee_pct: e.target.value }
                })}
                className="form-input w-full"
              />
            </div>
            <div>
              <label className="form-label">Late Fee (%)</label>
              <input
                type="number"
                value={form.pricing_guardrails.late_fee_pct}
                onChange={(e) => setForm({
                  ...form,
                  pricing_guardrails: { ...form.pricing_guardrails, late_fee_pct: e.target.value }
                })}
                className="form-input w-full"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 items-center">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.pricing_guardrails.ownership_until_paid}
                onChange={(e) => setForm({
                  ...form,
                  pricing_guardrails: { ...form.pricing_guardrails, ownership_until_paid: e.target.checked }
                })}
              />
              <label className="form-label">Ownership Transfers on Final Payment</label>
            </div>
            <div>
              <label className="form-label">Default Payment Method</label>
              <select
                className="form-input w-full"
                value={form.pricing_guardrails.default_payment_method}
                onChange={(e) => setForm({
                  ...form,
                  pricing_guardrails: { ...form.pricing_guardrails, default_payment_method: e.target.value }
                })}
              >
                <option value="direct_debit">Direct Debit</option>
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
            <div>
              <label className="form-label">T&Cs Version</label>
              <input
                type="text"
                value={form.pricing_guardrails.tcs_version}
                onChange={(e) => setForm({
                  ...form,
                  pricing_guardrails: { ...form.pricing_guardrails, tcs_version: e.target.value }
                })}
                className="form-input w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="form-label">Visible</label>
            <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
          </div>
          <div className="flex gap-3 ml-auto">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Saving..." : editing ? "Update Package" : "Add Package"}
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </div>

        {status && (
          <p className={`text-sm mt-1 ${status.startsWith("✅") ? "text-green-400" : status.startsWith("❌") ? "text-red-400" : "text-pjh-muted animate-pulse"}`}>
            {status}
          </p>
        )}
      </form>

      {/* LIST */}
      <div className="overflow-x-auto bg-pjh-gray rounded-2xl shadow-lg border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-pjh-gray/70 text-pjh-muted uppercase tracking-wide">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">One-off (£)</th>
              <th className="p-3 text-left">Monthly (£)</th>
              <th className="p-3 text-left">Term</th>
              <th className="p-3 text-left">Deposit (m)</th>
              <th className="p-3 text-left">Visible</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => {
              const g = p.pricing_guardrails || {};
              return (
                <tr key={p.id} className="border-t border-white/10 hover:bg-pjh-blue/10 transition">
                  <td className="p-3">
                    <div className="font-semibold text-pjh-blue">{p.name}</div>
                    <div className="text-pjh-muted text-xs">{p.tagline || "—"}</div>
                  </td>
                  <td className="p-3">{p.price_oneoff ? `£${p.price_oneoff}` : "—"}</td>
                  <td className="p-3">{p.price_monthly ? `£${p.price_monthly}` : "—"}</td>
                  <td className="p-3">{p.term_months || "—"}</td>
                  <td className="p-3">{g.require_deposit_months ?? 1}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleToggleVisibility(p)}
                      className={`px-2 py-1 rounded text-xs font-semibold ${p.visible ? "bg-green-700 text-green-100" : "bg-red-700 text-red-100"}`}
                    >
                      {p.visible ? "Visible" : "Hidden"}
                    </button>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="btn-secondary text-xs">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="btn-danger text-xs">Delete</button>
                  </td>
                </tr>
              );
            })}
            {packages.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-pjh-muted">No packages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
