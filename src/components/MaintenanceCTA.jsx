/**
 * ============================================================
 * PJH Web Services — Maintenance CTA Section (2025)
 * ============================================================
 * Final call-to-action with unified premium styling.
 * ============================================================
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MaintenanceCTA() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-t border-slate-800 overflow-hidden">
      {/* Soft radial glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,rgba(15,23,42,0.95)_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">
          Don’t Wait for Something to Break.
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Protect your website today with <b>PJH Web Services</b> — trusted,
          transparent, and fully managed care that keeps your digital presence
          secure and performing at its best.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            to="/maintenance/compare"
            className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl shadow-md transition-all duration-300 hover:shadow-blue-900/30"
          >
            View Plans
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300"
          >
            📞 Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
