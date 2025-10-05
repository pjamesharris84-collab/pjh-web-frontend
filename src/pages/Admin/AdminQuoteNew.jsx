import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminQuoteNew() {
  const { id: customerId } = useParams();
  const navigate = useNavigate();

  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "https://pjh-web-backend.onrender.com"; // fallback for production

  const [customer, setCustomer] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    notes: "",
  });
  const [items, setItems] = useState([{ name: "", qty: 1, unit_price: 0, total: 0 }]);
  const [subtotal, setSubtotal] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [balance, setBalance] = useState(0);
  const [saving, setSaving] = useState(false);

  // 🔐 Auth check
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  // 🧠 Load customer details
  useEffect(() => {
    if (!customerId) return;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/customers/${customerId}`);
        const data = await res.json();
        const record = data.data || data;
        setCustomer(record);
      } catch (err) {
        console.error("❌ Failed to load customer:", err);
      }
    })();
  }, [customerId]);

  // 💰 Recalculate totals
  useEffect(() => {
    const newSubtotal = items.reduce(
      (sum, item) => sum + (item.qty * item.unit_price || 0),
      0
    );
    const newDeposit = newSubtotal * 0.5;
    setSubtotal(newSubtotal);
    setDeposit(newDeposit);
    setBalance(newSubtotal - newDeposit);
  }, [items]);

  // ➕ Add a line item
  function addItem() {
    setItems([...items, { name: "", qty: 1, unit_price: 0, total: 0 }]);
  }

  // ❌ Remove a line item
  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  // ✏️ Update line item
  function updateItem(index, key, value) {
    const updated = [...items];
    updated[index][key] = value;
    updated[index].total = updated[index].qty * updated[index].unit_price || 0;
    setItems(updated);
  }

  // 💾 Save new quote
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      items,
      subtotal,
      deposit,
      balance,
      customer_id: customerId,
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

  if (!customer) {
    return (
      <div className="p-10 text-pjh-muted animate-pulse">
        Loading customer details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      <a
        href={`/admin/customers/${customerId}`}
        className="text-sm text-pjh-muted hover:text-pjh-blue transition"
      >
        ← Back to {customer.business || customer.name}
      </a>

      <h1 className="text-3xl font-bold text-pjh-blue mb-6">
        Create New Quote for {customer.business || customer.name}
      </h1>

      <form onSubmit={handleSave} className="space-y-8">
        {/* === Basic Info === */}
        <div className="bg-pjh-gray p-6 rounded-xl grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Quote Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="form-input"
            required
          />
          <textarea
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="form-input md:col-span-2"
          />
        </div>

        {/* === Line Items === */}
        <div className="bg-pjh-gray p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-pjh-blue mb-4">
            Quote Items
          </h2>

          {items.map((item, index) => (
            <div key={index} className="grid md:grid-cols-5 gap-4 items-center mb-4">
              <input
                type="text"
                placeholder="Service Name"
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
                className="form-input"
                required
              />
              <input
                type="number"
                placeholder="Qty"
                min="1"
                value={item.qty}
                onChange={(e) => updateItem(index, "qty", +e.target.value)}
                className="form-input"
              />
              <input
                type="number"
                placeholder="Unit Price (£)"
                step="0.01"
                value={item.unit_price}
                onChange={(e) => updateItem(index, "unit_price", +e.target.value)}
                className="form-input"
              />
              <div className="text-center text-pjh-light font-semibold">
                £{item.total.toFixed(2)}
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-400 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="mt-2 px-4 py-2 bg-pjh-blue rounded-lg text-white hover:bg-pjh-blue/80 transition"
          >
            + Add Item
          </button>
        </div>

        {/* === Totals === */}
        <div className="bg-pjh-gray p-6 rounded-xl grid md:grid-cols-3 gap-6 text-lg font-medium">
          <div>
            <p className="text-pjh-muted">Subtotal</p>
            <p className="text-pjh-light">£{subtotal.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-pjh-muted">Deposit (50%)</p>
            <p className="text-pjh-light">£{deposit.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-pjh-muted">Balance</p>
            <p className="text-pjh-light">£{balance.toFixed(2)}</p>
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
