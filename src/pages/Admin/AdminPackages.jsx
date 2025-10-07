// ============================================
// PJH Web Services — Admin Packages Management
// ============================================
// Create, edit, or delete web packages shown on the pricing page.
// Connected to /api/packages with full CRUD capability.

import { useEffect, useState } from "react";

export default function AdminPackages() {
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    price_oneoff: "",
    price_monthly: "",
    discount_percent: "",
    features: "",
    visible: true,
  });

  // 🔐 Auth check
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    } else {
      loadPackages();
    }
  }, []);

  // 📦 Load packages
  async function loadPackages() {
    try {
      const res = await fetch(`${API_BASE}/api/packages/all`);
      const data = await res.json();
      if (data.success && Array.isArray(data.packages)) {
        setPackages(data.packages);
      } else {
        setPackages([]);
      }
    } catch (err) {
      console.error("❌ Failed to fetch packages:", err);
    }
  }

  // ✏️ Edit handler
  function handleEdit(pkg) {
    setEditing(pkg.id);
    setForm({
      name: pkg.name || "",
      tagline: pkg.tagline || "",
      price_oneoff: pkg.price_oneoff || "",
      price_monthly: pkg.price_monthly || "",
      discount_percent: pkg.discount_percent || "",
      features: (pkg.features || []).join(", "),
      visible: pkg.visible,
    });
  }

  // 💾 Save handler (Create or Update)
  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("Saving...");

    try {
      const method = editing ? "PUT" : "POST";
      const url = editing
        ? `${API_BASE}/api/packages/${editing}`
        : `${API_BASE}/api/packages`;

      const payload = {
        ...form,
        features: form.features
          ? form.features.split(",").map((f) => f.trim()).filter(Boolean)
          : [],
        price_oneoff: parseFloat(form.price_oneoff) || 0,
        price_monthly: parseFloat(form.price_monthly) || null,
        discount_percent: parseFloat(form.discount_percent) || 0,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to save package");

      await loadPackages();
      setEditing(null);
      resetForm();
      setStatus("✅ Package saved successfully!");
    } catch (err) {
      console.error("❌ Save error:", err);
      setStatus("❌ Could not save package — check console.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 2500);
    }
  }

  // 🗑️ Delete handler
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/packages/${id}`, {
        method: "DELETE",
      });
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

  // 👁️ Toggle visibility
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

  // ♻️ Reset form
  function resetForm() {
    setForm({
      name: "",
      tagline: "",
      price_oneoff: "",
      price_monthly: "",
      discount_percent: "",
      features: "",
      visible: true,
    });
  }

  // ============================
  // UI
  // ============================
  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10 font-outfit">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-pjh-blue">Package Manager</h1>
        <a
          href="/admin/dashboard"
          className="text-sm text-pjh-muted hover:text-pjh-blue transition"
        >
          ← Back to Dashboard
        </a>
      </header>

      {/* === FORM === */}
      <form
        onSubmit={handleSave}
        className="bg-pjh-gray p-6 rounded-2xl max-w-3xl mb-12 shadow-xl border border-white/10 space-y-4"
      >
        <h2 className="text-xl font-semibold text-pjh-blue">
          {editing ? "Edit Package" : "Add New Package"}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Package Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-input w-full"
              required
            />
          </div>

          <div>
            <label className="form-label">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="form-input w-full"
              placeholder="Short description line"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="form-label">One-off Price (£)</label>
            <input
              type="number"
              value={form.price_oneoff}
              onChange={(e) =>
                setForm({ ...form, price_oneoff: e.target.value })
              }
              className="form-input w-full"
            />
          </div>
          <div>
            <label className="form-label">Monthly Price (£)</label>
            <input
              type="number"
              value={form.price_monthly}
              onChange={(e) =>
                setForm({ ...form, price_monthly: e.target.value })
              }
              className="form-input w-full"
            />
          </div>
          <div>
            <label className="form-label">Discount (%)</label>
            <input
              type="number"
              value={form.discount_percent}
              onChange={(e) =>
                setForm({ ...form, discount_percent: e.target.value })
              }
              className="form-input w-full"
            />
          </div>
        </div>

        <div>
          <label className="form-label">Features (comma-separated)</label>
          <textarea
            value={form.features}
            onChange={(e) => setForm({ ...form, features: e.target.value })}
            className="form-input w-full resize-none"
            rows="2"
            placeholder="e.g. Custom CRM, Booking System, Hosting..."
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="form-label">Visible</label>
          <input
            type="checkbox"
            checked={form.visible}
            onChange={(e) => setForm({ ...form, visible: e.target.checked })}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? "Saving..." : editing ? "Update Package" : "Add Package"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                resetForm();
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>

        {status && (
          <p
            className={`text-sm mt-2 ${
              status.startsWith("✅")
                ? "text-green-400"
                : status.startsWith("❌")
                ? "text-red-400"
                : "text-pjh-muted animate-pulse"
            }`}
          >
            {status}
          </p>
        )}
      </form>

      {/* === PACKAGE LIST === */}
      <div className="overflow-x-auto bg-pjh-gray rounded-2xl shadow-lg border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-pjh-gray/70 text-pjh-muted uppercase tracking-wide">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Tagline</th>
              <th className="p-3 text-left">One-off (£)</th>
              <th className="p-3 text-left">Monthly (£)</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Visible</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr
                key={p.id}
                className="border-t border-white/10 hover:bg-pjh-blue/10 transition"
              >
                <td className="p-3 font-semibold text-pjh-blue">{p.name}</td>
                <td className="p-3 text-pjh-muted">{p.tagline || "—"}</td>
                <td className="p-3">£{p.price_oneoff}</td>
                <td className="p-3">{p.price_monthly ? `£${p.price_monthly}` : "—"}</td>
                <td className="p-3">{p.discount_percent || 0}%</td>
                <td className="p-3">
                  <button
                    onClick={() => handleToggleVisibility(p)}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      p.visible
                        ? "bg-green-700 text-green-100"
                        : "bg-red-700 text-red-100"
                    }`}
                  >
                    {p.visible ? "Visible" : "Hidden"}
                  </button>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="btn-secondary text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn-danger text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-pjh-muted"
                >
                  No packages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
