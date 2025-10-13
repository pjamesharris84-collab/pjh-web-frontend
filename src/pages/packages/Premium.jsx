/**
 * ============================================================
 * PJH Web Services — Premium Package Page (Refined 2025)
 * ============================================================
 * Fully bespoke automation and CRM suite for established businesses.
 * Designed to unify bookings, payments, and workflows into one
 * seamless, scalable platform — built from scratch, no templates.
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
        description="Our flagship bespoke automation suite — CRM, bookings, payments, and client portals built around your business from the ground up."
        url="https://www.pjhwebservices.co.uk/packages/premium"
      />

      <Navbar />

      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-3xl border border-white/10 p-10 shadow-lg shadow-blue-900/10">
          <h1 className="text-4xl font-bold text-blue-400 mb-3">
            Premium Package
          </h1>
          <p className="text-gray-400 mb-6 text-lg">
            Our flagship, fully bespoke digital platform — built for established
            businesses that want everything connected and working seamlessly.
          </p>

          <p className="text-gray-300 text-lg font-semibold mb-10">
            £2,950 one-off setup or £160/month for 24 months
          </p>

          <p className="text-gray-400 mb-10 leading-relaxed whitespace-pre-line">
            The Premium Package is the ultimate all-in-one solution for businesses
            ready to automate, scale, and simplify their operations.{"\n\n"}
            Every system is designed from scratch — no templates, no off-the-shelf
            dashboards — giving you a completely tailored digital platform that fits
            how your business actually works.{"\n\n"}
            From bookings and payments to client logins, invoicing, and reporting,
            everything runs through one intuitive interface. We handle the automation,
            integrations, and hosting so you can focus on running your business.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            What’s Included
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>All Business Package features included</li>
            <li>Fully bespoke CRM & project management system</li>
            <li>Online bookings, payments, and recurring billing (Stripe / GoCardless)</li>
            <li>Client login area & secure customer portal</li>
            <li>Automated invoicing, reminders, and follow-ups</li>
            <li>Advanced analytics & performance dashboard</li>
            <li>Team roles, access control, and multi-user management</li>
            <li>12 months hosting, SSL, and WebCare Premium maintenance included</li>
            <li>Priority support — direct phone & email access</li>
            <li>Free domain renewals while under active WebCare plan</li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            Optional Add-Ons
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>Custom data dashboards & KPI reports — from £200</li>
            <li>API integrations (QuickBooks, HubSpot, etc.) — from £250</li>
            <li>Automated SMS & WhatsApp notifications — from £150</li>
            <li>Team training & onboarding sessions — from £95</li>
            <li>WebCare Premium+ — £45/month (priority fixes, uptime SLA, detailed monthly insights)</li>
          </ul>

          <p className="text-gray-400 mb-10 leading-relaxed">
            Built using modern frameworks and scalable cloud infrastructure, the
            Premium Package is your all-in-one digital command centre — engineered
            for performance, automation, and long-term reliability.{"\n\n"}
            No jargon, no unnecessary fluff — just technology that works for your
            business and keeps you ahead of digital trends.
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
