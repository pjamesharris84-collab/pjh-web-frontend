import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api"; // ✅ centralised API helper

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  // 🔐 Auth check
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  // 🧠 Fetch customers
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
    try {
      const data = await apiFetch("/api/customers", {
        method: "POST",
        body: JSON.stringify(newCustomer),
      });
      // ⏩ Redirect straight to new record
      if (data?.id) {
        window.location.href = `/admin/customers/${data.id}`;
      } else {
        alert("⚠️ Customer created but missing ID — check server logs.");
      }
    } catch (err) {
      console.error("❌ Could not add customer:", err);
      alert("❌ Could not add customer — check console for details.");
    }
  }

  // 🧱 UI
  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-pjh-blue">Customers</h1>
          <p className="text-pjh-muted">
            View, add, or open customer records.
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
        <button type="submit" className="btn-primary col-span-full">
          Add Customer
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
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-white/5 hover:bg-pjh-blue/10 cursor-pointer"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
