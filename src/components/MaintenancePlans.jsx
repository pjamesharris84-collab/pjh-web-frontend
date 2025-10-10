/**
 * ============================================================
 * PJH Web Services — Maintenance Plans Component (2025)
 * ============================================================
 * Fully aligned, accessibility-compliant, and visually balanced.
 * Includes improved button contrast for bright-highlight cards.
 * ============================================================
 */

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function MaintenancePlans() {
  const plans = [
    {
      name: "Essential Care",
      price: "£45/mo (ex VAT)",
      annual: "£420/yr (£35/mo eq.)",
      tagline: "Perfect for small business websites",
      features: [
        "Weekly backups",
        "CMS & plugin updates",
        "Uptime & security monitoring",
        "Malware scans",
      ],
      highlight: false,
    },
    {
      name: "Performance Care",
      price: "£95/mo (ex VAT)",
      annual: "£1,020/yr (£85/mo eq.)",
      tagline: "For growing businesses and online stores",
      features: [
        "Everything in Essential",
        "Website speed checks",
        "Monthly SEO health report",
        "1 hr of content updates",
        "Priority support (48h response)",
      ],
      highlight: true,
    },
    {
      name: "Total WebCare",
      price: "£195/mo (ex VAT)",
      annual: "£2,100/yr (£175/mo eq.)",
      tagline: "For high-traffic or mission-critical websites",
      features: [
        "Everything in Performance",
        "24h priority support",
        "3 hrs of monthly updates",
        "Emergency fixes included",
        "Quarterly strategy call",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Maintenance Packages
        </motion.h2>

        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Keep your PJH-built website running smoothly, securely, and at top
          speed — 24/7. Our WebCare packages are exclusive add-ons for existing
          PJH Web Services clients.
        </p>

        {/* Equal Height Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`flex flex-col justify-between rounded-2xl shadow-xl p-8 border relative overflow-hidden ${
                plan.highlight
                  ? "bg-blue-700 border-blue-400 scale-[1.02] shadow-blue-900/40"
                  : "bg-slate-800 border-slate-700"
              }`}
            >
              {/* Popular Badge */}
              {plan.highlight && (
                <span className="absolute top-4 right-4 bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm">
                  Most Popular
                </span>
              )}

              {/* Top Section */}
              <div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-4">{plan.tagline}</p>

                <div className="text-3xl font-semibold mb-2">{plan.price}</div>
                <div className="text-gray-400 text-sm mb-6">{plan.annual}</div>

                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Section */}
              <div className="mt-8">
                <Link
                  to="/maintenance/compare"
                  className={`w-full block text-center font-semibold py-3 rounded-xl transition ${
                    plan.highlight
                      ? "bg-blue-900 text-white hover:bg-blue-800 border border-blue-500"
                      : "bg-slate-700 text-white hover:bg-slate-600"
                  }`}
                >
                  Compare Plans
                </Link>

                <Link
                  to="/contact"
                  className={`w-full block text-center mt-3 py-3 rounded-xl text-sm font-semibold border transition ${
                    plan.highlight
                      ? "border-white/40 text-white hover:bg-blue-600 hover:border-blue-400"
                      : "border-white/30 text-white hover:bg-white hover:text-slate-900"
                  }`}
                >
                  Get Started →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
