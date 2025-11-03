/**
 * ============================================================
 * PJH Web Services — Package Details Page (Enhanced 2025)
 * ============================================================
 * Supports all core offerings (Essential, Starter, Business, Premium, Social Media)
 *  • Dual pricing (ex-VAT + inc-VAT)
 *  • Aligned with 2025 package structure and tone
 *  • Includes entry-level Essential package for local startups
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import CookieBanner from "../components/CookieBanner";

export default function PackageDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ------------------------------------------------------------
     Fetch package (optional)
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
     Local fallback (offline)
  ------------------------------------------------------------ */
  const fallbackPackages = {
    essential: {
      name: "Essential",
      tagline:
        "A simple, professional 3-page website — perfect for sole traders, startups, and small Suffolk businesses getting online for the first time.",
      price_oneoff: 595,
      price_monthly: 49,
      term_months: 24,
      description: `
The Essential package is designed for local sole traders, new startups, and community businesses who want a clean, professional website — built properly and hosted securely.

It provides everything you actually need to get started online: a modern, mobile-optimised design, clear contact options, and Google Business integration so local customers can find you easily.

It’s the perfect foundation for those who want something simple now, with room to grow later into our Starter, Business, or Premium tiers.
      `,
      features: [
        "Up to 3 custom-designed pages (e.g. Home, About, Contact)",
        "Responsive, mobile-friendly design for all devices",
        "Basic SEO setup with Google indexing & sitemap submission",
        "Google Business Profile integration (map & contact links)",
        "Contact form with spam protection & direct email delivery",
        "Secure UK-based hosting + SSL (first year included)",
        "3-month WebCare support for updates & minor content edits",
      ],
    },
    starter: {
      name: "Starter",
      tagline:
        "Professional 5-page website — ideal for tradesmen and small businesses who just need a solid online presence done properly.",
      price_oneoff: 995,
      price_monthly: 79,
      term_months: 24,
      description: `
The Starter package is perfect for sole traders and small local businesses who simply need a reliable, modern website — built properly and ready to perform. 
It includes clean design, on-page SEO, and everything you need to get found on Google.

We also connect your Facebook, Instagram, and Google Business profiles to help customers reach you wherever they search. Simple, effective, and built to last.
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
        "For growing companies who need more than a website — quoting, automation, and CRM tools built in.",
      price_oneoff: 1995,
      price_monthly: 129,
      term_months: 24,
      description: `
The Business package adds serious capability to your online presence. 
You’ll get a bespoke CRM dashboard, built-in quoting and invoicing, and smart automation that saves time every day.

It also includes enhanced social media branding — consistent profile design, post templates, and SEO alignment so your business looks professional everywhere it appears online.
      `,
      features: [
        "All Starter features included",
        "Custom CRM dashboard for leads & jobs",
        "Integrated quoting & invoicing tools",
        "Enhanced social media setup + content branding",
        "Automated email replies & smart forms",
        "Analytics and local SEO setup",
      ],
    },
    premium: {
      name: "Premium",
      tagline:
        "Complete digital system — bespoke CRM, client portals, automation & recurring payments.",
      price_oneoff: 3995,
      price_monthly: 199,
      term_months: 24,
      description: `
The Premium package is our flagship, fully-integrated solution for ambitious businesses. 
It combines design, automation, and client management into one cohesive system — from first enquiry to payment and beyond.

This plan includes advanced social media and marketing integrations, automated billing, and dedicated WebCare support for true peace of mind.
      `,
      features: [
        "All Business features included",
        "Fully bespoke CRM & project management system",
        "Online bookings, payments & subscriptions",
        "Advanced social media integration & automation tools",
        "Automated invoicing & client reminders",
        "Priority WebCare support & performance reporting",
      ],
    },
    "social-media": {
      name: "Social Media Management",
      tagline:
        "Stay visible online with done-for-you content, scheduling, and reporting — all managed by us.",
      price_oneoff: 0,
      price_monthly: 295,
      term_months: 1,
      description: `
Our Social Media Management plans are ideal for busy owners who want consistent, professional content without the hassle.

We manage your Facebook, Instagram, and Google Business accounts — creating branded posts, writing captions, optimising hashtags, and scheduling weekly content. 
You’ll receive monthly engagement reports and can add paid ad management or video content as optional extras.

All plans run on a flexible monthly basis — no long contracts, cancel anytime.
      `,
      features: [
        "3+ custom branded posts per week",
        "Facebook, Instagram & Google Business management",
        "Hashtag and caption optimisation",
        "Monthly engagement and reach reporting",
        "Optional ad management & video content add-ons",
        "Rolling monthly plan — cancel anytime",
      ],
    },
  };

  const slug = (id || "").toLowerCase();
  const displayPkg =
    pkg ||
    fallbackPackages[slug] ||
    Object.values(fallbackPackages).find((p) => p.name.toLowerCase() === slug);

  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";

  const renderDual = (net) => (
    <>
      £{net.toLocaleString()} + VAT (£{(net * 1.2).toLocaleString()} inc. VAT)
    </>
  );

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
                  <p className="font-semibold mb-1">
                    {renderDual(displayPkg.price_oneoff)} one-off setup
                  </p>
                )}
                {displayPkg.price_monthly && (
                  <p>
                    {displayPkg.price_oneoff > 0 ? "or " : ""}
                    {renderDual(displayPkg.price_monthly)} / month{" "}
                    {displayPkg.term_months > 1
                      ? `for ${displayPkg.term_months} months`
                      : "(rolling monthly plan)"}
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
          <br />
          PJH Web Services is a VAT-registered business (VAT No. GB503 3476 17).
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Prices shown are exclusive of VAT with inclusive figures shown for
          clarity.
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
