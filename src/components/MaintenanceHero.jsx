/**
 * ============================================================
 * PJH Web Services — Maintenance Hero Section (2025)
 * ============================================================
 * Updated with eligibility note clarifying that WebCare plans
 * are exclusive add-ons for PJH-built or PJH-managed websites.
 * ============================================================
 */

import { motion } from "framer-motion";

export default function MaintenanceHero() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-6"
      >
        Keep Your Website Performing Like It’s Day One.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-2xl mx-auto text-gray-300 text-lg mb-8"
      >
        Secure, backed up, and lightning-fast — every single day.  
        PJH Web Services WebCare Maintenance Packages keep your business online, protected, and performing at its best.
      </motion.p>

      <div className="flex justify-center gap-4 mb-6">
        <a
          href="/maintenance/compare"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition"
        >
           Compare Plans
        </a>
        <a
          href="/contact"
          className="px-6 py-3 border border-white hover:bg-white hover:text-slate-900 rounded-xl font-semibold transition"
        >
          📞 Schedule a Free Consultation
        </a>
      </div>

      {/* Eligibility Notice */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-sm text-gray-400 italic max-w-xl mx-auto mt-4 px-4"
      >
        *WebCare Maintenance Plans are exclusive add-ons for websites built or actively managed by PJH Web Services.*
      </motion.p>
    </section>
  );
}
