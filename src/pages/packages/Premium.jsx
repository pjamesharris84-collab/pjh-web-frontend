/**
 * ============================================================
 * PJH Web Services — Premium Package Page
 * ============================================================
 * Our top-tier, fully bespoke automation and CRM suite.
 * For businesses that want everything in one unified system:
 * bookings, payments, invoices, and smart workflows.
 * ============================================================
 */

import Navbar from "../../components/Navbar";
import SEO from "../../components/SEO";
import CookieBanner from "../../components/CookieBanner";
import { Link } from "react-router-dom";

export default function Premium() {
  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col font-inter">
      <SEO
        title="Premium Package | PJH Web Services"
        description="The full automation suite — a complete CRM, booking, and payments platform designed around your business."
        url="https://www.pjhwebservices.co.uk/packages/premium"
      />

      <Navbar />

      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-3xl border border-white/10 p-10 shadow-lg shadow-blue-900/10">
          <h1 className="text-4xl font-bold text-blue-400 mb-3">
            Premium Package
          </h1>
          <p className="text-gray-400 mb-6 text-lg">
            The full automation suite for established businesses.
          </p>

          <p className="text-gray-300 text-lg font-semibold mb-10">
            £6,000 one-off setup or £300/month for 24 months
          </p>

          <p className="text-gray-400 mb-10 leading-relaxed whitespace-pre-line">
            The Premium Package is our flagship system — a fully bespoke CRM and
            automation platform built entirely around how your business runs.
            {"\n\n"}
            From online bookings and payments to recurring invoicing,
            automated reminders, and client dashboards, everything works
            seamlessly in one place.
            {"\n\n"}
            We take care of the tech, updates, and integrations — you focus on
            running your business. No “growth hacks”, no social-media jargon,
            just a rock-solid system that saves hours every week.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            What’s Included
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>All Business features included</li>
            <li>Fully bespoke CRM and project management suite</li>
            <li>Online payments and recurring billing (Stripe/GoCardless)</li>
            <li>Customer login & portal access</li>
            <li>Automated invoicing and reminders</li>
            <li>Advanced reporting & analytics dashboard</li>
            <li>Team user roles and permissions</li>
            <li>Priority phone & email support</li>
            <li>Free domain renewals during active term</li>
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
