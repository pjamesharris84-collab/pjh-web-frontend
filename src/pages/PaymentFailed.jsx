/**
 * ============================================================
 * PJH Web Services — Payment Failed Page (2025)
 * ============================================================
 * Unified with the blue/white premium design system.
 * Replaces harsh red tone with elegant blue-accented failure state.
 * ============================================================
 */

import { useSearchParams } from "react-router-dom";

export default function PaymentFailed() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const type = params.get("type");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white px-6 text-center">
      <div className="max-w-md w-full bg-slate-900/70 border border-white/10 rounded-2xl p-10 shadow-xl backdrop-blur-sm">
        {/* Logo */}
        <img
          src="/pjh-logo-light.png"
          alt="PJH Web Services"
          className="mx-auto w-28 mb-8 drop-shadow-xl"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold text-red-400 mb-4">
          Payment Failed ❌
        </h1>

        {/* Message */}
        <p className="text-gray-300 leading-relaxed mb-8">
          Your{" "}
          <span className="font-semibold text-blue-300">{type}</span> payment
          for order{" "}
          <span className="font-semibold text-blue-300">#{orderId}</span> was
          not successful.
          <br />
          Please check your card details and try again.
        </p>

        {/* CTA */}
        <a
          href="/"
          className="inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30"
        >
          🔁 Try Again
        </a>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-gray-500">
        © {new Date().getFullYear()} PJH Web Services — All rights reserved.
      </p>
    </main>
  );
}
