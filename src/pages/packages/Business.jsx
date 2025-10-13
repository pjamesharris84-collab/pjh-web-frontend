/**
 * ============================================================
 * PJH Web Services — Business Package Page (Refined 2025)
 * ============================================================
 * Bespoke web design for growing companies ready to scale.
 * Includes everything from Starter plus CRM, automation, and
 * digital systems designed to save time and streamline work.
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
        description="Bespoke websites with CRM, automation, and advanced business tools — designed for growing companies who need more than just a website."
        url="https://www.pjhwebservices.co.uk/packages/business"
      />

      <Navbar />

      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-3xl border border-white/10 p-10 shadow-lg shadow-blue-900/10">
          <h1 className="text-4xl font-bold text-blue-400 mb-3">
            Business Package
          </h1>
          <p className="text-gray-400 mb-6 text-lg">
            For growing companies who need a bespoke, scalable website that
            works as hard as they do.
          </p>

          <p className="text-gray-300 text-lg font-semibold mb-10">
            £1,495 one-off setup or £85/month for 24 months
          </p>

          <p className="text-gray-400 mb-10 leading-relaxed whitespace-pre-line">
            As your business grows, your website should do more than look good — it should
            help you save time, capture leads, and manage your day-to-day workflow.{"\n\n"}
            The Business Package includes everything from our Starter plan plus a fully
            integrated CRM, quoting, invoicing, and automation tools — designed around
            your business, not a template.{"\n\n"}
            Every project is built from scratch with modern frameworks and a focus on
            clarity, speed, and usability. We cut through the jargon and deliver a
            digital system that’s efficient, intuitive, and ready to evolve as you grow.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            What’s Included
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>All features from the Starter Package</li>
            <li>Bespoke CRM dashboard for leads, clients & job tracking</li>
            <li>Integrated quoting and invoicing system</li>
            <li>Automated email responses & smart enquiry handling</li>
            <li>Booking forms for services, consultations, or jobs</li>
            <li>Google Analytics & Search Console integration</li>
            <li>On-page SEO setup with local keyword targeting</li>
            <li>Secure customer data storage & management tools</li>
            <li>12 months of hosting, SSL, and WebCare maintenance included</li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            Optional Add-Ons
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>Custom dashboard reports & analytics views — from £120</li>
            <li>Automated SMS notifications & reminders — from £95</li>
            <li>Team management / multi-user CRM access — £50 setup</li>
            <li>SEO Boost Package (keyword strategy + content optimisation) — £200</li>
            <li>WebCare Plus — £25/month (proactive updates, uptime monitoring & monthly performance reports)</li>
          </ul>

          <p className="text-gray-400 mb-10 leading-relaxed">
            Built with the latest tools and frameworks, your Business Package website
            will keep up with modern digital trends — ensuring your brand always looks
            sharp, runs fast, and performs seamlessly across every device.
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
