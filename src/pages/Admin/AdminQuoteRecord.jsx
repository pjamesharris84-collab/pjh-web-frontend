/**
 * ============================================================
 * PJH Web Services — Admin Quote Record
 * ============================================================
 * Features:
 *  • Weighted line-item pricing (Design > Booking/CRM > Other)
 *  • Per-item + global discount editing
 *  • PDF Preview + Email actions
 *  • Linked Order view & creation
 *  • Full live recalculation of totals
 * ============================================================
 */

import { useEffect, useMemo, useState } from "react";
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

  // 🔐 Admin Auth
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  // 📦 Load quote + packages
  useEffect(() => {
    if (quoteId) loadQuote();
    loadPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    try {
      const url = customerId
        ? `${API_BASE}/api/customers/${customerId}/quotes/${quoteId}`
        : `${API_BASE}/api/quotes/${quoteId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const q = data.quote || data.data || data;
      if (!q) return setError("Quote not found");

      const rawItems =
        typeof q.items === "string"
          ? JSON.parse(q.items || "[]")
          : Array.isArray(q.items)
          ? q.items
          : [];

      const items = rawItems.map((item, idx) => ({
        id: item.id ?? `item-${idx}-${Date.now()}`,
        name: item.name || "Unnamed Item",
        qty: Number(item.qty || 1),
        unit_price: Number(item.unit_price ?? item.price ?? 0),
        discount_percent: Number(item.discount_percent ?? 0),
      }));

      setQuote({
        id: q.id,
        customer_id: q.customer_id,
        package_id: q.package_id || "",
        quote_number: q.quote_number,
        title: q.title || "",
        description: q.description || "",
        items,
        status: q.status || "pending",
        custom_price: Number(q.custom_price) || null,
        discount_percent: Number(q.discount_percent) || 0,
        deposit: q.deposit !== undefined ? Number(q.deposit) : undefined,
        notes: q.notes || "",
        pricing_mode: q.pricing_mode || "oneoff",
        order_id: q.order_id || q.converted_order_id || null,
      });
    } catch (err) {
      console.error("❌ Failed to load quote:", err);
      setError("Failed to load quote");
    }
  }

  // ──────────────────────────────
  // Helpers
  // ──────────────────────────────
  const toNum = (v, fallback = 0) =>
    Number.isFinite(Number(v)) ? Number(v) : fallback;

  const updateItem = (index, patch) =>
    setQuote((q) => {
      const items = [...q.items];
      items[index] = { ...items[index], ...patch };
      return { ...q, items };
    });

  const addItem = () =>
    setQuote((q) => ({
      ...q,
      items: [
        ...q.items,
        {
          id: `item-${Date.now()}`,
          name: "New Line Item",
          qty: 1,
          unit_price: 0,
          discount_percent: 0,
        },
      ],
    }));

  const removeItem = (i) =>
    setQuote((q) => {
      const items = [...q.items];
      items.splice(i, 1);
      return { ...q, items };
    });

  // ──────────────────────────────
  // Weighted Package Logic
  // ──────────────────────────────
  function applyPackage(packageId) {
    const pkg = packages.find((p) => String(p.id) === String(packageId));
    if (!pkg) return setQuote((q) => ({ ...q, package_id: "", items: [] }));

    const features = Array.isArray(pkg.features) ? pkg.features : [];
    const priceOneOff = toNum(pkg.price_oneoff, 0);

    if (!features.length || !priceOneOff) {
      return setQuote((q) => ({
        ...q,
        package_id: pkg.id,
        items: [
          {
            id: `pkg-${pkg.id}-${Date.now()}`,
            name: pkg.name,
            qty: 1,
            unit_price: priceOneOff,
            discount_percent: toNum(pkg.discount_percent, 0),
          },
        ],
      }));
    }

    const weightMap = features.map((f) => {
      const name = f.toLowerCase();
      if (name.match(/design|build|development|ui|ux/)) return 0.4;
      if (name.match(/booking|crm|portal|system/))
        return pkg.name.toLowerCase().includes("premium") ? 0.25 : 0.15;
      if (name.match(/content|seo|hosting|support|training/)) return 0.15;
      return 0.05;
    });

    const totalWeight = weightMap.reduce((a, b) => a + b, 0);
    const normalized = weightMap.map((w) => w / totalWeight);

    const newItems = features.map((f, i) => ({
      id: `pkg-${pkg.id}-${i}-${Date.now()}`,
      name: f,
      qty: 1,
      unit_price: Number((priceOneOff * normalized[i]).toFixed(2)),
      discount_percent: 0,
    }));

    setQuote((q) => ({
      ...q,
      package_id: pkg.id,
      items: newItems,
      discount_percent:
        q.discount_percent > 0 ? q.discount_percent : toNum(pkg.discount_percent, 0),
    }));
  }

  // ──────────────────────────────
  // Totals Calculation
  // ──────────────────────────────
  const totals = useMemo(() => {
    if (!quote) return null;

    const lineTotals = quote.items.map((it) => {
      const gross = toNum(it.qty, 1) * toNum(it.unit_price, 0);
      const net =
        gross * (1 - Math.min(Math.max(toNum(it.discount_percent, 0), 0), 100) / 100);
      return { gross, net };
    });

    const subtotalGross = lineTotals.reduce((a, t) => a + t.gross, 0);
    const subtotalAfterLineDiscounts = lineTotals.reduce((a, t) => a + t.net, 0);

    const base =
      quote.custom_price && quote.custom_price > 0
        ? quote.custom_price
        : subtotalAfterLineDiscounts;

    const globalDisc = Math.min(Math.max(toNum(quote.discount_percent, 0), 0), 100);
    const afterGlobal = base * (1 - globalDisc / 100);
    const defaultDeposit = Number((afterGlobal * 0.5).toFixed(2));
    const deposit = quote.deposit == null ? defaultDeposit : toNum(quote.deposit, 0);
    const balance = Math.max(afterGlobal - deposit, 0);

    return {
      subtotalGross,
      subtotalAfterLineDiscounts,
      base,
      afterGlobal,
      deposit,
      balance,
      globalDisc,
    };
  }, [quote]);

  // ──────────────────────────────
  // Core Actions
  // ──────────────────────────────
  async function handleSave() {
    if (!quote) return;
    setSaving(true);
    try {
      const url = customerId
        ? `${API_BASE}/api/customers/${customerId}/quotes/${quoteId}`
        : `${API_BASE}/api/quotes/${quoteId}`;

      const payload = {
        title: quote.title,
        description: quote.description,
        items: quote.items.map(({ id, ...r }) => r),
        deposit: totals.deposit,
        notes: quote.notes,
        status: quote.status,
        pricing_mode: quote.pricing_mode || "oneoff",
        package_id: quote.package_id ? Number(quote.package_id) : null,
        custom_price: quote.custom_price ? Number(quote.custom_price) : null,
        discount_percent: quote.discount_percent ? Number(quote.discount_percent) : 0,
      };

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  async function handleEmail() {
    if (!quote) return;
    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/quotes/${quote.id}/email`, {
        method: "POST",
      });
      const data = await res.json();
      alert(res.ok ? "✅ Quote emailed successfully" : `❌ Email failed: ${data.message}`);
    } catch (err) {
      console.error("❌ Email error:", err);
      alert("❌ Error sending quote email");
    } finally {
      setWorking(false);
    }
  }

  async function handlePreviewPDF() {
    if (!quote) return;
    try {
      const payload = {
        title: quote.title,
        description: quote.description,
        items: quote.items.map(({ id, ...r }) => r),
        deposit: totals.deposit,
        discount_percent: quote.discount_percent || 0,
        custom_price: quote.custom_price || null,
      };
      const res = await fetch(`${API_BASE}/api/quotes/${quote.id}/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to generate preview");
      const blob = await res.blob();
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, "_blank");
    } catch (err) {
      console.error("❌ PDF Preview error:", err);
      alert("❌ Could not generate PDF preview.");
    }
  }

  async function handleCreateOrder() {
    if (!quote) return;
    if (!confirm("Convert this quote into an order?")) return;
    setWorking(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders/from-quote/${quote.id}`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data.order_id) {
        alert("✅ Order created successfully!");
        navigate(`/admin/orders/${data.order_id}`);
      } else {
        alert("❌ Failed to create order: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Order creation error:", err);
      alert("❌ Could not create order from quote.");
    } finally {
      setWorking(false);
    }
  }

  // ──────────────────────────────
  // UI Helpers
  // ──────────────────────────────
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
          map[status] ||
          "bg-slate-500/20 text-slate-300 border border-slate-400/30"
        }`}
      >
        {status}
      </span>
    );
  };

  if (error)
    return <div className="p-10 text-red-400">❌ {error}</div>;
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

      <div className="flex flex-wrap items-center gap-4 mt-2">
        <h1 className="text-3xl font-bold text-pjh-blue">
          Quote #{quote.quote_number || quote.id}
        </h1>
        {statusBadge(quote.status)}
      </div>

{/* ACTION BUTTONS */}
<div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
  <button
    onClick={handleEmail}
    disabled={working}
    className="btn-secondary bg-pjh-blue hover:bg-pjh-blue/80 text-white w-full"
  >
    ✉️ Email Quote (PDF)
  </button>

  <button
    onClick={handlePreviewPDF}
    className="btn-secondary bg-pjh-slate hover:bg-pjh-blue/50 text-white w-full"
  >
    👁️ Preview Quote (PDF)
  </button>

  <button
    onClick={handleSave}
    disabled={saving}
    className="btn-primary w-full"
  >
    {saving ? "Saving..." : "💾 Save Changes"}
  </button>

  <button
    onClick={async () => {
      if (confirm("Are you sure you want to delete this quote?")) await handleDelete();
    }}
    className="btn-danger bg-red-600 hover:bg-red-700 text-white w-full"
  >
    🗑️ Delete Quote
  </button>
</div>

{/* ORDER LINKS */}
{(quote.order_id || canCreateOrder) && (
  <div className="mt-4 flex flex-wrap gap-3">
    {quote.order_id ? (
      <a
        href={`/admin/orders/${quote.order_id}`}
        className="btn-secondary bg-green-700 hover:bg-green-600 text-white w-full sm:w-auto"
      >
        🔗 View Linked Order #{quote.order_id}
      </a>
    ) : (
      <button
        onClick={handleCreateOrder}
        disabled={working}
        className="btn-secondary bg-green-600 hover:bg-green-500 text-white w-full sm:w-auto"
      >
        🪄 Create Order from Quote
      </button>
    )}
  </div>
)}


      {/* META + ITEMS */}
      <div className="bg-pjh-gray p-6 rounded-xl mt-6 mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-sm text-pjh-muted mb-1">Title</label>
          <input
            className="form-input w-full"
            value={quote.title}
            onChange={(e) => setQuote({ ...quote, title: e.target.value })}
            placeholder="Project Title"
          />
        </div>
        <div>
          <label className="block text-sm text-pjh-muted mb-1">Status</label>
          <select
            className="form-input w-full"
            value={quote.status}
            onChange={(e) => setQuote({ ...quote, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="amend_requested">Amend Requested</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-pjh-muted mb-1">Description</label>
          <textarea
            className="form-input w-full"
            rows={3}
            value={quote.description}
            onChange={(e) => setQuote({ ...quote, description: e.target.value })}
            placeholder="Short description"
          />
        </div>

        {/* Package Selector */}
        <div>
          <label className="block text-sm text-pjh-muted mb-1">Package</label>
          <div className="flex gap-2">
            <select
              value={quote.package_id || ""}
              onChange={(e) => applyPackage(e.target.value)}
              className="form-input w-full"
            >
              <option value="">— None Selected —</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.price_oneoff ? ` (£${p.price_oneoff})` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-pjh-muted mb-1">Global Discount (%)</label>
          <input
            type="number"
            className="form-input w-full"
            value={quote.discount_percent ?? 0}
            onChange={(e) =>
              setQuote({ ...quote, discount_percent: toNum(e.target.value, 0) })
            }
            min="0"
            max="100"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm text-pjh-muted mb-1">
            Custom Price Override (£)
          </label>
          <input
            type="number"
            className="form-input w-full"
            value={quote.custom_price ?? ""}
            onChange={(e) =>
              setQuote({
                ...quote,
                custom_price:
                  e.target.value === "" ? null : toNum(e.target.value, 0),
              })
            }
            placeholder="Leave empty to auto-calc from items"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm text-pjh-muted mb-1">Deposit (£)</label>
          <input
            type="number"
            className="form-input w-full"
            value={quote.deposit ?? totals?.deposit ?? ""}
            onChange={(e) =>
              setQuote({
                ...quote,
                deposit:
                  e.target.value === "" ? undefined : toNum(e.target.value, 0),
              })
            }
            step="0.01"
          />
          <p className="text-xs text-pjh-muted mt-1">
            Leave empty to auto-calc 50% of discounted total.
          </p>
        </div>
      </div>

      {/* LINE ITEMS */}
      <div className="bg-pjh-slate p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-pjh-blue">Line Items</h2>
          <button onClick={addItem} className="btn-secondary">
            ➕ Add Line
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/10 rounded-lg">
            <thead className="bg-pjh-gray/60">
              <tr className="text-left text-sm text-pjh-muted">
                <th className="p-3 w-[40%]">Item</th>
                <th className="p-3 w-[10%]">Qty</th>
                <th className="p-3 w-[15%]">Unit (£)</th>
                <th className="p-3 w-[15%]">Line Disc %</th>
                <th className="p-3 w-[15%]">Line Total (£)</th>
                <th className="p-3 w-[5%]"></th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((it, i) => {
                const qty = toNum(it.qty, 1);
                const unit = toNum(it.unit_price, 0);
                const disc = Math.min(Math.max(toNum(it.discount_percent, 0), 0), 100);
                const lineTotal = qty * unit * (1 - disc / 100);
                return (
                  <tr key={it.id} className="border-t border-white/5">
                    <td className="p-2">
                      <input
                        className="form-input w-full"
                        value={it.name}
                        onChange={(e) => updateItem(i, { name: e.target.value })}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        className="form-input w-24"
                        value={qty}
                        onChange={(e) =>
                          updateItem(i, { qty: toNum(e.target.value, 0) })
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="form-input w-32"
                        value={unit}
                        onChange={(e) =>
                          updateItem(i, { unit_price: toNum(e.target.value, 0) })
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        className="form-input w-28"
                        value={disc}
                        onChange={(e) =>
                          updateItem(i, {
                            discount_percent: Math.min(
                              Math.max(toNum(e.target.value, 0), 0),
                              100
                            ),
                          })
                        }
                      />
                    </td>
                    <td className="p-2 font-semibold">
                      £{lineTotal.toFixed(2)}
                    </td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => removeItem(i)}
                        className="text-red-400 hover:text-red-300"
                        title="Remove line"
                      >
                        ✖
                      </button>
                    </td>
                  </tr>
                );
              })}
              {quote.items.length === 0 && (
                <tr>
                  <td className="p-4 text-pjh-muted" colSpan={6}>
                    No line items. Choose a package or add lines.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        {totals && (
          <div className="mt-6 grid gap-1 justify-end text-right">
            <p className="text-sm text-pjh-muted">
              Subtotal (before discounts): £{totals.subtotalGross.toFixed(2)}
            </p>
            <p className="text-sm text-pjh-muted">
              After line discounts: £{totals.subtotalAfterLineDiscounts.toFixed(2)}
            </p>
            {quote.custom_price ? (
              <p className="text-sm">
                Custom price base: <b>£{totals.base.toFixed(2)}</b>
              </p>
            ) : null}
            <p className="text-sm">
              Global discount ({totals.globalDisc.toFixed(2)}%):{" "}
              <b>£{totals.afterGlobal.toFixed(2)}</b>
            </p>
            <p className="text-lg">
              Deposit: <b>£{totals.deposit.toFixed(2)}</b>
            </p>
            <p className="text-lg">
              Balance: <b>£{totals.balance.toFixed(2)}</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
