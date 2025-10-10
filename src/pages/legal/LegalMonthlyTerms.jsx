/**
 * ============================================================
 * PJH Web Services — Monthly Plan Terms (2025)
 * ============================================================
 * Unified premium design system with legal & compliance updates.
 * Covers all recurring services including WebCare maintenance plans.
 * Aligned with UK law & industry standards.
 * ============================================================
 */

import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

export default function LegalMonthlyTerms() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-outfit">
      <SEO
        title="Monthly Website & Care Plan Terms | PJH Web Services"
        description="Review PJH Web Services’ monthly website and WebCare plan terms — including payment conditions, ownership, and cancellation rights in line with UK consumer law."
        url="https://www.pjhwebservices.co.uk/legal/monthly-terms"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <article className="bg-slate-900/70 p-10 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm space-y-10">
          <header>
            <h1 className="text-4xl font-bold text-blue-400 mb-2">
              Monthly Website & Care Plan Terms
            </h1>
            <p className="text-sm text-gray-400">
              Applicable to PJH Web Services monthly build, hosting, and WebCare
              maintenance subscriptions. Version 2025-01.
            </p>
          </header>

          <ol className="list-decimal ml-6 space-y-8 text-gray-300 leading-relaxed">
            <li>
              <strong className="text-blue-400">Eligibility & Deposit</strong>
              <br />
              The first <b>month’s payment</b> is due upfront before any design,
              development, or setup work begins. Work will commence only once
              payment has cleared. Plans are available exclusively for websites
              built or managed by <b>PJH Web Services</b>.
            </li>

            <li>
              <strong className="text-blue-400">Minimum Term</strong>
              <br />
              For website design & build subscriptions, the standard minimum
              term is <b>24 months</b> unless otherwise agreed in writing.  
              Maintenance (WebCare) plans renew monthly on a rolling basis after
              a <b>minimum 3-month commitment</b>.
            </li>

            <li>
              <strong className="text-blue-400">Payments & Processing</strong>
              <br />
              Payments are collected automatically via <b>Stripe Direct Debit or
              card</b> on or before the agreed date each month.  
              All Direct Debit mandates are protected by the{" "}
              <Link
                to="/legal/direct-debit-policy"
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
              >
                Direct Debit Guarantee
              </Link>.
            </li>

            <li>
              <strong className="text-blue-400">Late or Failed Payments</strong>
              <br />
              Invoices not paid within <b>7 days</b> of the due date may incur a{" "}
              <b>5% late fee</b>. Repeated failed payments may result in
              suspension of services or removal of site hosting until balances
              are settled. Interest may accrue under the{" "}
              <i>Late Payment of Commercial Debts (Interest) Act 1998</i>.
            </li>

            <li>
              <strong className="text-blue-400">Ownership & Intellectual Property</strong>
              <br />
              All code, design, and digital assets remain the property of{" "}
              <b>PJH Web Services</b> until the full term has been paid.  
              Full ownership transfers once all instalments are complete and
              the account is in good standing.
            </li>

            <li>
              <strong className="text-blue-400">Early Termination</strong>
              <br />
              Cancellation before the end of the agreed minimum term will incur
              an <b>early exit fee</b> equal to <b>40% of the remaining contract
              value</b> or the total outstanding balance, whichever is lower.
            </li>

            <li>
              <strong className="text-blue-400">Cancellation Policy</strong>
              <br />
              WebCare maintenance plans can be cancelled with <b>30 days’ written
              notice</b> after the minimum commitment.  
              Website build subscriptions cannot be cancelled mid-term without
              settlement of early exit fees.
            </li>

            <li>
              <strong className="text-blue-400">Scope of Service</strong>
              <br />
              Monthly plans include only the features and deliverables described
              in your proposal, quote, or chosen package. Major redesigns,
              integrations, or custom modules will be quoted separately.
            </li>

            <li>
              <strong className="text-blue-400">Support & Maintenance</strong>
              <br />
              All active subscribers receive essential updates, security
              monitoring, and priority email support.  
              Additional WebCare plan benefits — such as performance audits,
              content updates, or SEO reporting — are defined by your selected
              package.
            </li>

            <li>
              <strong className="text-blue-400">Data Protection & Privacy</strong>
              <br />
              PJH Web Services complies with the{" "}
              <i>UK GDPR</i> and <i>Data Protection Act 2018</i>.  
              Client and end-user data are handled securely and used only for
              service delivery purposes. See our{" "}
              <Link
                to="/legal/privacy"
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
              >
                Privacy Policy
              </Link>{" "}
              for full details.
            </li>

            <li>
              <strong className="text-blue-400">Liability & Warranty</strong>
              <br />
              Services are provided with reasonable skill and care. PJH Web
              Services is not liable for indirect, incidental, or consequential
              loss.  
              Total liability is limited to the total fees paid during the
              previous <b>12 months</b>.
            </li>

            <li>
              <strong className="text-blue-400">Governing Law</strong>
              <br />
              These terms are governed by the laws of <b>England & Wales</b>.
              Disputes will be handled exclusively by the courts of England.
            </li>
          </ol>

          <footer className="pt-8 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500 mb-6">
              Version 2025-01 — PJH Web Services reserves the right to amend
              these terms with prior notice.  
              Aligned with the <i>Consumer Rights Act 2015</i> and{" "}
              <i>Consumer Contracts Regulations 2013</i>.
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
