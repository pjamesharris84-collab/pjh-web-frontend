/**
 * ============================================================
 * PJH Web Services — Frontend Router (React + Vite, Lazy-Loaded)
 * ============================================================
 * Lazy-loads admin dashboard modules for performance,
 * keeping the public-facing site lightweight.
 * ============================================================
 */

import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// =======================
// 🌍 Public Pages
// =======================
import App from "./App.jsx";
import Contact from "./pages/Contact.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import Cookies from "./pages/legal/Cookies.jsx";
import Privacy from "./pages/legal/Privacy.jsx";
import Terms from "./pages/legal/Terms.jsx";
import Pricing from "./pages/Pricing.jsx";
import LegalMonthlyTerms from "./pages/legal/LegalMonthlyTerms.jsx";
import PackageDetails from "./pages/PackageDetails.jsx";
import DirectDebitPolicy from "./pages/legal/direct-debit-policy.jsx";
import SetupComplete from "./pages/SetupComplete.jsx";
import DirectDebitSetup from "./pages/direct-debit-setup.jsx";


// 💳 Payment Pages
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentCancelled from "./pages/PaymentCancelled.jsx";
import PaymentFailed from "./pages/PaymentFailed.jsx";

// =======================
// 💤 Lazy-Loaded Admin Pages
// =======================
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin.jsx"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard.jsx"));
const AdminCustomers = lazy(() => import("./pages/Admin/AdminCustomers.jsx"));
const AdminCustomerRecord = lazy(() =>
  import("./pages/Admin/AdminCustomerRecord.jsx")
);
const AdminQuotes = lazy(() => import("./pages/Admin/AdminQuotes.jsx"));
const AdminQuoteNew = lazy(() => import("./pages/Admin/AdminQuoteNew.jsx"));
const AdminQuoteRecord = lazy(() =>
  import("./pages/Admin/AdminQuoteRecord.jsx")
);
const AdminOrders = lazy(() => import("./pages/Admin/AdminOrders.jsx"));
const AdminOrderRecord = lazy(() =>
  import("./pages/Admin/AdminOrderRecord.jsx")
);
const AdminInvoices = lazy(() => import("./pages/Admin/AdminInvoices.jsx"));
const AdminPackages = lazy(() => import("./pages/Admin/AdminPackages.jsx"));

// =======================
// 🎨 Global Styles
// =======================
import "./index.css";

// ------------------------------------------------------------
// ⏳ Suspense Fallback Loader
// ------------------------------------------------------------
function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pjh-charcoal text-pjh-blue text-lg font-medium animate-pulse">
      Loading admin dashboard…
    </div>
  );
}

// ============================================================
// ⚙️ Application Entry Point
// ============================================================
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>

          {/* =================== */}
          {/* 🌍 PUBLIC ROUTES    */}
          {/* =================== */}
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/legal/cookies" element={<Cookies />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/legal/monthly-terms" element={<LegalMonthlyTerms />} />
          <Route path="/packages/:name" element={<PackageDetails />} /> 
          <Route path="/legal/direct-debit-policy" element={<DirectDebitPolicy />} />   
          <Route path="/direct-debit-setup" element={<DirectDebitSetup />} />
<Route path="/setup-complete" element={<SetupComplete />} />     


          {/* 💳 Payments */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancelled" element={<PaymentCancelled />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />

          {/* =================== */}
          {/* 🔐 ADMIN ROUTES     */}
          {/* =================== */}

          {/* Login & Dashboard */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* 👥 Customers */}
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/customers/:id" element={<AdminCustomerRecord />} />

          {/* 🧾 Quotes */}
          <Route
            path="/admin/customers/:id/quotes/new"
            element={<AdminQuoteNew />}
          />
          <Route
            path="/admin/customers/:id/quotes/:quoteId"
            element={<AdminQuoteRecord />}
          />
          <Route path="/admin/quotes" element={<AdminQuotes />} />
          <Route path="/admin/quotes/:quoteId" element={<AdminQuoteRecord />} />

          {/* 📦 Orders & Invoices */}
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:id" element={<AdminOrderRecord />} />
          <Route path="/admin/invoices" element={<AdminInvoices />} />

          {/* 💼 Packages */}
          <Route path="/admin/packages" element={<AdminPackages />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
