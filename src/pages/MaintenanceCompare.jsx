/**
 * ============================================================
 * PJH Web Services — Maintenance Plan Comparison (VAT 2025)
 * ============================================================
 * Updated with East Anglia market-aligned pricing:
 *  • Essential Care £45 + VAT (£54 inc)
 *  • WebCare Plus £85 + VAT (£102 inc)
 *  • WebCare Premium £145 + VAT (£174 inc)
 * Annual billing includes a small discount.
 * ============================================================
 */

import { Link } from "react-router-dom";

export default function MaintenanceCompare() {
  const renderDual = (net) => (
    <>
      £{net.toLocaleString()} + VAT (£{(net * 1.2).toLocaleString()} inc. VAT)
    </>
  );

  const features = [
    { name: "Daily Backups", essential: "✅", plus: "✅", premium: "✅" },
    { name: "Core / Plugin / CMS Updates", essential: "✅", plus: "✅", premium: "✅" },
    { name: "Uptime & Security Monitoring", essential: "✅", plus: "✅", premium: "✅" },
    { name: "Malware / Vulnerability Scans", essential: "✅", plus: "✅", premium: "✅" },
    { name: "Speed / Performance Checks", essential: "❌", plus: "✅", premium: "✅" },
    { name: "Monthly SEO / Health Audit", essential: "❌", plus: "✅", premium: "✅" },
    { name: "Monthly Performance Report", essential: "❌", plus: "✅", premium: "✅" },
    { name: "Content Updates (hrs / month)", essential: "❌", plus: "1 hr", premium: "3 hrs" },
    { name: "Priority Support Response", essential: "❌", plus: "Same Day", premium: "24 Hours" },
    { name: "Emergency Fixes Included", essential: "❌", plus: "Optional", premium: "✅" },
    { name: "Analytics / Dashboard Access", essential: "❌", plus: "Optional", premium: "✅" },
    { name: "Quarterly Strategy Review Call", essential: "❌", plus: "❌", premium: "✅" },
  ];

  const plans = [
    {
      key: "essential",
      label: "Essential Care",
      price: renderDual(45),
      sub: "or £420 + VAT / yr (£504 inc. VAT)",
    },
    {
      key: "plus",
      label: "WebCare Plus",
      price: renderDual(85),
      sub: "or £900 + VAT / yr (£1,080 inc. VAT)",
    },
    {
      key: "premium",
      label: "WebCare Premium",
      price: renderDual(145),
      sub: "or £1,560 + VAT / yr (£1,872 inc. VAT)",
    },
  ];

  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";
  const buttonSubtle =
    "inline-block px-8 py-3 border border-white/20 text-gray-300 hover:bg-blue-700/20 rounded-xl text-sm font-medium transition-all duration-300";

  return (
    <main
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-4 font-inter"
      role="main"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl font-bold text-center mb-6 tracking-tight text-blue-400"
          id="comparison-heading"
        >
          Compare Website Care Plans
        </h1>

        <p
          className="text-center text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed"
          aria-describedby="comparison-heading"
        >
          Choose the level of ongoing website care that fits your business.  
          Prices shown are exclusive of VAT, with inclusive figures displayed
          for clarity. Annual billing includes a small discount.
        </p>

        <p className="text-center text-gray-500 text-sm italic mb-12 max-w-2xl mx-auto">
          *Care plans are available only for websites built or actively managed by PJH Web Services.*
        </p>

        {/* Comparison Table */}
        <div
          className="overflow-x-auto border border-white/10 rounded-2xl shadow-lg bg-slate-900/60"
          role="region"
          aria-labelledby="comparison-heading"
        >
          <table
            className="w-full border-collapse text-sm sm:text-base"
            aria-label="Website Care Plan Comparison Table"
          >
            <thead className="bg-slate-900/80 border-b border-white/10">
              <tr>
                <th
                  scope="col"
                  className="p-4 text-left text-gray-300 font-semibold uppercase tracking-wide"
                >
                  Feature
                </th>
                {plans.map((p) => (
                  <th
                    key={p.key}
                    scope="col"
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
                  <td className="p-4 text-center text-gray-100">{row.plus}</td>
                  <td className="p-4 text-center text-gray-100">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTAs */}
        <div className="text-center mt-16 flex flex-wrap justify-center gap-4">
          <Link to="/maintenance" className={buttonPrimary}>
            View Plans
          </Link>
          <Link to="/contact" className={buttonOutline}>
            Get Started
          </Link>
          <Link to="/" className={buttonSubtle}>
            Back to Home
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-8 text-center">
          © {new Date().getFullYear()} PJH Web Services — VAT No. GB503 3476 17.  
          Prices shown are exclusive of VAT, with inclusive figures displayed for clarity.
        </p>
      </div>
    </main>
  );
}
