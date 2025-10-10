/**
 * ============================================================
 * PJH Web Services — Contact Page (2025)
 * ============================================================
 * Unified with the blue/white premium design system.
 * Refined layout, typography, and consistent button + input styling.
 * ============================================================
 */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const location = useLocation();

  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pkg = params.get("package");
    const price = params.get("price");
    const monthly = params.get("monthly");

    if (pkg) {
      const msg = `Hi PJH Web Services, I'm interested in your ${pkg} Package (£${price}${
        monthly && monthly > 0 ? ` one-off or £${monthly}/month` : ""
      }). Please contact me with more information.`;
      setForm((prev) => ({ ...prev, message: msg }));
      setSelectedPackage({ name: pkg, price, monthly });
    }
  }, [location.search]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = "/thank-you";
      } else {
        setStatus("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("❌ Contact form error:", error);
      setStatus("❌ Error sending message. Please try again later.");
    }
  };

  // === Unified design system classes ===
  const inputClass =
    "w-full rounded-lg px-4 py-3 bg-slate-950/80 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300";
  const buttonPrimary =
    "w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonDisabled =
    "w-full py-3 rounded-xl bg-slate-800 text-gray-500 cursor-not-allowed font-semibold";
  const backLink =
    "inline-block px-6 py-2 border border-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-medium transition-all duration-300";

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col items-center justify-center px-6 py-24 font-inter">
      {/* === LOGO === */}
      <img
        src="/pjh-logo-light.png"
        alt="PJH Web Services Logo"
        className="w-36 sm:w-48 mb-10 drop-shadow-xl"
        loading="lazy"
      />

      {/* === HEADING === */}
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-400 mb-4 text-center tracking-tight">
        Contact PJH Web Services
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-xl leading-relaxed">
        Have a project in mind? Let’s create something unique and fully tailored
        to your business needs.
      </p>

      {/* === PACKAGE BANNER (if coming from pricing) === */}
      {selectedPackage && (
        <div className="mb-8 px-6 py-3 bg-blue-900/30 border border-blue-700/40 rounded-lg text-sm text-blue-300 text-center max-w-md shadow-sm">
          <strong>Enquiring about:</strong> {selectedPackage.name} Package{" "}
          (£{selectedPackage.price}
          {selectedPackage.monthly > 0
            ? ` or £${selectedPackage.monthly}/month`
            : ""}
          )
        </div>
      )}

      {/* === CONTACT FORM === */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900/70 p-8 rounded-2xl shadow-xl border border-white/10 space-y-6 backdrop-blur-sm"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Your Name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-300">
            Telephone
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="+44 7700 900123"
            pattern="^(\+?\d{1,4}[\s-])?(?:\(?\d{1,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}$"
          />
          <small className="block text-xs text-gray-500 mt-2">
            Please include your country code if outside the UK.
          </small>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="5"
            className={`${inputClass} resize-none`}
            placeholder="Tell us about your project..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "Sending..."}
          className={status === "Sending..." ? buttonDisabled : buttonPrimary}
        >
          {status === "Sending..." ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* === Status message === */}
      {status && (
        <p
          className={`mt-6 text-sm text-center ${
            status.startsWith("✅")
              ? "text-green-400"
              : status.startsWith("❌")
              ? "text-red-400"
              : "text-gray-400 animate-pulse"
          }`}
        >
          {status}
        </p>
      )}

      {/* === BACK LINK === */}
      <div className="mt-10 text-center">
        <a href="/" className={backLink}>
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
