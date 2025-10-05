import { useEffect } from "react";

export default function AdminDashboard() {
  // 🔐 Auth check (redirect if not logged in)
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      window.location.href = "/admin"; // Redirect to login
    }
  }, []);

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light p-10">
      {/* === HEADER === */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-pjh-blue mb-2">
            Admin Dashboard
          </h1>
          <p className="text-pjh-muted">
            Welcome back — manage customers, quotes, orders, and invoices.
          </p>
        </div>

        {/* Logout Button */}
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

      {/* === ADMIN LINKS === */}
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Customers */}
        <li className="h-full">
          <a
            href="/admin/customers"
            className="block h-full p-6 rounded-xl bg-pjh-gray hover:bg-pjh-blue/10 border border-white/10 transition flex flex-col justify-between"
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
        <li className="h-full">
          <a
            href="/admin/quotes"
            className="block h-full p-6 rounded-xl bg-pjh-gray hover:bg-pjh-blue/10 border border-white/10 transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-pjh-blue mb-2">
                💬 Manage Quotes
              </h2>
              <p className="text-sm text-pjh-muted">
                Create and track customer quotes and revisions.
              </p>
            </div>
          </a>
        </li>

        {/* Orders */}
        <li className="h-full">
          <a
            href="/admin/orders"
            className="block h-full p-6 rounded-xl bg-pjh-gray hover:bg-pjh-blue/10 border border-white/10 transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-pjh-blue mb-2">
                📦 Manage Orders
              </h2>
              <p className="text-sm text-pjh-muted">
                Track project progress, tasks, and order status.
              </p>
            </div>
          </a>
        </li>

        {/* Invoices */}
        <li className="h-full">
          <a
            href="/admin/invoices"
            className="block h-full p-6 rounded-xl bg-pjh-gray hover:bg-pjh-blue/10 border border-white/10 transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-pjh-blue mb-2">
                💰 Manage Invoices
              </h2>
              <p className="text-sm text-pjh-muted">
                Generate, send, and view all customer invoices.
              </p>
            </div>
          </a>
        </li>
      </ul>

      {/* === FOOTER === */}
      <footer className="mt-16 text-center text-sm text-pjh-muted border-t border-white/10 pt-6">
        © {new Date().getFullYear()} PJH Web Services — Internal Dashboard
      </footer>
    </div>
  );
}
