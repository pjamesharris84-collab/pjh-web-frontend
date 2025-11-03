import Navbar from "../../components/Navbar";
import SEO from "../../components/SEO";
import CookieBanner from "../../components/CookieBanner";
import { Link } from "react-router-dom";

export default function Starter() {
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
        title="Starter Website Package | PJH Web Services"
        description="Professional 5-page bespoke website for tradesmen and small Suffolk businesses. Modern, SEO-optimised, and designed without templates — built to perform."
        url="https://www.pjhwebservices.co.uk/packages/starter"
      />

      <Navbar />

      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-3xl border border-white/10 p-10 shadow-lg shadow-blue-900/10">
          <h1 className="text-4xl font-bold text-blue-400 mb-3">
            Starter Website Package
          </h1>
          <p className="text-gray-400 mb-6 text-lg">
            Ideal for tradesmen, local shops, and small Suffolk businesses who
            just need a solid, professional website built properly — without the
            jargon or template shortcuts.
          </p>

          <div className="text-gray-300 text-lg font-semibold mb-10">
            <p>{renderDual(995)} one-off setup</p>
            <p>or {renderDual(79)} / month for 24 months</p>
          </div>

          <p className="text-gray-400 mb-10 leading-relaxed whitespace-pre-line">
            Every Starter website is designed completely from scratch — no
            templates, no drag-and-drop builders.{"\n\n"}
            It’s perfect for small businesses who want a bespoke, modern, and
            Google-ready website without the confusion or hidden upsells.{"\n\n"}
            We focus on what actually matters: clean design, fast performance,
            and real results that help your business grow locally.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            What’s Included
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>5 bespoke, fully custom-designed pages (no templates)</li>
            <li>Responsive design — optimised for all devices</li>
            <li>Local SEO setup with Google-ready structure</li>
            <li>Google Maps & Business Profile integration</li>
            <li>
              Secure UK-based hosting & free SSL certificate (first year
              included)
            </li>
            <li>Contact form with direct email delivery & spam protection</li>
            <li>
              Basic WebCare maintenance — updates, backups & minor edits
              included for the first 12 months
            </li>
            <li>
              Basic social media setup (Facebook, Instagram & Google Business)
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            Optional Add-Ons
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>Extra page — £75 + VAT each</li>
            <li>Blog / News setup — £95 + VAT</li>
            <li>Logo design or rebrand — from £120 + VAT</li>
            <li>
              SEO Starter Boost — £150 + VAT (keyword research & local
              optimisation)
            </li>
            <li>
              WebCare Plus — £20 + VAT/month (monthly updates, uptime monitoring
              & priority support)
            </li>
            <li>
              Full Social Media Management — from £295 + VAT/month (rolling
              monthly)
            </li>
          </ul>

          <p className="text-gray-400 mb-10 leading-relaxed">
            We don’t use marketing buzzwords or confusing packages — just clear,
            honest websites that look great, load fast, and work for real local
            businesses. Everything is built with future scalability in mind so
            you can easily grow into our Business or Premium packages later.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className={buttonPrimary}>
              Enquire About Starter →
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
