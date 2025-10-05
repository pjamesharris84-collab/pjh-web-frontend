import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminOrderRecord() {
  const { id } = useParams(); // orderId
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [saving, setSaving] = useState(false);
  const [working, setWorking] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState("");

  // 🌍 Use environment-aware API base
  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "https://pjh-web-backend.onrender.com"; // fallback to production Render backend

  // 🔐 Protect route
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  useEffect(() => {
    if (id) loadOrder();
  }, [id]);

  // ===============================
  // 🔄 LOAD ORDER
  // ===============================
  async function loadOrder() {
    console.log("🔄 Fetching order", id);
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const o = data.data;

      o.items = parseMaybeJSON(o.items);
      o.tasks = parseMaybeJSON(o.tasks);
      o.diary = parseMaybeJSON(o.diary);

      setOrder(o);
    } catch (err) {
      console.error("❌ Failed to load order:", err);
      setError("Failed to load order details.");
    }
  }

  function parseMaybeJSON(val) {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return Array.isArray(val) ? val : [];
  }

  // ===============================
  // 💾 SAVE ORDER
  // ===============================
  async function handleSave() {
    if (!order) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      alert("✅ Order updated successfully");
      await loadOrder();
    } catch (err) {
      console.error("❌ Save error:", err);
      alert("❌ Failed to save order changes");
    } finally {
      setSaving(false);
    }
  }

  // ===============================
  // ✅ TOGGLE TASK
  // ===============================
  async function handleToggleTask(task) {
    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Task update failed");
      setOrder(data.data);
    } catch (err) {
      console.error("❌ Task update error:", err);
      alert("❌ Failed to update tasks");
    } finally {
      setWorking(false);
    }
  }

  // ===============================
  // 📝 ADD DIARY NOTE
  // ===============================
  async function handleAddNote() {
    if (!newNote.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}/diary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add note");
      setNewNote("");
      await loadOrder();
    } catch (err) {
      console.error("❌ Add note error:", err);
      alert("❌ Could not add diary note");
    }
  }

  // ===============================
  // 💰 SEND INVOICE (deposit/balance)
  // ===============================
  async function handleSendInvoice(type) {
    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}/invoice/${type}`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ ${type.toUpperCase()} invoice sent successfully.`);
      } else {
        alert("❌ Invoice failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(`❌ Error sending ${type} invoice:`, err);
      alert(`❌ Failed to send ${type} invoice`);
    } finally {
      setWorking(false);
    }
  }

  // ===============================
  // 🕓 RENDER
  // ===============================
  if (error)
    return <div className="p-10 text-red-400">❌ {error}</div>;
  if (!order)
    return (
      <div className="p-10 text-pjh-muted animate-pulse">
        Loading order details...
      </div>
    );

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      <a
        href="/admin/orders"
        className="text-sm text-pjh-muted hover:text-pjh-blue transition"
      >
        ← Back to Orders
      </a>

      <div className="flex items-center justify-between mt-2 flex-wrap gap-3">
        <h1 className="text-3xl font-bold text-pjh-blue">
          Order #{order.id} — {order.title}
        </h1>
        <span
          className={`px-3 py-1 rounded text-xs font-semibold ${
            order.status === "completed"
              ? "bg-green-500/20 text-green-300 border border-green-400/30"
              : order.status === "cancelled"
              ? "bg-red-500/20 text-red-300 border border-red-400/30"
              : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => handleSendInvoice("deposit")}
          disabled={working}
          className="btn-secondary bg-pjh-blue hover:bg-pjh-blue/80 text-white"
        >
          💰 Send Deposit Invoice
        </button>
        <button
          onClick={() => handleSendInvoice("balance")}
          disabled={working}
          className="btn-secondary bg-pjh-blue hover:bg-pjh-blue/80 text-white"
        >
          💼 Send Balance Invoice
        </button>
      </div>

      {/* Editable Fields */}
      <div className="bg-pjh-gray p-6 rounded-xl mt-6 mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["title", "description", "status"].map((key) => (
          <div key={key}>
            <label className="block text-sm text-pjh-muted mb-1 capitalize">
              {key}
            </label>
            <input
              type="text"
              value={order[key] ?? ""}
              onChange={(e) =>
                setOrder({ ...order, [key]: e.target.value })
              }
              className="form-input w-full"
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary col-span-full"
        >
          {saving ? "Saving..." : "💾 Save Changes"}
        </button>
      </div>

      {/* Line Items */}
      {Array.isArray(order.items) && order.items.length > 0 && (
        <div className="bg-pjh-slate p-6 rounded-xl mb-8">
          <h2 className="text-xl font-semibold mb-4 text-pjh-blue">
            Line Items
          </h2>
          <table className="min-w-full border border-white/10 rounded-lg mb-6">
            <thead className="bg-pjh-gray/60">
              <tr className="text-left text-sm text-pjh-muted">
                <th className="p-3">Item</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Unit (£)</th>
                <th className="p-3">Total (£)</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.qty}</td>
                  <td className="p-3">
                    {Number(item.unit_price || item.price).toFixed(2)}
                  </td>
                  <td className="p-3">
                    {(
                      Number(item.qty) *
                      Number(item.unit_price || item.price)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right text-lg font-semibold space-y-1">
            <p>Deposit: £{Number(order.deposit).toFixed(2)}</p>
            <p>Balance: £{Number(order.balance).toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Tasks */}
      <div className="bg-pjh-gray p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-4 text-pjh-blue">
          Tasks
        </h2>
        {Array.isArray(order.tasks) && order.tasks.length > 0 ? (
          <ul className="space-y-2">
            {order.tasks.map((task, i) => (
              <li
                key={i}
                onClick={() => handleToggleTask(task)}
                className={`cursor-pointer px-3 py-2 rounded border ${
                  order.tasks.includes(task)
                    ? "bg-green-500/20 border-green-400/30 text-green-300"
                    : "bg-slate-600/30 border-white/10"
                }`}
              >
                ✅ {task}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-pjh-muted">No tasks yet.</p>
        )}
      </div>

      {/* Diary / Notes */}
      <div className="bg-pjh-slate p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-4 text-pjh-blue">
          Project Diary
        </h2>

        {Array.isArray(order.diary) && order.diary.length > 0 ? (
          <ul className="space-y-2 mb-4">
            {order.diary.map((entry, i) => (
              <li key={i} className="border border-white/10 p-3 rounded-lg">
                <p className="text-sm">{entry.note}</p>
                <p className="text-xs text-pjh-muted mt-1">
                  {new Date(entry.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-pjh-muted mb-4">
            No diary entries yet.
          </p>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a new diary note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="form-input flex-grow"
          />
          <button onClick={handleAddNote} className="btn-primary">
            ➕ Add
          </button>
        </div>
      </div>
    </div>
  );
}
