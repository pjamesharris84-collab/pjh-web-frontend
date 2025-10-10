/**
 * ============================================================
 * PJH Web Services — Cookies Policy (2025)
 * ============================================================
 * Unified blue/white premium design system.
 * Professional, readable layout with consistent styling.
 * ============================================================
 */

import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

export default function Cookies() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-outfit">
      <SEO
        title="Cookies Policy | PJH Web Services"
        description="Learn how PJH Web Services uses cookies to enhance your browsing experience, improve performance, and provide secure functionality."
        url="https://www.pjhwebservices.co.uk/cookies"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <article className="bg-slate-900/70 p-10 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-bold text-blue-400 mb-2">
              Cookies Policy
            </h1>
            <p className="text-sm text-gray-400">Last updated: 28/09/2025</p>
          </header>

          {/* Sections */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              1. What Are Cookies?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Cookies are small text files stored on your device to help websites
              function efficiently, enhance performance, and provide usage insights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              2. How We Use Cookies
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-2 leading-relaxed">
              <li>Enable essential site functionality.</li>
              <li>Track anonymous analytics to improve performance.</li>
              <li>Personalise user experience and preferences.</li>
              <li>Enhance security and detect misuse or fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              3. Types of Cookies
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-2 leading-relaxed">
              <li>
                <strong className="text-white">Essential:</strong> Required for
                site operation.
              </li>
              <li>
                <strong className="text-white">Performance:</strong> Collect
                anonymous analytics data.
              </li>
              <li>
                <strong className="text-white">Functionality:</strong> Remember
                settings and preferences.
              </li>
              <li>
                <strong className="text-white">Third-Party:</strong> Used by
                analytics or embedded tools.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              4. Managing Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed">
              You can manage or disable cookies through your browser settings.
              Some features may not work correctly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              5. Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Email:{" "}
              <a
                href="mailto:info@pjhwebservices.co.uk"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                info@pjhwebservices.co.uk
              </a>
              <br />
              Phone:{" "}
              <a
                href="tel:+447587707981"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                07587 707981
              </a>
            </p>
          </section>

          {/* CTA / Footer */}
          <div className="pt-8 text-center border-t border-white/10">
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30"
            >
              🏠 Back to Home
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
