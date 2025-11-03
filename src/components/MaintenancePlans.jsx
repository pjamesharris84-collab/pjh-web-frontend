/**
 * ============================================================
 * PJH Web Services — Maintenance Plans Component (2025-11)
 * ============================================================
 * Fully aligned with VAT-registered 2025 pricing
 * (Essential, WebCare Plus, WebCare Premium)
 * Accessible, balanced visuals, consistent dual pricing display
 * ============================================================
 */

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function MaintenancePlans() {
  const plans = [
    {
      name: "Essential Care",
      price: "£45/mo + VAT (£54 inc.)",
      annual: "£420/yr + VAT (£504 inc.)",
      tagline: "Perfect for small brochure or starter websites",
      features: [
        "Monthly plugin & core updates",
        "Daily backups (7-day retention)",
        "Basic uptime & security monitoring",
        "Email support within 2 business days",
      ],
      highlight: false,
    },
    {
      name: "WebCare Plus",
      price: "£85/mo + VAT (£102 inc.)",
      annual: "£900/yr + VAT (£1,080 inc.)",
      tagline: "Ideal for growing sites needing regular updates and reports",
      features: [
        "Bi-weekly updates & security scans",
        "Daily backups (14-day retention)",
        "Monthly performance report",
        "Priority same-day email support",
      ],
      highlight: true,
    },
    {
      name: "WebCare Premium",
      price: "£145/mo + VAT (£174 inc.)",
      annual: "£1,560/yr + VAT (£1,872 inc.)",
      tagline: "For ecommerce or CRM-driven websites needing full coverage",
      features: [
        "Weekly updates & deep security scans",
        "Real-time uptime monitoring",
        "Monthly performance & SEO audit",
        "Priority phone & email support",
      ],
      highlight: false,
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-t border-slate-800"
      aria-labelledby="maintenance-plans-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          id="maintenance-plans-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-4 text-blue-400"
        >
          Website Care Plans
        </motion.h2>

        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Keep your PJH-built website fast, secure, and performing at its best —
          24/7. Our WebCare plans are designed for long-term reliability and
          peace of mind, with transparent VAT-inclusive pricing.
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
                      <Check
                        className="w-5 h-5 text-blue-400 mt-1 shrink-0"
                        aria-hidden="true"
                      />
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

        <p className="text-center text-gray-500 text-xs mt-10">
          All prices shown are exclusive of VAT with inclusive figures displayed
          for clarity. © {new Date().getFullYear()} PJH Web Services — VAT No.
          GB503 3476 17
        </p>
      </div>
    </section>
  );
}
