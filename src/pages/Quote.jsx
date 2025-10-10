/**
 * ============================================================
 * PJH Web Services — Quote Request Page (2025)
 * ============================================================
 * Unified blue/white premium design system.
 * Consistent with Pricing & PackageDetails pages.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Quote() {
  const [searchParams] = useSearchParams();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customPrice, setCustomPrice] = useState("");
  const packageId = searchParams.get("package");

  useEffect(() => {
    if (packageId) {
      fetch(`${import.meta.env.VITE_API_URL}/api/packages/${packageId}`)
        .then((res) => res.json())
        .then(setSelectedPackage)
        .catch(() => setSelectedPackage(null));
    }
  }, [packageId]);

  // Unified button styles
  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-medium transition-all duration-300";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-6">
      <div className="max-w-3xl mx-auto bg-slate-900/70 rounded-2xl p-10 border border-white/10 shadow-xl backdrop-blur-sm">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-400 mb-3">
            Request a Quote
          </h1>
          <p className="text-gray-400">
            Get a tailored proposal for your next project with PJH Web Services.
          </p>
        </div>

        {/* Selected Package Info */}
        {selectedPackage ? (
          <div className="bg-slate-800/70 rounded-xl p-6 mb-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-blue-400 mb-1">
              {selectedPackage.name}
            </h2>
            <p className="text-gray-400 mb-3">{selectedPackage.tagline}</p>
            <p className="text-sm mb-6">
              Base price:{" "}
              <strong className="text-white">
                £{selectedPackage.price_oneoff?.toLocaleString()}
              </strong>
            </p>

            <label className="block text-sm text-gray-300 mb-2">
              Custom Price (optional):
            </label>
            <input
              type="number"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              placeholder="e.g. 1200"
              className="w-full rounded-lg px-4 py-2 bg-slate-900 border border-slate-700 focus:border-blue-400 focus:outline-none text-white placeholder-gray-500"
            />

            <p className="text-xs text-gray-500 mt-3">
              Use this to adjust the quoted price for discounts or bespoke
              projects.
            </p>
          </div>
        ) : (
          <div className="text-center mb-8">
            <p className="text-gray-400">
              No package selected. Please choose one from our{" "}
              <Link
                to="/pricing"
                className="text-blue-400 underline hover:text-blue-300"
              >
                pricing page
              </Link>
              .
            </p>
          </div>
        )}

        {/* Form Placeholder */}
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full rounded-lg px-4 py-2 bg-slate-900 border border-slate-700 focus:border-blue-400 focus:outline-none text-white placeholder-gray-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full rounded-lg px-4 py-2 bg-slate-900 border border-slate-700 focus:border-blue-400 focus:outline-none text-white placeholder-gray-500"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm mb-2 text-gray-300"
            >
              Project Details
            </label>
            <textarea
              id="message"
              rows="5"
              required
              className="w-full rounded-lg px-4 py-2 bg-slate-900 border border-slate-700 focus:border-blue-400 focus:outline-none text-white placeholder-gray-500 resize-none"
              placeholder="Tell us about your project..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className={buttonPrimary}>
            💬 Submit Quote Request
          </button>
        </form>

        {/* Navigation */}
        <div className="text-center mt-10 border-t border-white/10 pt-6 flex flex-wrap justify-center gap-4">
          <Link to="/pricing" className={buttonOutline}>
            ← Back to Pricing
          </Link>
          <Link to="/" className={buttonOutline}>
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
