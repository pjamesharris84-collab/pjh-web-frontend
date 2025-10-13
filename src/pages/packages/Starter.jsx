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
        description="Perfect for tradesmen and small businesses who want a professional, modern website without the fluff or confusion."
        url="https://www.pjhwebservices.co.uk/packages/starter"
      />

      <Navbar />

      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-3xl border border-white/10 p-10 shadow-lg shadow-blue-900/10">
          <h1 className="text-4xl font-bold text-blue-400 mb-3">Starter Package</h1>
          <p className="text-gray-400 mb-6 text-lg">
            Perfect for tradesmen, small shops, and local sole traders.
          </p>

          <p className="text-gray-300 text-lg font-semibold mb-10">
            £900 one-off setup or £60/month for 24 months
          </p>

          <p className="text-gray-400 mb-10 leading-relaxed whitespace-pre-line">
            The Starter package is perfect for small, local businesses who simply want to be
            found online — without drowning in marketing buzzwords.
            {"\n\n"}
            We cut through the noise of “you need to post daily”, “you need funnels”,
            and other nonsense. You don’t. You need a clean, Google-friendly website
            that gets you calls and messages from real local customers — and that’s what we build.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">What’s Included</h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>5-page custom-designed website</li>
            <li>Mobile responsive and SEO-optimised</li>
            <li>Google Maps & Business profile integration</li>
            <li>Secure hosting & free SSL certificate</li>
            <li>Contact form and email integration</li>
            <li>Ongoing support available through WebCare</li>
          </ul>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className={buttonPrimary}>Enquire Now</Link>
            <Link to="/" className={buttonOutline}>Back to Home</Link>
          </div>
        </div>
      </main>

      <CookieBanner />
    </div>
  );
}
