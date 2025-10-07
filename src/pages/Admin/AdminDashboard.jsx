import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);

  // 🔐 Admin authentication guard
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      window.location.href = "/admin"; // redirect if not logged in
    }
  }, []);

  // 💳 Create Stripe payment session (Deposit or Balance)
  const sendPaymentLink = async (orderId, type) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payments/create-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, type }),
        }
      );

      const data = await res.json();
      if (data.success) {
        alert(`✅ ${type} payment link created and emailed successfully!`);
        console.log("Payment URL:", data.url);
      } else {
        alert(`⚠️ ${data.error || "Failed to create payment link."}`);
      }
    } catch (err) {
      console.error("❌ Payment link error:", err);
      alert("Error sending payment link.");
    } finally {
      setLoading(false);
    }
  };

  // 🧱 Render Dashboard
  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      {/* === HEADER === */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-pjh-blue mb-2">
            Admin Dashboard
          </h1>
          <p className="text-pjh-muted">
            Manage customers, quotes, orders, invoices & Stripe payments.
          </p>
        </div>

        {/* 🔴 Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            window.location.href = "/admin";
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
        >
          Logout
        </button>
      </header>

      {/* === ADMIN SECTIONS === */}
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Customers */}
        <li>
          <a
            href="/admin/customers"
            className="block h-full p-6 rounded-xl bg-pjh-gray hover:bg-pjh-blue/10 border border-white/10 transition flex flex-col justify-between shadow-sm hover:shadow-pjh-blue/20"
          >
            <div>
              <h2 className="text-lg font-semibold text-pjh-blue mb-2">
                🧾 Manage Customers
              </h2>
              <p className="text-sm text-pjh-muted">
                View, add, or edit customer records.
              </p>
            </div>
          </a>
        </li>

        {/* Quotes */}
        <li>
          <a
            href="/admin/quotes"
            className="block h-full p-6 rounded-xl bg-pjh-gray hover:bg-pjh-blue/10 border border-white/10 transition flex flex-col justify-between shadow-sm hover:shadow-pjh-blue/20"
          >
            <div>
              <h2 className="text-lg font-semibold text-pjh-blue mb-2">
                💬 Manage Quotes
              </h2>
              <p className="text-sm text-pjh-muted">
                Create, send, and track customer quotes.
              </p>
            </div>
          </a>
        </li>

        {/* Orders */}
        <li>
          <a
            href="/admin/orders"
            className="block h-full p-6 rounded-xl bg-pjh-gray hover:bg-pjh-blue/10 border border-white/10 transition flex flex-col justify-between shadow-sm hover:shadow-pjh-blue/20"
          >
            <div>
              <h2 className="text-lg font-semibold text-pjh-blue mb-2">
                📦 Manage Orders
              </h2>
              <p className="text-sm text-pjh-muted">
                Track progress, tasks, and order status.
              </p>
            </div>
          </a>
        </li>

        {/* Invoices */}
        <li>
          <a
            href="/admin/invoices"
            className="block h-full p-6 rounded-xl bg-pjh-gray hover:bg-pjh-blue/10 border border-white/10 transition flex flex-col justify-between shadow-sm hover:shadow-pjh-blue/20"
          >
            <div>
              <h2 className="text-lg font-semibold text-pjh-blue mb-2">
                💰 Manage Invoices
              </h2>
              <p className="text-sm text-pjh-muted">
                Generate, send, and view customer invoices.
              </p>
            </div>
          </a>
        </li>

        {/* Stripe Payments */}
        <li>
          <div className="block h-full p-6 rounded-xl bg-pjh-gray border border-white/10 transition flex flex-col justify-between shadow-sm hover:bg-pjh-blue/10 hover:shadow-pjh-blue/20">
            <div>
              <h2 className="text-lg font-semibold text-pjh-blue mb-2">
                💳 Stripe Payments
              </h2>
              <p className="text-sm text-pjh-muted mb-4">
                Create secure payment links for customers.
              </p>
              <div className="space-y-2">
                <button
                  disabled={loading}
                  onClick={() => sendPaymentLink(prompt("Enter Order ID:"), "deposit")}
                  className="w-full bg-pjh-blue hover:bg-pjh-blue/80 text-white rounded-md py-2 text-sm font-medium transition"
                >
                  🔗 Send Deposit Link
                </button>
                <button
                  disabled={loading}
                  onClick={() => sendPaymentLink(prompt("Enter Order ID:"), "balance")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-2 text-sm font-medium transition"
                >
                  💸 Send Balance Link
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* === FOOTER === */}
      <footer className="mt-16 text-center text-sm text-pjh-muted border-t border-white/10 pt-6">
        © {new Date().getFullYear()} PJH Web Services — Internal Dashboard
      </footer>
    </div>
  );
}
