/**
 * ============================================================
 * PJH Web Services — Package Details Page (Local-Focused, 2025)
 * ============================================================
 * Displays full details for an individual package.
 * Updated messaging:
 *   • Tailored for local businesses
 *   • Highlights clarity, trust & ongoing partnership
 *   • Reinforces “we handle the tech so you don’t have to”
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function PackageDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  useEffect(() => {
    async function fetchPackage() {
      try {
        const res = await fetch(`${API_BASE}/api/packages`);
        const data = await res.json();
        const found = (data.data || data.packages || []).find(
          (p) => p.name.toLowerCase() === name.toLowerCase()
        );
        if (!found) navigate("/pricing");
        setPkg(found);
      } catch (err) {
        console.error("❌ Error loading package:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPackage();
  }, [name]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-blue-400">
        <p className="animate-pulse text-lg">Loading package details...</p>
      </div>
    );

  if (!pkg)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-gray-300 text-center px-6">
        <p className="text-lg mb-6">Package not found.</p>
        <Link
          to="/pricing"
          className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold transition-all duration-300"
        >
          ← Back to Pricing
        </Link>
      </div>
    );

  // Unified button styles
  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-medium transition-all duration-300";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-2xl p-10 border border-white/10 shadow-xl backdrop-blur-sm">
        {/* Header */}
        <div className="mb-10 border-b border-white/10 pb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2">
            {pkg.name} Package
          </h1>
          <p className="text-gray-400 text-lg">
            {pkg.tagline ||
              "Smart, scalable web solutions designed for local businesses who want to grow online without the jargon."}
          </p>
        </div>

        {/* Pricing + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <p className="text-4xl font-bold text-white">£{pkg.price_oneoff}</p>
            {pkg.price_monthly > 0 && (
              <p className="text-gray-400 text-sm mt-1">
                or £{pkg.price_monthly}/month (min {pkg.term_months} months)
              </p>
            )}
          </div>

          <Link
            to={`/contact?package=${encodeURIComponent(
              pkg.name
            )}&price=${pkg.price_oneoff}&monthly=${pkg.price_monthly}`}
            className={buttonPrimary}
          >
            Enquire About This Package
          </Link>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-10">
          <h2 className="text-2xl font-semibold text-blue-400">
            What’s Included
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            {pkg.features?.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        {/* Local business reassurance */}
        <div className="space-y-5 mb-10 text-gray-400 leading-relaxed border-t border-white/10 pt-6">
          <h3 className="text-xl font-semibold text-blue-400">
            Designed for Local Success
          </h3>
          <p>
            We know how confusing the digital world can feel — one day you’re
            told websites are dead, the next you’re told you need AI, funnels,
            or endless subscriptions. PJH Web Services helps you cut through
            that noise. Every package focuses on what actually works for{" "}
            <span className="text-blue-300 font-medium">
              real Suffolk and UK businesses
            </span>{" "}
            — fast, secure websites that attract genuine customers.
          </p>
          <p>
            We stay ahead of design trends, Google changes, and security
            updates, so you can focus on running your business while we handle
            the rest.
          </p>
        </div>

        {/* Terms & Info */}
        <div className="space-y-3 text-sm text-gray-400 border-t border-white/10 pt-6">
          <p>
            💳 <strong className="text-blue-300">Pay Monthly Option:</strong>{" "}
            The first month is due upfront. Minimum term:{" "}
            {pkg.term_months || 24} months. Early exit fee applies.
          </p>
          <p>
            📄 Read full{" "}
            <Link
              to="/legal/monthly-terms"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Monthly Plan Terms
            </Link>
            .
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-between items-center mt-10 gap-4 border-t border-white/10 pt-6">
          <Link to="/pricing" className={buttonOutline}>
            ← Back to All Packages
          </Link>
          <Link to="/" className={buttonOutline}>
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
