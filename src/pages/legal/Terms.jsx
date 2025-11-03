/**
 * ============================================================
 * PJH Web Services — Terms & Conditions (2025, VAT-Registered)
 * ============================================================
 * Applies to website design, CRM systems, digital marketing,
 * and all related PJH Web Services deliverables.
 * Updated for VAT registration, dual pricing & invoicing compliance.
 * ============================================================
 */

import { Link } from "react-router-dom";
import SEO from "../../components/SEO.jsx";

export default function Terms() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-outfit">
      <SEO
        title="Terms & Conditions | PJH Web Services"
        description="Review the full Terms & Conditions governing PJH Web Services’ VAT-inclusive website design, CRM, and digital services — aligned with UK law and fair business practice."
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
              Last updated: 3 November 2025 — Version 2025-11
            </p>
          </header>

          {/* 1. INTRODUCTION */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or engaging with <b>PJH Web Services</b>, you agree
              to these Terms & Conditions. These govern all website design,
              hosting, CRM, automation, and digital services provided by us.  
              Please read them carefully before commissioning any work.
            </p>
          </section>

          {/* 2. PROPOSALS */}
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
                avoid unnecessary project delays.
              </li>
              <li>
                Delays caused by client inaction or late responses may extend
                agreed milestones and delivery timelines.
              </li>
            </ul>
          </section>

          {/* 3. PAYMENT TERMS */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              3. Payment Terms & VAT
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-2 leading-relaxed">
              <li>
                PJH Web Services is a{" "}
                <b>VAT-registered business (GB503&nbsp;3476&nbsp;17)</b>. All
                quoted prices are <b>exclusive of VAT</b> unless clearly stated
                otherwise.  
                VAT is charged at the prevailing UK rate (currently 20%) and
                will be itemised separately on all invoices.
              </li>
              <li>
                A <b>50% deposit</b> (plus VAT) is required before design or
                development work begins unless otherwise agreed in writing.
              </li>
              <li>
                Remaining balances (plus VAT) are due prior to website launch or
                delivery of final assets.
              </li>
              <li>
                Monthly or subscription plans are billed automatically via{" "}
                <Link
                  to="/legal/direct-debit-policy"
                  className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
                >
                  Direct Debit or Stripe
                </Link>{" "}
                under the client’s selected plan. A VAT invoice will be issued
                for every transaction.
              </li>
              <li>
                Late payments may incur a <b>5% late fee</b> and/or suspension
                of services until full payment (including VAT) is received.
              </li>
              <li>
                VAT-registered clients may reclaim VAT where eligible in
                accordance with <i>HMRC VAT Notice&nbsp;700/1</i>.
              </li>
            </ul>
          </section>

          {/* 4. REFUND POLICY */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              4. Refund Policy
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-2 leading-relaxed">
              <li>
                Deposits are non-refundable once design, planning, or
                development work has commenced.
              </li>
              <li>
                If a project is cancelled mid-way, the client will be invoiced
                for all work completed up to that date, plus applicable VAT.
              </li>
              <li>
                Completed or delivered projects are deemed final and not
                eligible for refund.
              </li>
            </ul>
          </section>

          {/* 5. INTELLECTUAL PROPERTY */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              5. Ownership & Intellectual Property
            </h2>
            <p className="text-gray-300 leading-relaxed">
              All code, design files, and creative assets remain the property of{" "}
              <b>PJH Web Services</b> until all invoices (including VAT) have
              been paid in full.  
              Upon settlement, ownership of the completed website transfers to
              the client, excluding any third-party licensed components.
            </p>
          </section>

          {/* 6. REVISIONS */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              6. Revisions & Scope Changes
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Projects include a reasonable number of revisions as defined in
              your proposal. Significant changes beyond the agreed scope will be
              quoted separately (plus VAT) and may affect delivery schedules.
            </p>
          </section>

          {/* 7. MAINTENANCE */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              7. Maintenance & Support
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Ongoing maintenance, hosting, or technical support are provided
              only if included in your proposal or{" "}
              <Link
                to="/maintenance"
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
              >
                WebCare plan
              </Link>
              .  
              All maintenance subscriptions are subject to VAT at the prevailing
              rate.
            </p>
          </section>

          {/* 8. LIABILITY */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-300 leading-relaxed">
              PJH Web Services will provide services with reasonable skill and
              care. We are not liable for indirect or consequential loss,
              including data loss, downtime, or lost revenue.  
              Our total liability is limited to the total net fees (exclusive of
              VAT) paid within the 12 months preceding any claim.
            </p>
          </section>

          {/* 9. TERMINATION */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              9. Termination & Suspension
            </h2>
            <p className="text-gray-300 leading-relaxed">
              PJH Web Services reserves the right to suspend or terminate any
              service if the client breaches these terms, engages in abusive
              behaviour, or fails to make payment.  
              Clients may request termination of monthly plans in writing, in
              accordance with their agreement and{" "}
              <Link
                to="/legal/monthly-terms"
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
              >
                Monthly Plan Terms
              </Link>
              .
            </p>
          </section>

          {/* 10. CONFIDENTIALITY */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              10. Confidentiality & Data Protection
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Both parties agree to handle all project and customer data in
              accordance with the{" "}
              <Link
                to="/legal/privacy"
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
              >
                Privacy Policy
              </Link>{" "}
              and the <i>UK&nbsp;GDPR</i>.  
              PJH Web Services operates under strict confidentiality and will
              not share client data without consent or legal requirement.
            </p>
          </section>

          {/* 11. GOVERNING LAW */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              11. Governing Law
            </h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms & Conditions are governed by the laws of{" "}
              <b>England&nbsp;&amp;&nbsp;Wales</b>.  
              All disputes will be resolved exclusively through the courts of
              England.
            </p>
          </section>

          {/* 12. CONTACT */}
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              12. Contact
            </h2>
            <p className="text-gray-300 leading-relaxed">
              For questions regarding these terms:<br />
              <a
                href="mailto:hello@pjhwebservices.co.uk"
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
              >
                hello@pjhwebservices.co.uk
              </a>
              <br />
              Phone: 07587&nbsp;707981
            </p>
          </section>

          {/* FOOTER */}
          <footer className="pt-8 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500 mb-6">
              © {new Date().getFullYear()} PJH Web Services — Suffolk, United
              Kingdom.  
              VAT Registration No: GB503&nbsp;3476&nbsp;17.  
              Prices are shown exclusive of VAT with inclusive figures displayed
              for clarity.  
              Compliant with the <i>Consumer Rights Act&nbsp;2015</i>,{" "}
              <i>Supply of Goods and Services Act&nbsp;1982</i>, and{" "}
              <i>HMRC VAT Notice&nbsp;700/1</i>.
            </p>

            <Link
              to="/"
              className="inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30"
            >
              Back to Home
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}
