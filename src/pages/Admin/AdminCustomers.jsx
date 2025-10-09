/**
 * ============================================================
 * PJH Web Services — Admin Customer Record (Fixed)
 * ============================================================
 * - Loads a single customer record
 * - Displays editable form fields for all details
 * - Lists related quotes
 * - Handles update + delete actions
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../../utils/api";

export default function AdminCustomerRecord() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [saving, setSaving] = useState(false);

  // 🔐 Admin auth guard
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  // 🧠 Load data
  useEffect(() => {
    if (id) {
      loadCustomer();
      loadQuotes();
    }
  }, [id]);

  // 🧩 Load single customer
  async function loadCustomer() {
    try {
      const data = await apiFetch(`/api/customers/${id}`);
      const record =
        data.data ||
        data.customer ||
        (Array.isArray(data) ? data[0] : data) ||
        {};

      // ✅ Ensure all expected fields exist
      const normalised = {
        id: record.id || id,
        business: record.business || "",
        name: record.name || "",
        email: record.email || "",
        phone: record.phone || "",
        address1: record.address1 || "",
        address2: record.address2 || "",
        city: record.city || "",
        county: record.county || "",
        postcode: record.postcode || "",
        notes: record.notes || "",
        created_at: record.created_at || "",
        updated_at: record.updated_at || "",
      };

      setCustomer(normalised);
    } catch (err) {
      console.error("❌ Failed to load customer:", err);
    }
  }

  // 🧾 Load quotes for this customer
  async function loadQuotes() {
    try {
      const data = await apiFetch(`/api/customers/${id}/quotes`);
      const list = Array.isArray(data)
        ? data
        : data.data || data.quotes || [];
      setQuotes(list);
    } catch (err) {
      console.error("❌ Failed to load quotes:", err);
    }
  }

  // 💾 Save edits
  async function handleSave() {
    if (!customer) return;
    setSaving(true);
    try {
      const payload = { ...customer };
      delete payload.id;
      delete payload.created_at;
      delete payload.updated_at;

      await apiFetch(`/api/customers/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      alert("✅ Customer updated successfully");
      await loadCustomer();
    } catch (err) {
      console.error("❌ Failed to update customer:", err);
      alert("❌ Failed to update customer");
    } finally {
      setSaving(false);
    }
  }

  // 🗑️ Delete customer
  async function handleDelete() {
    if (
      !confirm(
        `Are you sure you want to permanently delete ${
          customer.name || customer.business || "this customer"
        }?`
      )
    )
      return;
    try {
      await apiFetch(`/api/customers/${id}`, { method: "DELETE" });
      alert("✅ Customer deleted");
      window.location.href = "/admin/customers";
    } catch (err) {
      console.error("❌ Failed to delete customer:", err);
      alert("❌ Failed to delete customer — check console for details.");
    }
  }

  if (!customer) {
    return (
      <div className="p-10 text-pjh-muted animate-pulse">
        Loading customer record...
      </div>
    );
  }

  // Editable fields excluding system fields
  const editableFields = Object.entries(customer).filter(
    ([key]) => !["id", "created_at", "updated_at"].includes(key)
  );

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      <a
        href="/admin/customers"
        className="text-sm text-pjh-muted hover:text-pjh-blue transition"
      >
        ← Back to Customers
      </a>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-pjh-blue">
          {customer.business || customer.name || "Unnamed Customer"}
        </h1>
        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-300 text-sm underline"
        >
          Delete Customer
        </button>
      </div>

      {/* Editable Fields */}
      <div className="bg-pjh-gray p-6 rounded-xl mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {editableFields.map(([key, value]) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-xs text-pjh-muted capitalize">{key}</label>
            <input
              type="text"
              value={value || ""}
              onChange={(e) =>
                setCustomer({ ...customer, [key]: e.target.value })
              }
              className="form-input"
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary col-span-full"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Quotes Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-pjh-blue">Quotes</h2>
        <button
          onClick={() =>
            (window.location.href = `/admin/customers/${id}/quotes/new`)
          }
          className="px-4 py-2 bg-pjh-blue rounded-lg hover:bg-pjh-blue/80 transition text-white"
        >
          + New Quote
        </button>
      </div>

      {!Array.isArray(quotes) || quotes.length === 0 ? (
        <p className="text-pjh-muted">No quotes for this customer yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/10 rounded-lg">
            <thead className="bg-pjh-gray/60">
              <tr className="text-left text-sm text-pjh-muted">
                <th className="p-3">Quote #</th>
                <th className="p-3">Title</th>
                <th className="p-3">Deposit (£)</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr
                  key={q.id}
                  className="border-t border-white/5 hover:bg-pjh-gray/40 cursor-pointer transition"
                  onClick={() =>
                    (window.location.href = `/admin/quotes/${q.id}`)
                  }
                >
                  <td className="p-3">{q.quote_number || "—"}</td>
                  <td className="p-3">{q.title || "Untitled"}</td>
                  <td className="p-3">£{Number(q.deposit || 0).toFixed(2)}</td>
                  <td className="p-3 capitalize">{q.status || "draft"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
