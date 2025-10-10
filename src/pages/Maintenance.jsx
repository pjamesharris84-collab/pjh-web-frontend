/**
 * ============================================================
 * PJH Web Services — Maintenance Landing Page (Unified Style)
 * ============================================================
 * Full maintenance marketing stack:
 * Hero → Features → Plans → Testimonials → CTA → Back to Home
 * Uses consistent blue/white premium styling across all sections.
 * ============================================================
 */

import MaintenanceHero from "../components/MaintenanceHero";
import MaintenanceFeatures from "../components/MaintenanceFeatures";
import MaintenancePlans from "../components/MaintenancePlans";
import MaintenanceTestimonials from "../components/MaintenanceTestimonials";
import MaintenanceCTA from "../components/MaintenanceCTA";
import { Link } from "react-router-dom";

export default function Maintenance() {
  // Unified button style classes
  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";

  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col">
      {/* === Maintenance Page Sections === */}
      <MaintenanceHero />
      <MaintenanceFeatures />
      <MaintenancePlans />
      <MaintenanceTestimonials />
      <MaintenanceCTA />

      {/* === Back to Home === */}
      <div className="text-center py-16 border-t border-white/10 bg-slate-950/80 mt-10">
        <Link to="/" className={buttonPrimary}>
          🏠 Back to Home
        </Link>
      </div>
    </main>
  );
}
