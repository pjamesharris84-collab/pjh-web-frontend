/**
 * ============================================================
 * PJH Web Services — Privacy Policy (2025)
 * ============================================================
 * Styled in the unified blue/white design system.
 * Fully aligned with UK GDPR & Data Protection Act 2018.
 * ============================================================
 */

import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-outfit">
      <SEO
        title="Privacy Policy | PJH Web Services"
        description="Learn how PJH Web Services collects, uses, and protects your personal data in accordance with UK GDPR and the Data Protection Act 2018."
        url="https://www.pjhwebservices.co.uk/legal/privacy"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <article className="bg-slate-900/70 p-10 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-bold text-blue-400 mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-400">
              Last updated: 28 September 2025 — Version 2025-01
            </p>
          </header>

          {/* Sections */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At <b>PJH Web Services</b>, we are committed to protecting your
              privacy and handling your data transparently. This policy explains
              how we collect, use, and protect personal information when you
              visit our website, make enquiries, or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              2. Information We Collect
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1 leading-relaxed">
              <li>Personal details (name, email address, telephone number).</li>
              <li>Business or project information provided during enquiries.</li>
              <li>Technical data such as IP address, browser type, and cookies.</li>
              <li>Analytics data (pages visited, session duration, traffic source).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1 leading-relaxed">
              <li>To respond to enquiries and provide requested services.</li>
              <li>To manage quotes, invoices, and client communication.</li>
              <li>To improve website usability and user experience.</li>
              <li>To meet our legal, contractual, and accounting obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              4. Cookies & Analytics
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We use cookies and analytics tools (such as Google Analytics) to
              monitor performance and improve our content. All analytics data is
              anonymised and aggregated. You can disable non-essential cookies in
              your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              5. Data Sharing
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We do not sell or rent your personal data. Information is shared
              only with trusted service partners (e.g. web hosting, payment
              processing, or analytics providers) strictly for service delivery
              and security purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              6. Data Retention
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We retain personal data only as long as necessary for the purposes
              for which it was collected — typically for active contracts or as
              required by tax, accounting, or legal obligations. Data no longer
              needed is securely deleted or anonymised.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              7. Your Rights
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1 leading-relaxed">
              <li>Access your personal data (“subject access request”).</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>Request deletion (“right to be forgotten”).</li>
              <li>Withdraw consent for optional marketing communications.</li>
              <li>Complain to the ICO if you believe your data rights are infringed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              8. Data Security
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We implement strong security measures, including SSL encryption,
              secure servers, and restricted data access. While no system is
              completely risk-free, PJH Web Services continuously reviews and
              improves its data protection protocols.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              9. International Transfers
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We primarily store and process data within the UK. If data is
              transferred outside the UK or EEA (for example, by cloud providers),
              it is safeguarded by legally recognised mechanisms such as the UK
              International Data Transfer Agreement (IDTA) or EU Standard
              Contractual Clauses (SCCs).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              10. Policy Updates
            </h2>
            <p className="text-gray-300 leading-relaxed">
              This policy may be updated to reflect changes in regulations or our
              business operations. The most recent version will always be
              available on our website with the revised “Last Updated” date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              11. Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              For questions about this Privacy Policy or to exercise your rights:
              <br />
              <a
                href="mailto:info@pjhwebservices.co.uk"
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
              >
                info@pjhwebservices.co.uk
              </a>
              <br />
              Phone: 07587 707981
            </p>
          </section>

          {/* Footer / Back to Home */}
          <footer className="pt-8 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500 mb-6">
              Compliant with the <i>UK GDPR</i> and <i>Data Protection Act 2018</i>.  
              PJH Web Services Ltd. — Suffolk, United Kingdom.
            </p>

            <Link
              to="/"
              className="inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30"
            >
              🏠 Back to Home
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}
