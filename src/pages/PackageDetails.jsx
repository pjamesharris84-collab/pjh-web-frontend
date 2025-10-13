/**
 * ============================================================
 * PJH Web Services — Package Details Page (Enhanced 2025)
 * ============================================================
 * Works with seeded packages (Starter, Business, Premium)
 *  • Fetches /api/packages/:id or /api/packages/slug/:slug
 *  • Displays name, tagline, pricing, features, and full description
 *  • Includes local fallback data if API unavailable
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import CookieBanner from "../components/CookieBanner";

export default function PackageDetails() {
  const { id } = useParams(); // can be numeric ID or slug
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ------------------------------------------------------------
     Fetch package from backend
  ------------------------------------------------------------ */
  useEffect(() => {
    async function fetchPackage() {
      setLoading(true);
      setError(null);
      try {
        const apiBase = import.meta.env.VITE_API_URL;
        const isNumeric = /^\d+$/.test(id);

        const endpoint = isNumeric
          ? `${apiBase}/api/packages/${id}`
          : `${apiBase}/api/packages/slug/${encodeURIComponent(id)}`;

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();

        // Backend structure = { success: true, data: [...] or data: {...} }
        const found =
          Array.isArray(data.data) && data.data.length > 0
            ? data.data[0]
            : data.data || data.package || data;

        if (!found || !found.name) throw new Error("Package not found");
        setPkg(found);
      } catch (err) {
        console.error("❌ Error loading package:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPackage();
  }, [id]);

  /* ------------------------------------------------------------
     Local fallback (for offline or failed API)
  ------------------------------------------------------------ */
  const fallbackPackages = {
    starter: {
      name: "Starter",
      tagline: "Perfect for local sole traders and small businesses",
      price_oneoff: 900,
      price_monthly: 60,
      term_months: 24,
      description: `
        The Starter package is perfect for tradesmen, small shops, and local sole traders
        who simply want a professional, modern website that works. No buzzwords, no gimmicks —
        just clean design, real SEO, and a trusted online presence that helps customers find you.

        We cut through the marketing noise that tells small businesses they “need a funnel”,
        “need daily ads”, or “need to go viral”. You don’t. You need a reliable,
        Google-friendly website that actually converts local enquiries into paying customers —
        and we deliver exactly that.
      `,
      features: [
        "5-page custom-built website",
        "Mobile responsive and lightning-fast performance",
        "Local SEO setup and Google optimisation",
        "Integrated contact form, maps, and social links",
        "Domain registration and managed hosting",
        "Ongoing updates available via WebCare",
      ],
    },
    business: {
      name: "Business",
      tagline: "For growing companies ready to scale",
      price_oneoff: 2600,
      price_monthly: 140,
      term_months: 24,
      description: `
        The Business package is built for companies that are outgrowing “just a website”.
        You need proper tools — quoting, booking, tracking, and automating the things
        that eat into your time. We build custom CRM systems that fit your business
        (not the other way around) so you can manage everything from one place.

        While everyone else is chasing social-media trends and overcomplicated marketing,
        we focus on what actually builds your business: visibility, credibility, and trust.
        Our job is to handle the digital side — so you can keep doing what you do best.
      `,
      features: [
        "All Starter features",
        "Custom CRM core with quoting, booking & invoicing",
        "Online scheduling system with automated emails",
        "Advanced on-page SEO & Google Business integration",
        "Optional blog and content modules",
        "Real-time dashboard & reporting tools",
      ],
    },
    premium: {
      name: "Premium",
      tagline: "Complete digital systems — websites, CRMs, automation & care",
      price_oneoff: 6000,
      price_monthly: 300,
      term_months: 24,
      description: `
        The Premium package is for serious operators who want their digital presence
        to do more than look good — it should work hard. This is a complete custom
        business platform built around your daily operations: from first enquiry
        to payment, automation, and follow-up.

        We combine design, CRM, automation, and ongoing strategy under one roof.
        No outsourcing, no “we’ll get back to you next week” support.
        Just a single team that keeps your system secure, compliant, and up-to-date —
        so you don’t have to.
      `,
      features: [
        "All Business features",
        "Bespoke CRM and workflow automation suite",
        "Online payments and recurring billing",
        "Customer portals with secure login",
        "Automated email & SMS notifications",
        "Priority support and active maintenance",
      ],
    },
  };

  const slug = (id || "").toLowerCase();
  const displayPkg =
    pkg ||
    fallbackPackages[slug] ||
    Object.values(fallbackPackages).find(
      (p) => p.name.toLowerCase() === slug
    );

  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";

  /* ------------------------------------------------------------
     Render
  ------------------------------------------------------------ */
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col font-inter">
      <SEO
        title={
          displayPkg
            ? `${displayPkg.name} Package | PJH Web Services`
            : "Loading Package | PJH Web Services"
        }
        description={
          displayPkg
            ? `Full details for the ${displayPkg.name} package — ${displayPkg.tagline}`
            : "View package details from PJH Web Services."
        }
        url={`https://www.pjhwebservices.co.uk/packages/${id}`}
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <Navbar />

      <main className="flex-grow py-24 px-6">
        {loading ? (
          <div className="text-center text-gray-400 animate-pulse">
            Loading package details…
          </div>
        ) : error && !displayPkg ? (
          <div className="text-center text-red-400">
            <p className="text-lg font-semibold mb-4">Unable to load package</p>
            <p className="mb-8 text-gray-400">{error}</p>
            <Link to="/" className={buttonOutline}>
              ← Back to Home
            </Link>
          </div>
        ) : (
          displayPkg && (
            <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-3xl border border-white/10 p-10 shadow-lg shadow-blue-900/10">
              <h1 className="text-4xl font-bold text-blue-400 mb-3">
                {displayPkg.name}
              </h1>
              <p className="text-gray-400 mb-6 text-lg">
                {displayPkg.tagline}
              </p>

              <div className="text-gray-300 text-lg mb-10">
                <p className="font-semibold">
                  £{displayPkg.price_oneoff?.toLocaleString()} one-off setup
                </p>
                {displayPkg.price_monthly && (
                  <p>
                    or £{displayPkg.price_monthly?.toLocaleString()}/month for{" "}
                    {displayPkg.term_months || 24} months
                  </p>
                )}
              </div>

              {displayPkg.description && (
                <div className="text-gray-400 mb-10 leading-relaxed whitespace-pre-line">
                  {displayPkg.description.trim()}
                </div>
              )}

              <h2 className="text-2xl font-semibold text-blue-300 mb-4">
                What’s Included
              </h2>
              <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
                {(displayPkg.features || []).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className={buttonPrimary}>
                  Enquire Now
                </Link>
                <Link to="/" className={buttonOutline}>
                  Back to Packages
                </Link>
              </div>
            </div>
          )
        )}
      </main>

      <CookieBanner />

      <footer className="border-t border-white/10 py-10 text-center text-sm text-gray-500 bg-slate-950">
        <p>
          © {new Date().getFullYear()} PJH Web Services — All rights reserved.
        </p>
        <div className="flex justify-center flex-wrap gap-4 text-xs uppercase tracking-wide mt-3">
          <Link to="/legal/privacy" className="hover:text-blue-400 transition">
            Privacy
          </Link>
          <Link to="/legal/cookies" className="hover:text-blue-400 transition">
            Cookies
          </Link>
          <Link to="/legal/terms" className="hover:text-blue-400 transition">
            Terms
          </Link>
          <Link
            to="/legal/direct-debit-policy"
            className="hover:text-blue-400 transition"
          >
            Direct Debit
          </Link>
          <Link to="/security" className="hover:text-blue-400 transition">
            Security
          </Link>
        </div>
      </footer>
    </div>
  );
}
