import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminQuoteRecord() {
  const { id: customerId, quoteId } = useParams();
  const navigate = useNavigate();
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  const [quote, setQuote] = useState(null);
  const [packages, setPackages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  // 🔐 Auth protection
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  // 🔄 Load quote & packages
  useEffect(() => {
    if (quoteId) loadQuote();
    loadPackages();
  }, [quoteId]);

  async function loadPackages() {
    try {
      const res = await fetch(`${API_BASE}/api/packages`);
      const data = await res.json();
      setPackages(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("❌ Failed to load packages:", err);
      setPackages([]);
    }
  }

  async function loadQuote() {
    console.log("🔄 Fetching quote", quoteId);
    try {
      const url = customerId
        ? `${API_BASE}/api/customers/${customerId}/quotes/${quoteId}`
        : `${API_BASE}/api/quotes/${quoteId}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      let q = data.quote || data.data || data;
      if (!q) return setError("Quote not found");

      // Parse & normalize items
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

  // 💾 Save quote edits
  async function handleSave() {
    if (!quote) return;
    setSaving(true);
    try {
      const url = customerId
        ? `${API_BASE}/api/customers/${customerId}/quotes/${quoteId}`
        : `${API_BASE}/api/quotes/${quoteId}`;

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
          package_id: quote.package_id ? Number(quote.package_id) : null,
          custom_price: quote.custom_price ? Number(quote.custom_price) : null,
          discount_percent: quote.discount_percent
            ? Number(quote.discount_percent)
            : 0,
        }),
      });

      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      alert("✅ Quote updated successfully");
      await loadQuote();
    } catch (err) {
      console.error("❌ Save error:", err);
      alert("❌ Failed to save quote");
    } finally {
      setSaving(false);
    }
  }

  // 🗑️ Delete quote
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this quote?")) return;
    try {
      const url = customerId
        ? `${API_BASE}/api/customers/${customerId}/quotes/${quoteId}`
        : `${API_BASE}/api/quotes/${quoteId}`;
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);

      alert("✅ Quote deleted successfully");
      navigate(customerId ? `/admin/customers/${customerId}` : "/admin/quotes");
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("❌ Could not delete quote — check console");
    }
  }

  // ✉️ Email PDF
  async function handleEmail() {
    if (!quote) return;
    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/quotes/${quote.id}/email`, {
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

  // ✅ Accept / ❌ Reject / ➕ Order creation handlers (unchanged)
  async function handleAccept() {
    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/quotes/${quoteId}/accept`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Accept failed");
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
      const res = await fetch(`${API_BASE}/api/quotes/${quoteId}/reject`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Reject failed");
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
      const res = await fetch(`${API_BASE}/api/orders/from-quote/${quoteId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Create order failed");

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
      amend_requested:
        "bg-blue-500/20 text-blue-300 border border-blue-400/30",
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
    return (
      <div className="p-10 text-pjh-muted animate-pulse">
        Loading quote details...
      </div>
    );

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

      {/* === ACTION BUTTONS === */}
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
        {!quote.order_id && canCreateOrder && (
          <button onClick={handleCreateOrder} disabled={working} className="btn-secondary">
            ➕ Create Order from Quote
          </button>
        )}
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

      {/* === DETAILS FORM === */}
      <div className="bg-pjh-gray p-6 rounded-xl mt-6 mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <label className="block text-sm text-pjh-muted mb-1">Package</label>
        <select
          value={quote.package_id || ""}
          onChange={(e) => setQuote({ ...quote, package_id: e.target.value })}
          className="form-input w-full col-span-2"
        >
          <option value="">— None Selected —</option>
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (£{p.price_oneoff})
            </option>
          ))}
        </select>

        <label className="block text-sm text-pjh-muted mb-1">Custom Price (Override)</label>
        <input
          type="number"
          value={quote.custom_price || ""}
          onChange={(e) => setQuote({ ...quote, custom_price: e.target.value })}
          className="form-input w-full"
          placeholder="e.g. 2500"
        />

        <label className="block text-sm text-pjh-muted mb-1">Discount (%)</label>
        <input
          type="number"
          value={quote.discount_percent || 0}
          onChange={(e) =>
            setQuote({ ...quote, discount_percent: e.target.value })
          }
          className="form-input w-full"
        />

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary col-span-full mt-2"
        >
          {saving ? "Saving..." : "💾 Save Changes"}
        </button>
        <button
          onClick={handleDelete}
          className="btn-danger col-span-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 mt-2"
        >
          🗑️ Delete Quote
        </button>
      </div>

      {/* === LINE ITEMS === */}
      {Array.isArray(quote.items) && quote.items.length > 0 && (
        <div className="bg-pjh-slate p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-pjh-blue">
            Line Items
          </h2>
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
