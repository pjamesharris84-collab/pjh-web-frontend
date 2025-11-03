/**
 * ============================================================
 * PJH Web Services — Premium Package Page (Refined 2025)
 * ============================================================
 * Our flagship bespoke automation suite — CRM, bookings,
 * payments, and client portals for established businesses.
 * Dual VAT pricing, modern tone, and refined 2025 layout.
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

  const renderDual = (net) => (
    <>
      £{net.toLocaleString()} + VAT (£{(net * 1.2).toLocaleString()} inc. VAT)
    </>
  );

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col font-inter">
      <SEO
        title="Premium Website & CRM Package | PJH Web Services"
        description="Our flagship bespoke automation suite — combining CRM, bookings, payments, and client portals into one powerful system built around your business."
        url="https://www.pjhwebservices.co.uk/packages/premium"
      />

      <Navbar />

      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-3xl border border-white/10 p-10 shadow-lg shadow-blue-900/10">
          <h1 className="text-4xl font-bold text-blue-400 mb-3">
            Premium Website & Automation Package
          </h1>
          <p className="text-gray-400 mb-6 text-lg">
            The ultimate bespoke digital system — uniting your website, CRM,
            bookings, payments, and client portals into one seamless platform
            tailored to your business.
          </p>

          <div className="text-gray-300 text-lg font-semibold mb-10">
            <p>{renderDual(3995)} one-off setup</p>
            <p>or {renderDual(199)} / month for 24 months</p>
          </div>

          <p className="text-gray-400 mb-10 leading-relaxed whitespace-pre-line">
            The Premium Package is your all-in-one business command centre —
            designed from the ground up for automation, scalability, and
            performance.{"\n\n"}
            Every element is handcrafted, integrating your website, CRM,
            bookings, payments, and customer portals into one cohesive system.
            No templates, no third-party bloat — just technology that fits your
            workflow perfectly.{"\n\n"}
            From enquiry to invoice, every process is automated to save you time
            and deliver a smoother experience for your team and customers.
          </p>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            What’s Included
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>All Business Package features included</li>
            <li>Fully bespoke CRM & project management system</li>
            <li>
              Online bookings, payments & recurring billing (Stripe /
              GoCardless)
            </li>
            <li>Client login area & secure customer portal</li>
            <li>Automated invoicing, reminders & follow-ups</li>
            <li>Advanced analytics & performance dashboards</li>
            <li>Team roles, access control & multi-user management</li>
            <li>Priority WebCare support & 12 months hosting included</li>
            <li>Free domain renewals while under active WebCare plan</li>
            <li>End-to-end system testing & launch support</li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            Optional Add-Ons
          </h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-10">
            <li>Custom KPI dashboards & reporting suites — from £200 + VAT</li>
            <li>API integrations (QuickBooks, HubSpot, Xero, etc.) — from £250 + VAT</li>
            <li>Automated SMS & WhatsApp client notifications — from £150 + VAT</li>
            <li>Team training & onboarding sessions — from £95 + VAT</li>
            <li>
              WebCare Premium+ — £45 + VAT/month (priority fixes, uptime SLA,
              advanced reporting & insights)
            </li>
            <li>
              Full Social Media Management — from £295 + VAT/month (rolling
              monthly)
            </li>
          </ul>

          <p className="text-gray-400 mb-10 leading-relaxed">
            Built using modern frameworks and scalable cloud infrastructure,
            your Premium platform is engineered for speed, security, and
            long-term growth.{"\n\n"}
            We handle the technical complexity so you can focus on running your
            business — with a digital ecosystem that’s robust, automated, and
            truly built for the future.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className={buttonPrimary}>
              Enquire About Premium →
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
