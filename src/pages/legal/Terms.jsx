/**
 * ============================================================
 * PJH Web Services — Terms & Conditions (2025)
 * ============================================================
 * Applies to website design, CRM systems, digital marketing,
 * and all related PJH Web Services deliverables.
 * Styled with unified blue/white legal design system.
 * ============================================================
 */

import { Link } from "react-router-dom";
import SEO from "../../components/SEO.jsx";

export default function Terms() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-outfit">
      <SEO
        title="Terms & Conditions | PJH Web Services"
        description="Review the full Terms & Conditions governing PJH Web Services’ website design, CRM, and digital solutions — aligned with UK law and fair business practice."
        url="https://www.pjhwebservices.co.uk/legal/terms"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <article className="bg-slate-900/70 p-10 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm space-y-10">
          <header>
            <h1 className="text-4xl font-bold text-blue-400 mb-2">
              Terms & Conditions
            </h1>
            <p className="text-sm text-gray-400">
              Last updated: 28 September 2025 — Version 2025-01
            </p>
          </header>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or engaging with <b>PJH Web Services</b>, you agree
              to these Terms & Conditions. These govern all website design,
              hosting, CRM, and digital services provided by us.  
              Please read them carefully before commissioning any work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              2. Proposals & Client Obligations
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1 leading-relaxed">
              <li>
                All work will be undertaken in accordance with the written
                proposal, quote, or service agreement issued by PJH Web Services.
              </li>
              <li>
                Clients must provide timely feedback, content, and approvals to
                prevent project delays.
              </li>
              <li>
                Any delays caused by client inaction may extend delivery dates
                and affect agreed milestones.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              3. Payment Terms
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1 leading-relaxed">
              <li>
                A <b>50% deposit</b> is required before design or development
                work begins unless otherwise agreed in writing.
              </li>
              <li>
                Remaining balances are due prior to website launch or delivery of
                final assets.
              </li>
              <li>
                Monthly or subscription plans are billed automatically via{" "}
                <Link
                  to="/legal/direct-debit-policy"
                  className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
                >
                  Direct Debit or Stripe
                </Link>{" "}
                under the terms of the client’s selected plan.
              </li>
              <li>
                Late payments may incur a <b>5% late fee</b> and may result in
                service suspension until payment is received.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              4. Refund Policy
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1 leading-relaxed">
              <li>
                Deposits are non-refundable once any design, planning, or
                development work has commenced.
              </li>
              <li>
                If a project is cancelled mid-way, the client will be invoiced for
                all work completed up to that point.
              </li>
              <li>
                Approved or delivered projects are considered final and are not
                eligible for refunds.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              5. Intellectual Property
            </h2>
            <p className="text-gray-300 leading-relaxed">
              All code, designs, and creative content remain the property of{" "}
              <b>PJH Web Services</b> until full payment has been received.
              Upon full settlement, ownership of the completed website and
              associated assets transfers to the client, excluding any
              third-party or licensed resources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              6. Revisions & Scope Changes
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Projects include a reasonable number of design revisions as outlined
              in the proposal. Substantial changes beyond the agreed scope will be
              quoted separately and may affect delivery timelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              7. Maintenance & Support
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Ongoing maintenance, hosting, and technical support are not included
              unless specified in your quote or subscription plan.  
              Clients may opt into a{" "}
              <Link
                to="/maintenance"
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
              >
                PJH WebCare Maintenance Plan
              </Link>{" "}
              for updates, monitoring, and priority support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-300 leading-relaxed">
              PJH Web Services shall not be liable for indirect, incidental, or
              consequential damages, including data loss, downtime, or loss of
              revenue.  
              Our total liability is limited to the total amount paid for the
              project or service in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              9. Termination & Suspension
            </h2>
            <p className="text-gray-300 leading-relaxed">
              PJH Web Services may suspend or terminate any agreement if the
              client fails to comply with these terms, engage in abusive conduct,
              or fail to pay due invoices. Clients must provide written notice to
              terminate ongoing monthly services per the terms of their plan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              10. Confidentiality & Data Protection
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Both parties agree to treat all project information as confidential.
              Data will be handled in accordance with the{" "}
              <Link
                to="/legal/privacy"
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
              >
                Privacy Policy
              </Link>{" "}
              and the <i>UK GDPR</i>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              11. Governing Law
            </h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms & Conditions are governed by the laws of{" "}
              <b>England & Wales</b>.  
              Disputes will be resolved exclusively in the courts of England.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              12. Contact
            </h2>
            <p className="text-gray-300 leading-relaxed">
              For any questions or disputes relating to these terms:<br />
              <a
                href="mailto:hello@pjhwebservices.co.uk"
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
              >
                hello@pjhwebservices.co.uk
              </a>
              <br />
              Phone: 07587 707981
            </p>
          </section>

          <footer className="pt-8 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500 mb-6">
              © {new Date().getFullYear()} PJH Web Services — Suffolk, United
              Kingdom.  
              Compliant with the <i>Consumer Rights Act 2015</i> and{" "}
              <i>Supply of Goods and Services Act 1982</i>.
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
