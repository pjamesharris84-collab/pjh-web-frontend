/**
 * ============================================================
 * PJH Web Services — Package Details Page (Enhanced 2025)
 * ============================================================
 * Supports all core offerings (Starter, Business, Premium, Social Media)
 *  • Fetches /api/packages/:id or /api/packages/slug/:slug
 *  • Displays name, tagline, pricing, features, and full description
 *  • Includes full fallback dataset for offline/static usage
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import CookieBanner from "../components/CookieBanner";

export default function PackageDetails() {
  const { id } = useParams(); // numeric or slug
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
      tagline:
        "Perfect for local sole traders and small businesses looking to get online fast.",
      price_oneoff: 795,
      price_monthly: 49,
      term_months: 24,
      description: `
The Starter package is designed for tradesmen, small shops, and local sole traders who need a reliable, professional online presence without the complexity. 
It delivers a modern, SEO-optimised website — tailored to your goals and built for performance.

Every Starter site also includes basic social media setup: connecting your Facebook, Instagram, and Google Business profiles to your new website, helping you build trust and visibility locally.
      `,
      features: [
        "5 bespoke, fully custom-designed pages",
        "Mobile responsive & SEO-optimised",
        "Basic social media setup (Facebook, Instagram, Google Business)",
        "Google Maps & Business Profile integration",
        "Secure UK-based hosting + SSL (1 year included)",
        "Basic WebCare maintenance & support",
      ],
    },
    business: {
      name: "Business",
      tagline:
        "For growing companies ready to scale their systems and brand visibility.",
      price_oneoff: 1495,
      price_monthly: 85,
      term_months: 24,
      description: `
The Business package builds on the Starter foundation, introducing automation and management tools that streamline your workflow.
You’ll gain a custom CRM dashboard, quoting system, and performance insights that make client management effortless.

This package also enhances your social media setup — with branded profile designs, unified visual identity, and ready-to-post templates so your business looks consistent everywhere online.
      `,
      features: [
        "All Starter features included",
        "Custom CRM dashboard for leads & jobs",
        "Integrated quoting and invoicing tools",
        "Enhanced social media setup + content branding",
        "Automated email replies & smart forms",
        "Analytics and local SEO setup",
      ],
    },
    premium: {
      name: "Premium",
      tagline:
        "Complete business automation — website, CRM, client portals, and payment systems.",
      price_oneoff: 2950,
      price_monthly: 160,
      term_months: 24,
      description: `
The Premium package is our flagship end-to-end system — designed for ambitious businesses that need their digital ecosystem to work together seamlessly. 
From web design and automation to bookings, payments, and ongoing support, this is your full digital backbone.

It includes advanced social media automation and integrations, connecting your CRM and marketing tools for smarter scheduling, analytics, and lead tracking — all under one roof.
      `,
      features: [
        "All Business features included",
        "Fully bespoke CRM & project management system",
        "Online bookings, payments, and subscriptions",
        "Advanced social media integration & automation tools",
        "Automated invoicing and client reminders",
        "Priority WebCare support & performance reporting",
      ],
    },
    "social-media": {
      name: "Social Media Management",
      tagline:
        "Done-for-you content creation, posting, and growth — stay visible while we handle the rest.",
      price_oneoff: 0,
      price_monthly: 95,
      term_months: 3,
      description: `
Our Social Media Management plan is ideal for busy business owners who want to stay active online without the time drain.

We handle your content strategy, design, captions, and scheduling across Facebook, Instagram, and Google Business — ensuring your brand stays professional and consistent.
You'll receive three custom-branded posts per week plus monthly performance reports to track engagement and reach.

Optional add-ons include paid ad management, follower growth strategies, and content calendars to align your campaigns with your website and SEO.
      `,
      features: [
        "3 custom branded posts per week",
        "Facebook, Instagram, and Google Business management",
        "Hashtag and caption optimisation",
        "Monthly engagement and reach reporting",
        "Optional ad management and growth strategy add-ons",
        "Rolling monthly plan — cancel anytime after 3 months",
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
                {displayPkg.price_oneoff > 0 && (
                  <p className="font-semibold">
                    £{displayPkg.price_oneoff.toLocaleString()} one-off setup
                  </p>
                )}
                {displayPkg.price_monthly && (
                  <p>
                    {displayPkg.price_oneoff > 0 ? "or " : ""}£
                    {displayPkg.price_monthly.toLocaleString()}/month
                    {displayPkg.term_months && (
                      <> for {displayPkg.term_months} months</>
                    )}
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
