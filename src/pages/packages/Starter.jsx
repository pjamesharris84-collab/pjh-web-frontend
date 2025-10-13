import Navbar from "../../components/Navbar";
import SEO from "../../components/SEO";
import CookieBanner from "../../components/CookieBanner";
import { Link } from "react-router-dom";

export default function Starter() {
  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col font-inter">
      <SEO
        title="Starter Package | PJH Web Services"
        description="Bespoke 5-page website design for small businesses and tradesmen. No templates, no jargon — just modern, custom-built websites that deliver results."
        url="https://www.pjhwebservices.co.uk/packages/starter"
      />

      <Navbar />

      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-3xl border border-white/10 p-10 shadow-lg shadow-blue-900/10">
          <h1 className="text-4xl font-bold text-blue-400 mb-3">Starter Package</h1>
          <p className="text-gray-400 mb-6 text-lg">
            Perfect for tradesmen, local shops, and small Suffolk businesses ready to look professional online.
          </p>

          <p className="text-gray-300 text-lg font-semibold mb-10">
            £795 one-off setup or £49/month for 24 months
          </p>

          <p className="text-gray-400 mb-10 leading-relaxed whitespace-pre-line">
            Every website we build is designed from the ground up — never from templates.{"\n\n"}
            The Starter Package is crafted for small businesses who want a bespoke, modern,
            and Google-friendly website without the confusion or marketing jargon.{"\n\n"}
            We focus on what matters: clean design, fast performance, and genuine results.
            Your new site will look professional, load fast, and attract real customers — not empty metrics.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">What’s Included</h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>5 bespoke, fully custom-designed pages (no templates)</li>
            <li>Responsive design — optimised for mobile, tablet, and desktop</li>
            <li>Local SEO setup with Google-ready site structure</li>
            <li>Google Maps & Business Profile integration</li>
            <li>Secure UK-based hosting & free SSL certificate (first 12 months included)</li>
            <li>Contact form with direct email delivery and spam protection</li>
            <li>Basic WebCare maintenance — updates, backups, and minor content edits included for the first year</li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Optional Add-Ons</h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>Extra page — £75 each</li>
            <li>Blog / News setup — £95</li>
            <li>Logo design or rebrand — from £120</li>
            <li>SEO Starter Boost — £150 (keyword research + local optimisation)</li>
            <li>WebCare Plus — £20/month (monthly updates, edits & uptime monitoring)</li>
          </ul>

          <p className="text-gray-400 mb-10 leading-relaxed">
            We cut through the noise of “funnels” and “growth hacks.” Instead, we deliver clear,
            honest websites that move with digital trends — built to perform today and ready for tomorrow.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className={buttonPrimary}>
              Enquire Now
            </Link>
            <Link to="/" className={buttonOutline}>
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <CookieBanner />
    </div>
  );
}
