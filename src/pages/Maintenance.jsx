/**
 * PJH Web Services — Maintenance Landing Page (Refined)
 */
import MaintenanceHero from "../components/MaintenanceHero";
import MaintenanceFeatures from "../components/MaintenanceFeatures";
import MaintenancePlans from "../components/MaintenancePlans";
import MaintenanceCTA from "../components/MaintenanceCTA";
import { Link } from "react-router-dom";

export default function Maintenance() {
  return (
    <main className="bg-slate-950 text-white min-h-screen flex flex-col">
      {/* HERO */}
      <MaintenanceHero
        title="Website Care Plans for Local Businesses"
        subtitle="Let us keep your website secure, updated, and performing — so you can focus on your business."
        tagline="We watch the tech so you don’t have to — updates, backups, security, performance."
        ctaPrimary={{ text: "See Care Plans", to: "#plans" }}
        ctaSecondary={{ text: "Contact Us", to: "/contact" }}
      />

      {/* FEATURES */}
      <MaintenanceFeatures
        title="What We Do — In Plain English"
        intro="Websites are living systems. Without proper care, they slow, break, or become vulnerable. We handle all the behind-the-scenes work so your site stays fast, safe, and up to date."
        features={[
          {
            title: "Security & Backups",
            desc: "We run daily backups, apply core/plugin updates, and watch for vulnerabilities.",
          },
          {
            title: "Performance & Speed",
            desc: "We monitor and tune your site so it stays fast and responsive after updates.",
          },
          {
            title: "Local, Reachable Support",
            desc: "You won’t wait on bots. As a Suffolk-based team, we respond in real time.",
          },
          {
            title: "Ongoing Trend Updates",
            desc: "We evolve your site with the web — new tech, mobile changes, modern best practices.",
          },
        ]}
      />

      {/* PLANS */}
      <MaintenancePlans
        title="Straightforward, Honest Care Plans"
        subtitle="No confusing levels — pick what fits your site. All plans include essential hosting, updates, and security."
      />

      {/* CTA */}
      <MaintenanceCTA
        title="Stop Worrying. Start Growing."
        text="Don’t let your site fall behind. Our care plans keep your site healthy, secure, and tuned — while you get on with running your business."
        primaryCta={{ text: "Get Started", to: "/contact" }}
        secondaryCta={{ text: "View Services", to: "/" }}
      />

      {/* Back to Home */}
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
