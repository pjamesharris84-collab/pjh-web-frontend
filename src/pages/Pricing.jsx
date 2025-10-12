/**
 * ============================================================
 * PJH Web Services — Pricing Redirect / Context Page (2025)
 * ============================================================
 * Purpose:
 *   • Removes redundant pricing duplication
 *   • Redirects visitors to the homepage (#packages)
 *   • Maintains SEO continuity and backlink safety
 *   • Styled to blend seamlessly with PJH’s blue/white theme
 * ============================================================
 */

import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  // Smooth redirect to homepage packages section
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/#packages");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center text-white px-6 py-20 font-outfit">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-400 mb-6">
        We’ve moved our pricing!
      </h1>

      <p className="max-w-2xl text-gray-400 leading-relaxed mb-10">
        Our full package details and transparent pricing can now be viewed
        directly on our homepage. <br />
        You’ll be redirected in just a moment.
      </p>

      <Link
        to="/#packages"
        className="inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30"
      >
        View Packages →
      </Link>

      <p className="text-sm text-gray-500 mt-10">
        If you’re not redirected automatically, click the button above.
      </p>
    </main>
  );
}
