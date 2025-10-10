/**
 * ============================================================
 * PJH Web Services — Maintenance Landing Page (Testimonials Removed)
 * ============================================================
 * Displays the maintenance marketing stack:
 * Hero → Features → Plans → CTA → Back to Home
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
      <MaintenanceHero />
      <MaintenanceFeatures />
      <MaintenancePlans />
      <MaintenanceCTA />

      {/* Back to Home Button */}
      <div className="text-center py-12 border-t border-slate-800 mt-10">
        <Link
          to="/"
          className="inline-block bg-pjh-blue text-white font-semibold px-8 py-3 rounded-xl text-sm hover:bg-pjh-blue/80 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
