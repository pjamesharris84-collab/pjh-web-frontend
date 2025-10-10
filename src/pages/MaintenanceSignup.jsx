/**
 * ============================================================
 * PJH Web Services — Maintenance Signup Form (2025)
 * ============================================================
 * Collects customer details for maintenance subscription checkout.
 * Styled to match unified blue/white premium design system.
 * Includes a “Back to Home” button for navigation consistency.
 * ============================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";

export default function MaintenanceSignup({ plan }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/maintenance/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            planId: plan.id,
          }),
        }
      );

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Maintenance signup error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Unified button & input styles
  const inputStyle =
    "w-full rounded-lg px-4 py-3 bg-slate-950/80 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 outline-none";
  const buttonPrimary =
    "w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonDisabled =
    "w-full py-3 rounded-xl bg-slate-800 text-gray-500 cursor-not-allowed font-semibold";
  const buttonSubtle =
    "inline-block px-6 py-2 border border-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-medium transition-all duration-300";

  return (
    <div className="bg-slate-900/70 rounded-2xl p-8 text-left border border-white/10 shadow-xl backdrop-blur-sm max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h3 className="text-2xl font-bold text-blue-400 mb-4">
          Subscribe to {plan.name}
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className={inputStyle}
        />

        <button
          disabled={loading}
          type="submit"
          className={loading ? buttonDisabled : buttonPrimary}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>

      {/* === Back to Home === */}
      <div className="text-center pt-6 border-t border-white/10 mt-8">
        <Link to="/" className={buttonSubtle}>
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
