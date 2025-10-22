import React from "react";
import SEO from "../components/SEO";

export default function SuffolkBusinessDirectory() {
  return (
    <section className="bg-slate-950 text-gray-100 min-h-screen py-16 px-6 flex flex-col items-center justify-center text-center">
      <SEO
        title="Suffolk Business Directory | PJH Web Services"
        description="The Suffolk Business Directory by PJH Web Services — a curated showcase of local businesses and bespoke web projects. Coming soon."
        url="https://www.pjhwebservices.co.uk/suffolk-business-directory"
      />

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            ← Back to Home
          </a>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-blue-400 mb-6">
          Suffolk Business Directory
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          A new showcase of Suffolk businesses and bespoke websites — designed and
          built by PJH Web Services.
        </p>

        <div className="bg-slate-900 border border-white/10 rounded-2xl p-10 shadow-lg hover:shadow-blue-900/20 transition-all duration-300">
          <h2 className="text-3xl font-semibold text-white mb-4">Coming Soon</h2>
          <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed">
            We’re currently building this section to feature trusted local businesses
            and PJH Web Services projects across Suffolk.
          </p>
        </div>
      </div>
    </section>
  );
}
