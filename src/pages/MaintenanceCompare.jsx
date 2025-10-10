/**
 * ============================================================
 * PJH Web Services — Maintenance Plan Comparison Page (2025)
 * ============================================================
 * Updated to use unified blue/white premium design system.
 * Matches homepage, navbar, and maintenance landing styles.
 * ============================================================
 */

import { Link } from "react-router-dom";

export default function MaintenanceCompare() {
  const features = [
    { name: "Weekly Backups", essential: "✅", performance: "✅", total: "✅" },
    { name: "Plugin / CMS Updates", essential: "✅", performance: "✅", total: "✅" },
    { name: "Uptime & Security Monitoring", essential: "✅", performance: "✅", total: "✅" },
    { name: "Malware Scans", essential: "✅", performance: "✅", total: "✅" },
    { name: "Website Speed Checks", essential: "❌", performance: "✅", total: "✅" },
    { name: "Monthly SEO Health Check", essential: "❌", performance: "✅", total: "✅" },
    { name: "Monthly Performance Report", essential: "❌", performance: "✅", total: "✅" },
    { name: "Content Edits (per month)", essential: "❌", performance: "1 hr", total: "3 hrs" },
    { name: "Priority Support", essential: "❌", performance: "48 h", total: "24 h" },
    { name: "Emergency Fixes", essential: "❌", performance: "Optional (£50)", total: "Included" },
    { name: "Analytics Dashboard", essential: "❌", performance: "Optional", total: "✅" },
    { name: "Strategy Call (Quarterly)", essential: "❌", performance: "❌", total: "✅" },
  ];

  const plans = [
    {
      key: "essential",
      label: "Essential Care",
      price: "£45 / mo (ex VAT)",
      sub: "or £420 / yr (£35 eq.)",
    },
    {
      key: "performance",
      label: "Performance Care",
      price: "£95 / mo (ex VAT)",
      sub: "or £1 020 / yr (£85 eq.)",
    },
    {
      key: "total",
      label: "Total WebCare",
      price: "£195 / mo (ex VAT)",
      sub: "or £2 100 / yr (£175 eq.)",
    },
  ];

  // Unified button styles
  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";
  const buttonSubtle =
    "inline-block px-8 py-3 border border-white/20 text-gray-300 hover:bg-blue-700/20 rounded-xl text-sm font-medium transition-all duration-300";

  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* === Heading === */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 tracking-tight">
          Compare Maintenance Plans
        </h1>

        <p className="text-center text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
          Choose the level of ongoing care that fits your business.  
          All prices ex VAT · annual payments include ~20% discount.
        </p>

        {/* === Eligibility Disclaimer === */}
        <p className="text-center text-gray-500 text-sm italic mb-12 max-w-2xl mx-auto">
          *WebCare Maintenance Plans are exclusive add-ons for websites built or actively managed by PJH Web Services.*
        </p>

        {/* === Comparison Table === */}
        <div className="overflow-x-auto border border-white/10 rounded-2xl shadow-lg bg-slate-900/60 backdrop-blur-sm">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead className="bg-slate-900/80 border-b border-white/10">
              <tr>
                <th className="p-4 text-left text-gray-300 font-semibold uppercase tracking-wide">
                  Feature
                </th>
                {plans.map((p) => (
                  <th
                    key={p.key}
                    className="p-4 text-center font-semibold text-blue-400"
                  >
                    {p.label}
                    <div className="text-gray-300 text-sm mt-1">{p.price}</div>
                    <div className="text-gray-500 text-xs">{p.sub}</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {features.map((row, i) => (
                <tr
                  key={i}
                  className={`border-t border-white/5 ${
                    i % 2 === 0 ? "bg-slate-950/40" : "bg-slate-900/40"
                  }`}
                >
                  <td className="p-4 font-medium text-gray-300">{row.name}</td>
                  <td className="p-4 text-center text-gray-100">{row.essential}</td>
                  <td className="p-4 text-center text-gray-100">{row.performance}</td>
                  <td className="p-4 text-center text-gray-100">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* === CTA Buttons === */}
        <div className="text-center mt-16 flex flex-wrap justify-center gap-4">
          <Link to="/maintenance" className={buttonPrimary}>
            Back to Overview
          </Link>
          <Link to="/contact" className={buttonOutline}>
            Get Started
          </Link>
          <Link to="/" className={buttonSubtle}>
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
