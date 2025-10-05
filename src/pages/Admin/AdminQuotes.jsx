import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminQuotes() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    items: "",
    deposit: "",
    notes: "",
  });

  const navigate = useNavigate();

  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "https://pjh-web-backend.onrender.com"; // fallback for production

  // 🔐 Auth protection
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  // 🧠 Load all customers on mount
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch(`${API_BASE}/api/customers`);
        const data = await res.json();

        const normalized = Array.isArray(data)
          ? data
          : data.data || data.rows || [];
        setCustomers(normalized);
      } catch (err) {
        console.error("❌ Failed to load customers:", err);
        setCustomers([]);
      }
    }
    fetchCustomers();
  }, []);

  // 📋 Load quotes for selected customer
  async function loadQuotes(customerId) {
    if (!customerId) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/customers/${customerId}/quotes`);
      const data = await res.json();

      const normalized = Array.isArray(data)
        ? data
        : data.quotes || data.data || [];
      setQuotes(normalized);
    } catch (err) {
      console.error("❌ Failed to load quotes:", err);
      alert("❌ Failed to load quotes");
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }

  // ➕ Create new quote
  async function handleAddQuote(e) {
    e.preventDefault();
    if (!selectedCustomer) return alert("Please select a customer first.");

    const payload = {
      title: form.title,
      description: form.description,
      deposit: parseFloat(form.deposit || 0),
      notes: form.notes,
      items: form.items
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => ({ name: line.trim(), price: 0 })),
    };

    try {
      const res = await fetch(
        `${API_BASE}/api/customers/${selectedCustomer}/quotes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to add quote");

      setForm({ title: "", description: "", deposit: "", notes: "", items: "" });
      loadQuotes(selectedCustomer);
      alert("✅ Quote created successfully!");
    } catch (err) {
      console.error("❌ Error creating quote:", err);
      alert("❌ Could not create quote");
    }
  }

  // ❌ Delete quote
  async function handleDeleteQuote(customerId, quoteId) {
    if (!confirm("Are you sure you want to delete this quote?")) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/customers/${customerId}/quotes/${quoteId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete quote");
      loadQuotes(customerId);
    } catch (err) {
      console.error("❌ Error deleting quote:", err);
      alert("❌ Failed to delete quote");
    }
  }

  // 📄 View / edit quote record
  function openQuoteRecord(customerId, quoteId) {
    navigate(`/admin/customers/${customerId}/quotes/${quoteId}`);
  }

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      {/* === HEADER === */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-pjh-blue">Manage Quotes</h1>
          <p className="text-pjh-muted">
            Create, view, or manage quotes per customer.
          </p>
        </div>
        <a
          href="/admin/dashboard"
          className="text-sm text-pjh-muted hover:text-pjh-blue transition"
        >
          ← Back to Dashboard
        </a>
      </header>

      {/* === SELECT CUSTOMER === */}
      <div className="bg-pjh-gray p-6 rounded-xl mb-6">
        <label className="block text-sm font-semibold mb-2">
          Select Customer
        </label>
        <select
          value={selectedCustomer}
          onChange={(e) => {
            setSelectedCustomer(e.target.value);
            loadQuotes(e.target.value);
          }}
          className="form-input w-full sm:w-1/2"
        >
          <option value="">-- Choose a Customer --</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.business || c.name || "Unnamed"}
            </option>
          ))}
        </select>
      </div>

      {/* === ADD QUOTE FORM === */}
      {selectedCustomer && (
        <form
          onSubmit={handleAddQuote}
          className="bg-pjh-gray p-6 rounded-xl mb-10 grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Quote Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="form-input"
            required
          />
          <input
            type="number"
            placeholder="Deposit Amount (£)"
            value={form.deposit}
            onChange={(e) => setForm({ ...form, deposit: e.target.value })}
            className="form-input"
          />
          <textarea
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="form-input md:col-span-2"
          />
          <textarea
            placeholder="Items (one per line)"
            rows="4"
            value={form.items}
            onChange={(e) => setForm({ ...form, items: e.target.value })}
            className="form-input md:col-span-2"
          />
          <textarea
            placeholder="Notes (optional)"
            rows="2"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="form-input md:col-span-2"
          />
          <button type="submit" className="btn-primary md:col-span-2">
            Add Quote
          </button>
        </form>
      )}

      {/* === QUOTES TABLE === */}
      {loading ? (
        <p className="text-pjh-muted animate-pulse">Loading quotes...</p>
      ) : quotes.length === 0 ? (
        <p className="text-pjh-muted">
          {selectedCustomer
            ? "No quotes found for this customer."
            : "Please select a customer to view quotes."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/10 rounded-lg">
            <thead className="bg-pjh-gray/60">
              <tr className="text-left text-sm text-pjh-muted">
                <th className="p-3">Quote #</th>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Deposit (£)</th>
                <th className="p-3">Created</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-t border-white/5">
                  <td className="p-3">{q.quote_number}</td>
                  <td
                    className="p-3 text-pjh-cyan hover:underline cursor-pointer"
                    onClick={() => openQuoteRecord(selectedCustomer, q.id)}
                  >
                    {q.title || "Untitled"}
                  </td>
                  <td className="p-3 capitalize">{q.status || "pending"}</td>
                  <td className="p-3">
                    £{Number(q.deposit || 0).toFixed(2)}
                  </td>
                  <td className="p-3">
                    {q.created_at
                      ? new Date(q.created_at).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteQuote(selectedCustomer, q.id)}
                      className="text-red-400 hover:text-red-500 transition"
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

      {/* === FOOTER === */}
      <footer className="mt-16 text-center text-sm text-pjh-muted border-t border-white/10 pt-6">
        © {new Date().getFullYear()} PJH Web Services — Internal Dashboard
      </footer>
    </div>
  );
}
