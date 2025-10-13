import { Link } from "react-router-dom";

export default function MaintenanceCompare() {
  const features = [
    { name: "Weekly Backups", essential: "✅", performance: "✅", total: "✅" },
    { name: "Core / Plugin / CMS Updates", essential: "✅", performance: "✅", total: "✅" },
    { name: "Uptime & Security Monitoring", essential: "✅", performance: "✅", total: "✅" },
    { name: "Malware / Vulnerability Scans", essential: "✅", performance: "✅", total: "✅" },
    { name: "Speed / Performance Checks", essential: "❌", performance: "✅", total: "✅" },
    { name: "Monthly SEO / Health Audit", essential: "❌", performance: "✅", total: "✅" },
    { name: "Monthly Performance Report", essential: "❌", performance: "✅", total: "✅" },
    { name: "Content Updates (hrs/month)", essential: "❌", performance: "1 hr", total: "3 hrs" },
    { name: "Priority Support", essential: "❌", performance: "48h", total: "24h" },
    { name: "Emergency Fixes Included", essential: "❌", performance: "Optional", total: "✅" },
    { name: "Analytics / Dashboard Access", essential: "❌", performance: "Optional", total: "✅" },
    { name: "Strategy / Review Call (quarterly)", essential: "❌", performance: "❌", total: "✅" },
  ];

  const plans = [
    {
      key: "essential",
      label: "Essential Care",
      price: "£45 / mo",
      sub: "or £420 / yr",
    },
    {
      key: "performance",
      label: "Performance Care",
      price: "£95 / mo",
      sub: "or £1,020 / yr",
    },
    {
      key: "total",
      label: "Total WebCare",
      price: "£195 / mo",
      sub: "or £2,100 / yr",
    },
  ];

  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";
  const buttonSubtle =
    "inline-block px-8 py-3 border border-white/20 text-gray-300 hover:bg-blue-700/20 rounded-xl text-sm font-medium transition-all duration-300";

  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 tracking-tight">
          Compare Website Care Plans
        </h1>

        <p className="text-center text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
          Pick the level of ongoing care that’s right for your business. All plans exclude VAT; yearly plans include a discount.
        </p>

        <p className="text-center text-gray-500 text-sm italic mb-12 max-w-2xl mx-auto">
          *Care plans are available for websites built or actively managed by PJH Web Services.*
        </p>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-white/10 rounded-2xl shadow-lg bg-slate-900/60">
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
                  <td className="p-4 text-center text-gray-100">
                    {row.essential}
                  </td>
                  <td className="p-4 text-center text-gray-100">
                    {row.performance}
                  </td>
                  <td className="p-4 text-center text-gray-100">{row.total}</td>
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
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
