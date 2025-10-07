// ============================================
// PJH Web Services — Pricing Page
// ============================================
// Displays live package data from /api/packages with contact integration.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/packages`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data.packages)
          ? data.packages
          : Array.isArray(data)
          ? data
          : data.data || [];
        setPackages(list);
      })
      .catch(() => setPackages([]));
  }, []);

  const fallback = [
    {
      name: "Starter",
      oneOff: 900,
      monthly: 60,
      features: [
        "4–6 custom pages",
        "Responsive, mobile friendly",
        "Basic SEO setup",
        "Social media integration",
        "Domain & hosting setup",
      ],
    },
    {
      name: "Business",
      oneOff: 2600,
      monthly: 140,
      features: [
        "All Starter features",
        "Booking + scheduler integration",
        "Payment / invoicing system",
        "CRM core features",
        "On-page SEO optimisations",
      ],
    },
    {
      name: "Premium",
      oneOff: 6000,
      monthly: 300,
      features: [
        "All Business features",
        "Full bespoke CRM & automations",
        "Advanced integrations & APIs",
        "Priority support & updates",
        "SLA / maintenance agreement",
      ],
    },
  ];

  const display =
    packages.length > 0
      ? packages.map((p) => ({
          name: p.name,
          oneOff: Number(p.price_oneoff),
          monthly: Number(p.price_monthly),
          features: p.features || [],
        }))
      : fallback;

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light py-20 px-6 text-center font-outfit">
      {/* === PAGE TITLE === */}
      <h1 className="text-4xl font-bold text-pjh-blue mb-6">
        Website Packages & Pricing
      </h1>
      <p className="max-w-3xl mx-auto text-pjh-muted mb-14 leading-relaxed">
        Choose a package that suits your business needs — whether a single
        build or a flexible monthly plan with ongoing support.
      </p>

      {/* === PACKAGE CARDS === */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {display.map((pkg, idx) => (
          <div
            key={idx}
            className="bg-pjh-slate rounded-2xl p-8 shadow-xl border border-white/10 hover:border-pjh-blue/50 transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-pjh-blue mb-2">
              {pkg.name}
            </h2>
            <p className="text-pjh-muted mb-4 text-sm">
              {pkg.features.length} core features
            </p>

            <p className="text-3xl font-bold mb-1">£{pkg.oneOff}</p>
            {pkg.monthly > 0 && (
              <p className="text-sm text-pjh-muted mb-6">
                or £{pkg.monthly}/month
              </p>
            )}

            <ul className="text-left space-y-2 text-sm text-pjh-light/90 mb-8">
              {pkg.features.map((f, i) => (
                <li key={i}>✔ {f}</li>
              ))}
            </ul>

            <Link
              to={`/contact?package=${encodeURIComponent(pkg.name)}&price=${pkg.oneOff}&monthly=${pkg.monthly}`}
              className="btn-accent w-full block text-center"
            >
              Enquire about {pkg.name}
            </Link>
          </div>
        ))}
      </div>

      {/* === BACK TO HOME LINK === */}
      <div className="mt-16 text-center">
        <Link
          to="/"
          className="inline-block text-pjh-blue hover:text-pjh-cyan transition font-semibold text-lg"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
