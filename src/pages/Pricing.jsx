import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/api/packages`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data?.data) ? data.data
          : Array.isArray(data?.packages) ? data.packages
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
          features: ["4–6 pages", "Responsive design", "Basic SEO", "Social links", "Hosting setup"],
          guards: { require_deposit_months: 1, ownership_until_paid: true },
        },
        {
          name: "Business",
          tagline: "Automation & CRM essentials",
          oneOff: 2600,
          monthly: 140,
          term: 24,
          features: ["Starter features", "Bookings", "Invoicing", "CRM core", "On-page SEO"],
          guards: { require_deposit_months: 1, ownership_until_paid: true },
        },
        {
          name: "Premium",
          tagline: "Full bespoke build + integrations",
          oneOff: 6000,
          monthly: 300,
          term: 24,
          features: ["Business features", "Automations", "Custom APIs", "Priority support", "SLA"],
          guards: { require_deposit_months: 1, ownership_until_paid: true },
        },
      ];

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light py-20 px-6 text-center font-outfit">
      <h1 className="text-4xl font-bold text-pjh-blue mb-3">Website Packages & Pricing</h1>
      <p className="max-w-3xl mx-auto text-pjh-muted mb-12">
        Choose a package that fits your goals. Pay once, or spread the cost monthly with the first month upfront.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {display.map((pkg, idx) => {
          const showMonthly = pkg.monthly && pkg.monthly > 0;
          const depositMonths = pkg.guards?.require_deposit_months ?? 1;
          const ownershipNote = pkg.guards?.ownership_until_paid !== false;

          return (
            <div key={idx} className="bg-pjh-slate rounded-2xl p-8 shadow-xl border border-white/10 hover:border-pjh-blue/50 transition duration-300 text-left">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-pjh-blue">{pkg.name}</h2>
                  {pkg.tagline && <p className="text-pjh-muted text-sm mt-1">{pkg.tagline}</p>}
                </div>
                {showMonthly && (
                  <span className="text-xs uppercase bg-pjh-blue/20 text-pjh-blue px-2 py-1 rounded">
                    First {depositMonths} month{depositMonths > 1 ? "s" : ""} upfront
                  </span>
                )}
              </div>

              <div className="mt-5 mb-4">
                {pkg.oneOff !== null && (
                  <div className="text-3xl font-bold">£{pkg.oneOff}</div>
                )}
                {showMonthly && (
                  <div className="text-sm text-pjh-muted mt-1">
                    or £{pkg.monthly}/month {pkg.term ? `(min ${pkg.term} months)` : ""}
                  </div>
                )}
              </div>

              <ul className="space-y-2 text-sm text-pjh-light/90 mb-6">
                {pkg.features.map((f, i) => <li key={i}>✔ {f}</li>)}
              </ul>

              {ownershipNote && showMonthly && (
                <p className="text-xs text-pjh-muted mb-4">
                  Ownership transfers upon final payment. Early exit fees may apply.
                </p>
              )}

              <div className="flex gap-2">
                <Link
                  to={`/contact?package=${encodeURIComponent(pkg.name)}&price=${pkg.oneOff ?? ""}&monthly=${pkg.monthly ?? ""}`}
                  className="btn-accent flex-1 text-center"
                >
                  Enquire about {pkg.name}
                </Link>
                <Link
                  to="/legal/monthly-terms"
                  className="btn-secondary text-xs px-3"
                >
                  Monthly Terms
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Link to="/" className="inline-block text-pjh-blue hover:text-pjh-cyan transition font-semibold text-lg">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
