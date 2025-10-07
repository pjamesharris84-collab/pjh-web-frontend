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

  // ✅ Use environment variable for API URL (Render / Vercel in production)
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://pjh-web-backend.onrender.com";

  // 📨 Prefill message & show banner if package details exist
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
      setSelectedPackage({
        name: pkg,
        price,
        monthly,
      });
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
        window.location.href = "/thank-you"; // ✅ Redirect on success
      } else {
        setStatus("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("❌ Contact form error:", error);
      setStatus("❌ Error sending message. Please try again later.");
    }
  };

  return (
    <div className="bg-pjh-charcoal text-pjh-light min-h-screen flex flex-col items-center justify-center px-6 py-24 font-outfit">
      {/* === LOGO === */}
      <img
        src="/pjh-logo-light.png"
        alt="PJH Web Services Logo"
        className="w-36 sm:w-48 mb-8 drop-shadow-lg hover:scale-105 transition-transform duration-300"
      />

      {/* === HEADING === */}
      <h1 className="text-4xl font-extrabold text-pjh-blue mb-4 text-center drop-shadow-sm">
        Contact PJH Web Services
      </h1>
      <p className="text-pjh-muted mb-10 text-center max-w-lg leading-relaxed">
        Have a project in mind? Let’s create something unique and fully tailored
        to your business needs.
      </p>

      {/* === PACKAGE BANNER (if coming from Pricing) === */}
      {selectedPackage && (
        <div className="mb-6 px-5 py-3 bg-pjh-blue/10 border border-pjh-blue/30 rounded-lg text-sm text-pjh-blue text-center max-w-md shadow-sm">
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
        className="w-full max-w-md bg-gradient-to-b from-pjh-gray to-pjh-charcoal p-8 rounded-2xl shadow-2xl border border-pjh-blue/30 space-y-6 transition-transform hover:scale-[1.01]"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Your Name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="you@company.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="form-label">
            Telephone
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="+44 7700 900123"
            pattern="^(\+?\d{1,4}[\s-])?(?:\(?\d{1,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}$"
          />
          <small className="block text-xs text-pjh-muted mt-1">
            Please include your country code if outside the UK.
          </small>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="5"
            className="form-input resize-none"
            placeholder="Tell us about your project..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "Sending..."}
          className="w-full py-3 rounded-md bg-pjh-blue hover:bg-pjh-blue-dark transition font-semibold text-white tracking-wide shadow-md"
        >
          {status === "Sending..." ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* Status message */}
      {status && (
        <p
          className={`mt-6 text-sm text-center ${
            status.startsWith("✅")
              ? "text-green-400"
              : status.startsWith("❌")
              ? "text-red-400"
              : "text-pjh-muted animate-pulse"
          }`}
        >
          {status}
        </p>
      )}

      {/* === BACK LINK === */}
      <div className="mt-10 text-center">
        <a
          href="/"
          className="inline-block text-pjh-blue hover:text-pjh-cyan transition font-semibold"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
