/**
 * ============================================================
 * PJH Web Services — Payment Success Page (2025)
 * ============================================================
 * Unified blue/white premium design system.
 * Elegant, celebratory tone with admin auto-redirect.
 * ============================================================
 */

import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const type = params.get("type");

  useEffect(() => {
    console.log(`✅ Payment success for order ${orderId} (${type})`);

    // 🧭 Auto-refresh admin if logged in
    if (localStorage.getItem("isAdmin") === "true" && orderId) {
      setTimeout(() => {
        window.location.href = `/admin/orders/${orderId}`;
      }, 2500);
    }
  }, [orderId, type]);

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
        <h1 className="text-3xl font-bold text-emerald-400 mb-4">
          Payment Successful 🎉
        </h1>

        {/* Message */}
        <p className="text-gray-300 leading-relaxed mb-8">
          Thank you for your{" "}
          <span className="font-semibold text-blue-300">{type}</span> payment
          for order{" "}
          <span className="font-semibold text-blue-300">#{orderId}</span>.
          <br />
          A receipt has been emailed to you.
        </p>

        {/* CTA */}
        <a
          href="/"
          className="inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30"
        >
          🏠 Return to Website
        </a>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-gray-500">
        © {new Date().getFullYear()} PJH Web Services — All rights reserved.
      </p>
    </main>
  );
}
