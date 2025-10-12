/**
 * ============================================================
 * PJH Web Services — Pricing Page (2025 Premium Version)
 * ============================================================
 *  • Designed for clarity, conversion & trust
 *  • Detailed package breakdowns for local businesses
 *  • Blue/white premium design system
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
        term: p.term_months ? Number(p.term_months) : 24,
        features: p.features || [],
        guards: p.pricing_guardrails || {},
      }))
    : [
        {
          name: "Starter",
          tagline: "Perfect for small local businesses taking their first step online",
          oneOff: 900,
          monthly: 60,
          term: 24,
          features: [
            "Up to 6 professionally designed pages",
            "Responsive design (mobile & tablet friendly)",
            "Basic SEO setup and keyword targeting",
            "Custom contact form and social media links",
            "Domain and hosting setup assistance",
            "Ongoing support options available",
          ],
          guards: { require_deposit_months: 1, ownership_until_paid: true },
          description:
            "Ideal for small trades, sole traders, and local businesses who need a professional online presence that’s easy to update, search-ready, and designed to convert enquiries.",
        },
        {
          name: "Business",
          tagline: "Built for growing companies ready to streamline operations",
          oneOff: 2600,
          monthly: 140,
          term: 24,
          features: [
            "Everything in the Starter package",
            "Bespoke booking & enquiry systems",
            "Integrated CRM core (track customers & leads)",
            "Invoicing system integration",
            "Enhanced SEO & Google Analytics setup",
            "Professional email configuration",
          ],
          guards: { require_deposit_months: 1, ownership_until_paid: true },
          description:
            "Perfect for established businesses that want to automate repetitive admin, manage leads efficiently, and enhance client communications — all within one unified system.",
        },
        {
          name: "Premium",
          tagline: "Fully bespoke CRM + advanced automation suite",
          oneOff: 6000,
          monthly: 300,
          term: 24,
          features: [
            "Everything in Business package",
            "Advanced workflow automations",
            "Online payments & recurring billing",
            "Bespoke integrations (e.g. Stripe, Zapier, Google Workspace)",
            "Client portal access & advanced dashboards",
            "Priority SLA support & maintenance",
          ],
          guards: { require_deposit_months: 1, ownership_until_paid: true },
          description:
            "Designed for scaling businesses that demand full automation, data insights, and high-end client portals — custom-built to fit your business model and growth plan.",
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
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-400 mb-4">
          Website Packages & Pricing
        </h1>
        <p className="max-w-3xl mx-auto text-gray-400 leading-relaxed">
          Transparent, flexible pricing designed for local businesses. Choose a
          one-off build or spread the cost monthly — every project is crafted
          around your goals, not templates.
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
              className="bg-slate-900/70 rounded-2xl p-8 border border-white/10 shadow-xl backdrop-blur-sm hover:border-blue-600 transition-all duration-300 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
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

              {/* Description */}
              {pkg.description && (
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {pkg.description}
                </p>
              )}

              {/* Features */}
              <ul className="space-y-2 text-sm text-gray-300 mb-6 border-t border-white/10 pt-4">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400">✔</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Notes */}
              {ownershipNote && showMonthly && (
                <p className="text-xs text-gray-500 mb-6">
                  Ownership transfers upon final payment. Early exit fees may
                  apply.
                </p>
              )}

              {/* CTAs */}
              <div className="mt-auto">
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
