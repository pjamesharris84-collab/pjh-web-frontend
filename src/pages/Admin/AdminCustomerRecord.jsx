import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../../utils/api"; // ✅ centralised fetch helper

export default function AdminCustomerRecord() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [saving, setSaving] = useState(false);

  // 🔐 Auth check
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  useEffect(() => {
    loadCustomer();
    loadQuotes();
  }, [id]);

  // 🧠 Load customer
  async function loadCustomer() {
    try {
      const data = await apiFetch(`/api/customers/${id}`);
      const record =
        data.data && typeof data.data === "object"
          ? Array.isArray(data.data)
            ? data.data[0]
            : data.data
          : data;
      setCustomer(record);
    } catch (err) {
      console.error("❌ Failed to load customer:", err);
    }
  }

  // 💬 Load quotes
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
    setSaving(true);
    try {
      await apiFetch(`/api/customers/${id}`, {
        method: "PUT",
        body: JSON.stringify(customer),
      });
      alert("✅ Customer updated successfully");
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
          customer.name || "this customer"
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

  // 🗑️ Delete quote
  async function handleDeleteQuote(quoteId, quoteTitle) {
    if (
      !confirm(
        `Are you sure you want to delete quote "${
          quoteTitle || quoteId
        }"? This action cannot be undone.`
      )
    )
      return;

    try {
      await apiFetch(`/api/quotes/${quoteId}`, { method: "DELETE" });
      alert("✅ Quote deleted successfully");
      await loadQuotes(); // Refresh quotes list
    } catch (err) {
      console.error("❌ Failed to delete quote:", err);
      alert("❌ Failed to delete quote — check console for details.");
    }
  }

  if (!customer) {
    return (
      <div className="p-10 text-pjh-muted animate-pulse">
        Loading customer record...
      </div>
    );
  }

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
        {Object.entries(customer).map(([key, value]) => {
          if (["id", "created_at", "updated_at"].includes(key)) return null;
          return (
            <input
              key={key}
              type="text"
              value={value || ""}
              onChange={(e) =>
                setCustomer({ ...customer, [key]: e.target.value })
              }
              placeholder={key}
              className="form-input"
            />
          );
        })}

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
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr
                  key={q.id}
                  className="border-t border-white/5 hover:bg-pjh-gray/40 transition"
                >
                  <td
                    className="p-3 cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/admin/quotes/${q.id}`)
                    }
                  >
                    {q.quote_number || "—"}
                  </td>
                  <td
                    className="p-3 cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/admin/quotes/${q.id}`)
                    }
                  >
                    {q.title || "Untitled"}
                  </td>
                  <td className="p-3">£{Number(q.deposit || 0).toFixed(2)}</td>
                  <td className="p-3 capitalize">{q.status || "draft"}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteQuote(q.id, q.title)}
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
