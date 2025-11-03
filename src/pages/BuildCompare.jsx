/**
 * ============================================================
 * PJH Web Services — Website Build Packages Comparison (2025)
 * ============================================================
 * Compare Essential, Starter, Business, and Premium packages
 * side by side with clear VAT transparency and accessibility.
 * ============================================================
 */

import { Link } from "react-router-dom";

export default function BuildCompare() {
  const renderDual = (net) => (
    <>
      £{net.toLocaleString()} + VAT (£{(net * 1.2).toLocaleString()} inc. VAT)
    </>
  );

  const packages = [
    { key: "essential", label: "Essential", price: renderDual(495), sub: "3-page starter site" },
    { key: "starter", label: "Starter", price: renderDual(795), sub: "5-page bespoke design" },
    { key: "business", label: "Business", price: renderDual(1495), sub: "CRM & quoting tools" },
    { key: "premium", label: "Premium", price: renderDual(2950), sub: "Full automation suite" },
  ];

  const features = [
    { name: "Pages Included", essential: "3", starter: "5", business: "10+", premium: "Unlimited" },
    { name: "Hosting (12 Months)", essential: "✅", starter: "✅", business: "✅", premium: "✅" },
    { name: "SEO Setup", essential: "Basic", starter: "Standard", business: "Enhanced", premium: "Advanced" },
    { name: "Custom CRM / Dashboard", essential: "❌", starter: "❌", business: "✅", premium: "✅" },
    { name: "Online Forms & Enquiries", essential: "✅", starter: "✅", business: "✅", premium: "✅" },
    { name: "Automation & Integrations", essential: "❌", starter: "❌", business: "Partial", premium: "Full" },
    { name: "Google Business Setup", essential: "✅", starter: "✅", business: "✅", premium: "✅" },
    { name: "Social Media Setup", essential: "Basic", starter: "Standard", business: "Full", premium: "Full + Strategy" },
    { name: "Initial WebCare Maintenance", essential: "Optional", starter: "3 Months", business: "6 Months", premium: "12 Months" },
    { name: "Support & Revisions", essential: "Email Only", starter: "Priority Email", business: "Email + Phone", premium: "Priority Phone & Email" },
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-blue-400">
          Compare Website Build Packages
        </h1>

        <p className="text-center text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
          See exactly what’s included in each of our website build tiers — from
          Essential starter sites to Premium automation suites. Prices are shown
          exclusive of VAT, with inclusive figures provided for clarity.
        </p>

        <p className="text-center text-gray-500 text-sm italic mb-12 max-w-2xl mx-auto">
          *All sites are bespoke, built by PJH Web Services for local and UK businesses.*
        </p>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-white/10 rounded-2xl shadow-lg bg-slate-900/60">
          <table className="w-full border-collapse text-sm sm:text-base" aria-label="Website Build Package Comparison Table">
            <thead className="bg-slate-900/80 border-b border-white/10">
              <tr>
                <th className="p-4 text-left text-gray-300 font-semibold uppercase tracking-wide">
                  Feature
                </th>
                {packages.map((p) => (
                  <th key={p.key} className="p-4 text-center font-semibold text-blue-400">
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
                  <td className="p-4 text-center text-gray-100">{row.starter}</td>
                  <td className="p-4 text-center text-gray-100">{row.business}</td>
                  <td className="p-4 text-center text-gray-100">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTAs */}
        <div className="text-center mt-16 flex flex-wrap justify-center gap-4">
          <Link to="/contact" className={buttonOutline}>
            Get a Quote
          </Link>
          <Link to="/" className={buttonSubtle}>
            Back to Home
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-8 text-center">
          © {new Date().getFullYear()} PJH Web Services — VAT No. GB503 3476 17.  
          Prices shown are exclusive of VAT with inclusive figures displayed for clarity.
        </p>
      </div>
    </main>
  );
}
