/**
 * ============================================================
 * PJH Web Services — Maintenance Landing Page (VAT-Registered 2025)
 * ============================================================
 * Final version aligned with:
 *  • VAT-inclusive dual pricing (£45 / £85 / £145 + VAT)
 *  • East Anglia benchmark (2025)
 *  • Accessibility & compliance standards
 * ============================================================
 */

import MaintenanceHero from "../components/MaintenanceHero";
import MaintenanceFeatures from "../components/MaintenanceFeatures";
import MaintenancePlans from "../components/MaintenancePlans";
import MaintenanceCTA from "../components/MaintenanceCTA";
import { Link } from "react-router-dom";

export default function Maintenance() {
  const renderDual = (net) => (
    <>
      £{net.toLocaleString()} + VAT (£{(net * 1.2).toLocaleString()} inc. VAT)
    </>
  );

  return (
    <main
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col font-inter"
      role="main"
    >
      {/* HERO */}
      <MaintenanceHero
        title="Website Care Plans for Local Businesses"
        subtitle="Keep your website secure, updated, and performing — so you can focus on running your business."
        tagline="We handle the updates, backups, and security — with transparent VAT pricing and responsive local support."
        ctaPrimary={{ text: "See Care Plans", to: "#plans" }}
        ctaSecondary={{ text: "Contact Us", to: "/contact" }}
      />

      {/* FEATURES */}
      <MaintenanceFeatures
        title="What We Do — In Plain English"
        intro="Websites are living systems. Without proper care, they slow down, break, or become vulnerable. We take care of the technical side — updates, performance, and security — so your site stays fast, protected, and compliant. All pricing is VAT-transparent and clearly presented."
        features={[
          {
            title: "Security & Backups",
            desc: "Daily automated backups and proactive software updates to keep your site stable, secure, and recoverable.",
          },
          {
            title: "Performance & Speed",
            desc: "Continuous performance tuning and uptime monitoring — ensuring your website remains fast, even as it grows.",
          },
          {
            title: "Local, Reachable Support",
            desc: "Based in Suffolk, we’re real people who respond quickly and clearly — no chatbots or overseas ticket systems.",
          },
          {
            title: "Evolving With the Web",
            desc: "We keep your site aligned with new browser standards, mobile devices, and modern web practices.",
          },
        ]}
      />

      {/* PLANS */}
      <section id="plans" aria-label="Website Care Plan options">
        <MaintenancePlans
          title="Straightforward, Honest Care Plans"
          subtitle="Every plan includes updates, backups, and monitoring — with simple, transparent VAT pricing and the reliability local businesses expect."
          plans={[
            {
              name: "Essential Care",
              price: renderDual(45),
              desc: "Perfect for smaller brochure or Starter sites. Monthly updates, daily backups, and essential uptime monitoring handled for you.",
              features: [
                "Monthly plugin & core updates",
                "Daily backups (7-day retention)",
                "Basic uptime & security monitoring",
                "Email support within 2 business days",
                "Annual payment option available (£420 + VAT / £504 inc.)",
              ],
            },
            {
              name: "WebCare Plus",
              price: renderDual(85),
              desc: "For growing websites needing bi-weekly updates, performance checks, and faster support turnaround.",
              features: [
                "Bi-weekly updates & security scans",
                "Daily backups (14-day retention)",
                "Monthly performance report",
                "Priority same-day email support",
                "Annual payment option available (£900 + VAT / £1,080 inc.)",
              ],
            },
            {
              name: "WebCare Premium",
              price: renderDual(145),
              desc: "For e-commerce or CRM-driven sites that need maximum reliability, SEO reporting, and priority fixes.",
              features: [
                "Weekly updates & deep security scans",
                "Real-time uptime monitoring",
                "Monthly performance & SEO audit",
                "Priority phone & email support",
                "Annual payment option available (£1,560 + VAT / £1,872 inc.)",
              ],
            },
          ]}
        />
      </section>

      {/* CTA */}
      <MaintenanceCTA
        title="Stop Worrying — Start Growing"
        text="Our monthly WebCare plans keep your website healthy, secure, and compliant — with clear dual pricing and dependable Suffolk-based support. You stay focused on business, we handle the rest."
        primaryCta={{ text: "Get Started", to: "/contact" }}
        secondaryCta={{ text: "View Services", to: "/" }}
      />

      {/* FOOTER */}
      <footer
        className="text-center py-12 border-t border-slate-800 mt-10"
        aria-label="Footer Information"
      >
        <Link
          to="/"
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to Home
        </Link>
        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          © {new Date().getFullYear()} PJH Web Services — VAT No. GB503 3476 17 ·
          All prices shown exclusive of VAT, with inclusive figures displayed for clarity.  
          WebCare services are available for websites built or actively managed by PJH Web Services.
        </p>
      </footer>
    </main>
  );
}
