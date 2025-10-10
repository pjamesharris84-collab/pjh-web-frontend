/**
 * ============================================================
 * PJH Web Services — Pricing Page (2025)
 * ============================================================
 * Unified with blue/white premium design system.
 * Consistent card layout, button styling, and gradient backdrop.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/api/packages`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.packages)
          ? data.packages
          : [];
        setPackages(list);
      })
      .catch(() => setPackages([]));
  }, []);

  const display = packages.length
    ? packages.map((p) => ({
        id: p.id,
        name: p.name,
        tagline: p.tagline,
        oneOff: p.price_oneoff ? Number(p.price_oneoff) : null,
        monthly: p.price_monthly ? Number(p.price_monthly) : null,
        term: p.term_months ? Number(p.term_months) : null,
        features: p.features || [],
        guards: p.pricing_guardrails || {},
      }))
    : [
        // fallback (only if API returns nothing)
        {
          name: "Starter",
          tagline: "Perfect for small business websites",
          oneOff: 900,
          monthly: 60,
          term: 24,
          features: [
            "4–6 pages",
            "Responsive design",
            "Basic SEO",
            "Social links",
            "Hosting setup",
          ],
          guards: { require_deposit_months: 1, ownership_until_paid: true },
        },
        {
          name: "Business",
          tagline: "Automation & CRM essentials",
          oneOff: 2600,
          monthly: 140,
          term: 24,
          features: [
            "Starter features",
            "Bookings",
            "Invoicing",
            "CRM core",
            "On-page SEO",
          ],
          guards: { require_deposit_months: 1, ownership_until_paid: true },
        },
        {
          name: "Premium",
          tagline: "Full bespoke build + integrations",
          oneOff: 6000,
          monthly: 300,
          term: 24,
          features: [
            "Business features",
            "Automations",
            "Custom APIs",
            "Priority support",
            "SLA",
          ],
          guards: { require_deposit_months: 1, ownership_until_paid: true },
        },
      ];

  // Unified button styles
  const buttonPrimary =
    "inline-block w-full text-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block text-xs px-4 py-2 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-6 font-outfit">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-400 mb-4">
          Website Packages & Pricing
        </h1>
        <p className="max-w-3xl mx-auto text-gray-400 leading-relaxed">
          Choose a package that fits your goals. Pay once, or spread the cost
          monthly with the first month upfront.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {display.map((pkg, idx) => {
          const showMonthly = pkg.monthly && pkg.monthly > 0;
          const depositMonths = pkg.guards?.require_deposit_months ?? 1;
          const ownershipNote = pkg.guards?.ownership_until_paid !== false;

          return (
            <div
              key={idx}
              className="bg-slate-900/70 rounded-2xl p-8 border border-white/10 shadow-xl backdrop-blur-sm hover:border-blue-600 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-blue-400">
                    {pkg.name}
                  </h2>
                  {pkg.tagline && (
                    <p className="text-gray-400 text-sm mt-1">{pkg.tagline}</p>
                  )}
                </div>
                {showMonthly && (
                  <span className="text-[10px] uppercase bg-blue-900/30 text-blue-300 px-2 py-1 rounded-md tracking-wide">
                    First {depositMonths} month
                    {depositMonths > 1 ? "s" : ""} upfront
                  </span>
                )}
              </div>

              {/* Pricing */}
              <div className="mb-6">
                {pkg.oneOff !== null && (
                  <p className="text-3xl font-bold text-white">
                    £{pkg.oneOff.toLocaleString()}
                  </p>
                )}
                {showMonthly && (
                  <p className="text-sm text-gray-400 mt-1">
                    or £{pkg.monthly}/month{" "}
                    {pkg.term ? `(min ${pkg.term} months)` : ""}
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2 text-sm text-gray-300 mb-6">
                {pkg.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>

              {/* Notes */}
              {ownershipNote && showMonthly && (
                <p className="text-xs text-gray-500 mb-5">
                  Ownership transfers upon final payment. Early exit fees may
                  apply.
                </p>
              )}

              {/* CTAs */}
              <div className="flex gap-2">
                <Link
                  to={`/contact?package=${encodeURIComponent(
                    pkg.name
                  )}&price=${pkg.oneOff ?? ""}&monthly=${pkg.monthly ?? ""}`}
                  className={buttonPrimary}
                >
                  Enquire about {pkg.name}
                </Link>
                <Link to="/legal/monthly-terms" className={buttonOutline}>
                  Terms
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-20 text-center">
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30"
        >
          🏠 Back to Home
        </Link>
      </div>
    </main>
  );
}
