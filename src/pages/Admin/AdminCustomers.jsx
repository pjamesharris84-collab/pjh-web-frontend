// ============================================
// PJH Web Services — Admin Customers Page
// ============================================

import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api"; // ✅ Centralised API helper

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    business: "",
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    county: "",
    postcode: "",
    notes: "",
  });

  // 🔐 Ensure admin is logged in
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  // 🧠 Fetch all customers
  async function loadCustomers() {
    try {
      const data = await apiFetch("/api/customers");
      const normalized = Array.isArray(data)
        ? data
        : data.data || data.customers || [];
      setCustomers(normalized);
    } catch (err) {
      console.error("❌ Failed to load customers:", err);
      setError("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  // ➕ Add new customer
  async function handleAddCustomer(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await apiFetch("/api/customers", {
        method: "POST",
        body: JSON.stringify(newCustomer),
      });

      const created = data?.customer || data;
      if (created?.id) {
        alert(`✅ Customer created successfully (${created.name})`);
        window.location.href = `/admin/customers/${created.id}`;
      } else {
        console.warn("⚠️ Customer created but missing ID", data);
        alert("⚠️ Customer created but missing ID — check backend logs.");
        await loadCustomers();
      }
    } catch (err) {
      console.error("❌ Could not add customer:", err);
      alert("❌ Could not add customer — please check console for details.");
    } finally {
      setSubmitting(false);
    }
  }

  // 🗑️ Delete customer
  async function handleDeleteCustomer(e, id, name) {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete ${name || "this customer"}?`))
      return;

    try {
      const res = await apiFetch(`/api/customers/${id}`, { method: "DELETE" });
      if (res.success || res.message) {
        alert("✅ Customer deleted successfully");
        setCustomers((prev) => prev.filter((c) => c.id !== id));
      } else {
        throw new Error("Deletion failed");
      }
    } catch (err) {
      console.error("❌ Error deleting customer:", err);
      alert("❌ Failed to delete customer — check console for details.");
    }
  }

  // 🧱 UI
  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-pjh-blue">Customers</h1>
          <p className="text-pjh-muted">
            View, add, edit, or delete customer records.
          </p>
        </div>
        <a
          href="/admin/dashboard"
          className="text-sm text-pjh-muted hover:text-pjh-blue transition"
        >
          ← Back to Dashboard
        </a>
      </header>

      {/* ➕ Add customer form */}
      <form
        onSubmit={handleAddCustomer}
        className="bg-pjh-gray p-6 rounded-xl mb-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {Object.entries({
          business: "Business",
          name: "Name",
          email: "Email",
          phone: "Phone",
          address1: "Address Line 1",
          address2: "Address Line 2",
          city: "City",
          county: "County",
          postcode: "Postcode",
        }).map(([key, placeholder]) => (
          <input
            key={key}
            type="text"
            placeholder={placeholder}
            value={newCustomer[key]}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, [key]: e.target.value })
            }
            className="form-input"
            required={["name", "email"].includes(key)}
          />
        ))}

        <textarea
          placeholder="Notes (optional)"
          value={newCustomer.notes}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, notes: e.target.value })
          }
          className="form-input col-span-full"
          rows="2"
        />

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary col-span-full"
        >
          {submitting ? "Adding..." : "Add Customer"}
        </button>
      </form>

      {/* Customer list */}
      {loading ? (
        <p className="text-pjh-muted animate-pulse">Loading customers...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : customers.length === 0 ? (
        <p className="text-pjh-muted">No customers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/10 rounded-lg">
            <thead className="bg-pjh-gray/60">
              <tr className="text-left text-sm text-pjh-muted">
                <th className="p-3">Business</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-white/5 hover:bg-pjh-blue/10 cursor-pointer transition"
                  onClick={() =>
                    (window.location.href = `/admin/customers/${c.id}`)
                  }
                >
                  <td className="p-3 text-pjh-blue font-semibold">
                    {c.business || "—"}
                  </td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone || "—"}</td>
                  <td className="p-3">
                    {[c.address1, c.address2, c.city, c.county, c.postcode]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={(e) =>
                        handleDeleteCustomer(e, c.id, c.name || c.business)
                      }
                      className="text-red-400 hover:text-red-300 text-xs underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
