/**
 * ============================================================
 * PJH Web Services — Business Package Page
 * ============================================================
 * For growing companies who are ready to scale up.
 * Includes everything from Starter plus CRM, automation, and
 * time-saving tools to help manage your day-to-day business.
 * ============================================================
 */

import Navbar from "../../components/Navbar";
import SEO from "../../components/SEO";
import CookieBanner from "../../components/CookieBanner";
import { Link } from "react-router-dom";

export default function Business() {
  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col font-inter">
      <SEO
        title="Business Package | PJH Web Services"
        description="For growing companies ready to scale — full CRM, automation, and marketing efficiency without the noise."
        url="https://www.pjhwebservices.co.uk/packages/business"
      />

      <Navbar />

      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-3xl border border-white/10 p-10 shadow-lg shadow-blue-900/10">
          <h1 className="text-4xl font-bold text-blue-400 mb-3">
            Business Package
          </h1>
          <p className="text-gray-400 mb-6 text-lg">
            For growing local companies who are ready to scale up.
          </p>

          <p className="text-gray-300 text-lg font-semibold mb-10">
            £2,600 one-off setup or £140/month for 24 months
          </p>

          <p className="text-gray-400 mb-10 leading-relaxed whitespace-pre-line">
            When your business starts growing, you need more than a brochure
            site — you need tools that actually save you time.
            {"\n\n"}
            The Business Package gives you all the polish of our Starter plan,
            plus a built-in CRM and automation features that make managing jobs,
            customers, and payments effortless.
            {"\n\n"}
            And just like everything else we do, it’s built with honesty and
            practicality. No pointless “funnels” or flashy dashboards — just a
            reliable system that works for how *you* run your business.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            What’s Included
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>All Starter features included</li>
            <li>Custom CRM dashboard with lead & job tracking</li>
            <li>Integrated quoting and invoicing tools</li>
            <li>Booking forms & smart enquiry handling</li>
            <li>Automated email responses for customers</li>
            <li>Google Analytics & search console integration</li>
            <li>Secure customer data management</li>
            <li>On-page SEO and local keyword setup</li>
          </ul>

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
