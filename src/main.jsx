import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public
import App from "./App.jsx";
import Contact from "./pages/Contact.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import Cookies from "./pages/Cookies.jsx"; // ✅ Added

// Admin
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminCustomers from "./pages/Admin/AdminCustomers.jsx";
import AdminCustomerRecord from "./pages/Admin/AdminCustomerRecord.jsx";
import AdminQuotes from "./pages/Admin/AdminQuotes.jsx";
import AdminQuoteNew from "./pages/Admin/AdminQuoteNew.jsx";
import AdminQuoteRecord from "./pages/Admin/AdminQuoteRecord.jsx";
import AdminOrders from "./pages/Admin/AdminOrders.jsx";
import AdminOrderRecord from "./pages/Admin/AdminOrderRecord.jsx";
import AdminInvoices from "./pages/Admin/AdminInvoices.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/cookies" element={<Cookies />} /> {/* ✅ New Cookies Page */}

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Customers */}
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/customers/:id" element={<AdminCustomerRecord />} />
        <Route
          path="/admin/customers/:id/quotes/new"
          element={<AdminQuoteNew />}
        />
        <Route
          path="/admin/customers/:id/quotes/:quoteId"
          element={<AdminQuoteRecord />}
        />

        {/* Quotes */}
        <Route path="/admin/quotes" element={<AdminQuotes />} />
        <Route path="/admin/quotes/:quoteId" element={<AdminQuoteRecord />} />

        {/* Orders & Invoices */}
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/orders/:id" element={<AdminOrderRecord />} /> {/* ✅ New Route */}
        <Route path="/admin/invoices" element={<AdminInvoices />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
