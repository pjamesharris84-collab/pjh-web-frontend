/**
 * ============================================================
 * PJH Web Services — Essential Website Package (2025 Edition)
 * ============================================================
 * Entry-level bespoke website for local Suffolk sole traders,
 * startups, and community businesses. Professional, affordable,
 * and built properly — no templates, no jargon.
 * ============================================================
 */

import Navbar from "../../components/Navbar";
import SEO from "../../components/SEO";
import CookieBanner from "../../components/CookieBanner";
import { Link } from "react-router-dom";

export default function Essential() {
  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";

  const renderDual = (net) => (
    <>
      £{net.toLocaleString()} + VAT (£{(net * 1.2).toLocaleString()} inc. VAT)
    </>
  );

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col font-inter">
      <SEO
        title="Essential Website Package | PJH Web Services"
        description="Affordable 3-page bespoke website for Suffolk startups, tradesmen, and small businesses — professional, fast, and built to grow with you."
        url="https://www.pjhwebservices.co.uk/packages/essential"
      />

      <Navbar />

      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-3xl border border-white/10 p-10 shadow-lg shadow-blue-900/10">
          <h1 className="text-4xl font-bold text-blue-400 mb-3">
            Essential Website Package
          </h1>
          <p className="text-gray-400 mb-6 text-lg">
            Designed for sole traders, new startups, and community businesses
            who need a clean, professional website — built properly, hosted
            securely, and ready to grow when you are.
          </p>

          <div className="text-gray-300 text-lg font-semibold mb-10">
            <p>{renderDual(595)} one-off setup</p>
            <p>or {renderDual(49)} / month for 24 months</p>
          </div>

          <p className="text-gray-400 mb-10 leading-relaxed whitespace-pre-line">
            The Essential Package gives you a professional, bespoke website —
            without the unnecessary extras.{"\n\n"}
            It’s perfect for local tradesmen, small shops, and independent
            businesses who just need to look great online, show what they do,
            and be easy to contact.{"\n\n"}
            Every site is built from scratch using modern design principles,
            mobile-first optimisation, and SEO-ready structure — ensuring your
            business appears in local Google searches and makes a strong first
            impression.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            What’s Included
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>Up to 3 custom-designed pages (e.g. Home, About, Contact)</li>
            <li>Responsive, mobile-friendly design for all devices</li>
            <li>Basic SEO setup with Google indexing & sitemap submission</li>
            <li>Google Business Profile integration (map & contact links)</li>
            <li>Contact form with spam protection & direct email delivery</li>
            <li>Secure UK-based hosting & SSL (first 12 months included)</li>
            <li>3-month WebCare support for updates & minor content edits</li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            Optional Add-Ons
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>Extra page — £75 + VAT each</li>
            <li>Blog or News setup — £95 + VAT</li>
            <li>Logo design or rebrand — from £120 + VAT</li>
            <li>SEO Starter Boost — £150 + VAT (local keyword optimisation)</li>
            <li>WebCare Basic — £15 + VAT/month (ongoing updates & security)</li>
            <li>
              WebCare Plus — £25 + VAT/month (priority edits & uptime
              monitoring)
            </li>
            <li>
              Social Media Management — from £295 + VAT/month (rolling monthly)
            </li>
          </ul>

          <p className="text-gray-400 mb-10 leading-relaxed">
            This plan is a great place to start — giving you a real, bespoke
            website that can grow into a Starter, Business, or Premium setup
            later. You’ll never be stuck on a template — your design is yours,
            built on a foundation that scales as your business does.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className={buttonPrimary}>
              Enquire About Essential →
            </Link>
            <Link to="/" className={buttonOutline}>
              Back to Home
            </Link>
          </div>
        </div>
      </main>

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
      </footer>

      <CookieBanner />
    </div>
  );
}
