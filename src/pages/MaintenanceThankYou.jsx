/**
 * ============================================================
 * PJH Web Services — Maintenance Thank You Page (2025)
 * ============================================================
 * Displays confirmation after a maintenance signup or enquiry.
 * Unified with blue/white premium design system.
 * Includes Back to Home and View Plans buttons.
 * ============================================================
 */

import { Link } from "react-router-dom";

export default function MaintenanceThankYou() {
  // Unified button styles
  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-medium transition-all duration-300";

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white text-center px-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-5xl font-bold mb-6 tracking-tight text-blue-400">
          🎉 Thank You!
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed mb-12">
          Your subscription or enquiry has been received.  
          A member of the PJH Web Services team will contact you shortly  
          to finalise your plan and activate your coverage.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/" className={buttonPrimary}>
            🏠 Back to Home
          </Link>
          <Link to="/maintenance" className={buttonOutline}>
            View Maintenance Plans →
          </Link>
        </div>
      </div>
    </main>
  );
}
