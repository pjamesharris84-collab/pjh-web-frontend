import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminQuoteRecord() {
  const { id: customerId, quoteId } = useParams();
  const navigate = useNavigate();

  const [quote, setQuote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  // 🔐 Protect route
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  useEffect(() => {
    if (quoteId) loadQuote();
  }, [quoteId]);

  async function loadQuote() {
    console.log("🔄 Fetching quote", quoteId);
    try {
      const url = customerId
        ? `http://localhost:5000/api/customers/${customerId}/quotes/${quoteId}`
        : `http://localhost:5000/api/quotes/${quoteId}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      let q = data.quote || data.data || data || null;
      if (!q) return setError("Quote not found");

      // Parse items safely
      q.items =
        typeof q.items === "string"
          ? JSON.parse(q.items || "[]")
          : Array.isArray(q.items)
          ? q.items
          : [];

      q.items = q.items.map((item) => {
        const qty = Number(item.qty || 1);
        const unit = Number(item.unit_price ?? item.price ?? 0);
        return {
          name: item.name || "Unnamed Item",
          qty,
          unit_price: unit,
          total: qty * unit,
        };
      });

      q.subtotal = q.items.reduce((sum, i) => sum + (i.total || 0), 0);
      q.deposit = Number(q.deposit) || q.subtotal * 0.5;
      q.balance = q.subtotal - q.deposit;

      setQuote(q);
    } catch (err) {
      console.error("❌ Failed to load quote:", err);
      setError("Failed to load quote");
    }
  }

  async function handleSave() {
    if (!quote) return;
    setSaving(true);
    try {
      const url = customerId
        ? `http://localhost:5000/api/customers/${customerId}/quotes/${quoteId}`
        : `http://localhost:5000/api/quotes/${quoteId}`;

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: quote.title,
          description: quote.description,
          items: quote.items,
          deposit: quote.deposit,
          notes: quote.notes,
          status: quote.status,
        }),
      });

      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      alert("✅ Quote updated successfully");
      await loadQuote();
    } catch (err) {
      console.error("❌ Failed to save quote:", err);
      alert("❌ Failed to save quote — check console");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this quote?")) return;
    try {
      const url = customerId
        ? `http://localhost:5000/api/customers/${customerId}/quotes/${quoteId}`
        : `http://localhost:5000/api/quotes/${quoteId}`;

      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);

      alert("✅ Quote deleted successfully");
      navigate(customerId ? `/admin/customers/${customerId}` : "/admin/quotes");
    } catch (err) {
      console.error("❌ Failed to delete quote:", err);
      alert("❌ Could not delete quote — check console");
    }
  }

  async function handleEmail() {
    if (!quote) return;
    setWorking(true);
    try {
      const res = await fetch(`http://localhost:5000/api/quotes/${quote.id}/email`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) alert("✅ Quote emailed successfully");
      else alert("❌ Email failed: " + (data.message || "Unknown error"));
    } catch (err) {
      console.error("❌ Email error:", err);
      alert("❌ Error sending quote email");
    } finally {
      setWorking(false);
    }
  }

  async function handleAccept() {
    setWorking(true);
    try {
      const res = await fetch(`http://localhost:5000/api/quotes/${quoteId}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.message || "Accept failed");
      await loadQuote();
      alert("✅ Quote marked as accepted");
    } catch (err) {
      console.error("❌ Accept failed:", err);
      alert("❌ Could not accept quote");
    } finally {
      setWorking(false);
    }
  }

  async function handleReject() {
    if (!confirm("Mark this quote as Rejected?")) return;
    setWorking(true);
    try {
      const res = await fetch(`http://localhost:5000/api/quotes/${quoteId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.message || "Reject failed");
      await loadQuote();
      alert("✅ Quote marked as rejected");
    } catch (err) {
      console.error("❌ Reject failed:", err);
      alert("❌ Could not reject quote");
    } finally {
      setWorking(false);
    }
  }

  async function handleCreateOrder() {
    setWorking(true);
    try {
      const res = await fetch(`http://localhost:5000/api/orders/from-quote/${quoteId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.message || "Create order failed");

      const orderId = data?.data?.id || data?.order?.id;
      if (orderId) {
        alert("✅ Order created from quote");
        navigate(`/admin/orders/${orderId}`);
      } else {
        alert(data?.message || "⚠️ Order already exists for this quote");
      }
    } catch (err) {
      console.error("❌ Create order failed:", err);
      alert("❌ Could not create order");
    } finally {
      setWorking(false);
    }
  }

  const statusBadge = (status) => {
    const map = {
      pending: "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30",
      accepted: "bg-green-500/20 text-green-300 border border-green-400/30",
      rejected: "bg-red-500/20 text-red-300 border border-red-400/30",
      amend_requested: "bg-blue-500/20 text-blue-300 border border-blue-400/30",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          map[status] || "bg-slate-500/20 text-slate-300 border border-slate-400/30"
        }`}
      >
        {status}
      </span>
    );
  };

  if (error) return <div className="p-10 text-red-400">❌ {error}</div>;
  if (!quote)
    return <div className="p-10 text-pjh-muted animate-pulse">Loading quote details...</div>;

  const canCreateOrder = quote.status === "accepted";

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      <a
        href={customerId ? `/admin/customers/${customerId}` : "/admin/quotes"}
        className="text-sm text-pjh-muted hover:text-pjh-blue transition"
      >
        ← Back
      </a>

      <div className="flex items-center gap-4 mt-2">
        <h1 className="text-3xl font-bold text-pjh-blue">
          Quote #{quote.quote_number || quote.id}
        </h1>
        {statusBadge(quote.status)}
      </div>

      {/* Actions */}
<div className="mt-4 flex flex-wrap gap-3">
  <button
    onClick={handleAccept}
    disabled={working || quote.status === "accepted"}
    className="btn-primary"
  >
    ✅ Accept
  </button>

  <button
    onClick={handleReject}
    disabled={working || quote.status === "rejected"}
    className="btn-danger"
  >
    ❌ Reject
  </button>

  {/* Show “Create Order” only if accepted and no linked order */}
  {!quote.order_id && canCreateOrder && (
    <button
      onClick={handleCreateOrder}
      disabled={working}
      className="btn-secondary"
    >
      ➕ Create Order from Quote
    </button>
  )}

  {/* Show “View Linked Order” if one exists */}
  {quote.order_id && (
    <button
      onClick={() => navigate(`/admin/orders/${quote.order_id}`)}
      className="btn-secondary bg-green-600 hover:bg-green-700 text-white"
    >
      🔗 View Linked Order #{quote.order_id}
    </button>
  )}

  <button
    onClick={handleEmail}
    disabled={working}
    className="btn-secondary bg-pjh-blue hover:bg-pjh-blue/80 text-white"
  >
    ✉️ Email Quote (PDF)
  </button>
</div>

      {/* --- DETAILS FORM --- */}
      <div className="bg-pjh-gray p-6 rounded-xl mt-6 mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(quote).map(([key, value]) => {
          if (["id", "created_at", "updated_at", "customer_id", "history", "items", "subtotal", "balance"].includes(key))
            return null;
          return (
            <div key={key}>
              <label className="block text-sm text-pjh-muted mb-1 capitalize">
                {key.replace(/_/g, " ")}
              </label>
              <input
                type="text"
                value={value ?? ""}
                onChange={(e) => setQuote({ ...quote, [key]: e.target.value })}
                className="form-input w-full"
              />
            </div>
          );
        })}
        <button onClick={handleSave} disabled={saving} className="btn-primary col-span-full">
          {saving ? "Saving..." : "💾 Save Changes"}
        </button>
        <button
          onClick={handleDelete}
          className="btn-danger col-span-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 mt-2"
        >
          🗑️ Delete Quote
        </button>
      </div>

      {/* --- ITEMS --- */}
      {Array.isArray(quote.items) && quote.items.length > 0 && (
        <div className="bg-pjh-slate p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-pjh-blue">Line Items</h2>
          <table className="min-w-full border border-white/10 rounded-lg mb-6">
            <thead className="bg-pjh-gray/60">
              <tr className="text-left text-sm text-pjh-muted">
                <th className="p-3">Item</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Unit Price (£)</th>
                <th className="p-3">Total (£)</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.qty}</td>
                  <td className="p-3">{item.unit_price.toFixed(2)}</td>
                  <td className="p-3">{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right text-lg font-semibold space-y-1">
            <p>Project Total: £{quote.subtotal.toFixed(2)}</p>
            <p>Deposit Required: £{quote.deposit.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
