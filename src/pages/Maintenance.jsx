/**
 * ============================================================
 * PJH Web Services — Maintenance Landing Page (Local Focus)
 * ============================================================
 * Displays the maintenance marketing stack:
 * Hero → Features → Plans → CTA → Back to Home
 * Updated messaging:
 *   • Focused on local businesses
 *   • Highlights clarity, simplicity, and ongoing support
 *   • Reinforces “we handle the tech so you don’t have to”
 * ============================================================
 */

import MaintenanceHero from "../components/MaintenanceHero";
import MaintenanceFeatures from "../components/MaintenanceFeatures";
import MaintenancePlans from "../components/MaintenancePlans";
import MaintenanceCTA from "../components/MaintenanceCTA";
import { Link } from "react-router-dom";

export default function Maintenance() {
  return (
    <main className="bg-slate-950 text-white min-h-screen flex flex-col">
      {/* HERO — clear local business message */}
      <MaintenanceHero
        title="Website Care Plans for Local Businesses"
        subtitle="Stay secure, fast, and worry-free — we keep your site ahead of the curve while you focus on running your business."
        tagline="We stay on top of digital trends, updates, and threats — so you don’t have to."
        ctaPrimary={{ text: "View Care Plans", to: "#plans" }}
        ctaSecondary={{ text: "Contact Us", to: "/contact" }}
      />

      {/* FEATURES — local, plain-English explanation */}
      <MaintenanceFeatures
        title="Built for Real Businesses — Not Buzzwords"
        intro="Your website is one of your most valuable assets, and it deserves proper care. 
        We don’t just handle technical updates — we keep your site optimised, secure, and performing perfectly, month after month."
        features={[
          {
            title: "Security & Backups",
            desc: "We keep your site safe with daily backups, plugin updates, and proactive monitoring — no jargon, no panic.",
          },
          {
            title: "Performance Monitoring",
            desc: "Stay fast and mobile-friendly across every update. We handle performance tuning and optimisations for you.",
          },
          {
            title: "Local Support You Can Reach",
            desc: "We’re Suffolk-based, not some faceless support bot. Get real help when you need it — in plain English.",
          },
          {
            title: "Trend-Ready Upgrades",
            desc: "As the web evolves, so does your site. We stay ahead of new tools and features so your business always looks current.",
          },
        ]}
      />

      {/* PLANS — unchanged functionality */}
      <MaintenancePlans
        title="Simple, Honest Care Plans"
        subtitle="Choose a monthly plan that fits your business — no confusing tech talk, no hidden fees, just straightforward support."
      />

      {/* CTA — aligned with overall brand tone */}
      <MaintenanceCTA
        title="Cut Through the Noise. Keep Your Website in Safe Hands."
        text="There’s no need to chase every new trend or worry about website updates. 
        With PJH Web Services, your website stays protected, up-to-date, and ready for whatever comes next — so you can focus on what you do best."
        primaryCta={{ text: "Get Started Today", to: "/contact" }}
        secondaryCta={{ text: "View All Services", to: "/" }}
      />

      {/* BACK TO HOME */}
      <div className="text-center py-12 border-t border-slate-800 mt-10">
        <Link
          to="/"
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
