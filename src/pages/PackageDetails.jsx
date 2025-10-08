import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function PackageDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

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
      <div className="min-h-screen flex items-center justify-center bg-pjh-charcoal text-pjh-blue font-outfit">
        <p>Loading package details...</p>
      </div>
    );

  if (!pkg)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pjh-charcoal text-pjh-light font-outfit">
        <p>Package not found.</p>
        <Link to="/pricing" className="btn-accent mt-4">
          ← Back to Pricing
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light py-20 px-6 font-outfit">
      <div className="max-w-4xl mx-auto bg-pjh-slate/40 rounded-2xl p-10 border border-white/10 shadow-lg">
        <h1 className="text-4xl font-bold text-pjh-blue mb-2">{pkg.name} Package</h1>
        <p className="text-pjh-muted mb-6">{pkg.tagline}</p>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <p className="text-4xl font-bold text-pjh-light">£{pkg.price_oneoff}</p>
            {pkg.price_monthly > 0 && (
              <p className="text-pjh-muted text-sm mt-1">
                or £{pkg.price_monthly}/month (min {pkg.term_months} months)
              </p>
            )}
          </div>
          <Link
            to={`/contact?package=${encodeURIComponent(pkg.name)}&price=${pkg.price_oneoff}&monthly=${pkg.price_monthly}`}
            className="btn-accent mt-6 sm:mt-0"
          >
            Enquire about this Package
          </Link>
        </div>

        <div className="space-y-3 mb-8">
          <h2 className="text-2xl font-semibold text-pjh-blue">Included Features</h2>
          <ul className="list-disc ml-5 space-y-2 text-pjh-light/90">
            {pkg.features?.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>

        <div className="space-y-3 text-sm text-pjh-muted border-t border-white/10 pt-6">
          <p>
            💳 <strong>Pay Monthly Option:</strong> The first month is due upfront. Minimum term:{" "}
            {pkg.term_months || 24} months. Early exit fee applies.
          </p>
          <p>
            📄 Read full{" "}
            <Link to="/legal/monthly-terms" className="text-pjh-blue underline hover:text-pjh-cyan">
              Monthly Plan Terms
            </Link>
            .
          </p>
        </div>

        <div className="mt-10">
          <Link to="/pricing" className="text-pjh-blue hover:text-pjh-cyan transition">
            ← Back to All Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
