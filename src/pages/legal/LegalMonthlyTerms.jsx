/**
 * ============================================================
 * PJH Web Services — Monthly Plan Terms (2025, VAT-Registered)
 * ============================================================
 * Updated November 2025
 *  • Added VAT clauses and transparency for all monthly plans
 *  • Clarified invoicing, VAT rates, and inclusive/exclusive pricing
 *  • Aligned with HMRC guidance and UK consumer law
 * ============================================================
 */

import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

export default function LegalMonthlyTerms() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-outfit">
      <SEO
        title="Monthly Website & Care Plan Terms | PJH Web Services"
        description="Review PJH Web Services’ VAT-inclusive monthly website and WebCare plan terms — including payment conditions, ownership, and cancellation rights in line with UK law."
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
              Applicable to PJH Web Services monthly website build, hosting, and
              WebCare maintenance subscriptions. Version 2025-11.
            </p>
          </header>

          <ol className="list-decimal ml-6 space-y-8 text-gray-300 leading-relaxed">
            <li>
              <strong className="text-blue-400">Eligibility & Deposit</strong>
              <br />
              The first <b>month’s payment</b> (including VAT where applicable)
              is due upfront before any design, development, or setup work
              begins. Work will commence only once payment has cleared. Plans
              are available exclusively for websites built or managed by{" "}
              <b>PJH Web Services</b>.
            </li>

            <li>
              <strong className="text-blue-400">VAT & Pricing Transparency</strong>
              <br />
              PJH Web Services is a <b>VAT-registered business (GB503&nbsp;3476&nbsp;17)</b>.{" "}
              All prices displayed on our website, proposals, and invoices are{" "}
              <b>exclusive of VAT</b> with <b>inclusive figures shown for clarity</b>.{" "}
              VAT is applied at the current UK rate of <b>20%</b> and will appear
              as a separate line item on all invoices.  
              VAT-registered clients may reclaim this amount in accordance with
              HMRC rules.
            </li>

            <li>
              <strong className="text-blue-400">Minimum Term</strong>
              <br />
              Website design and build subscriptions have a standard minimum
              term of <b>24 months</b> unless otherwise agreed in writing.  
              Maintenance (WebCare) plans renew monthly on a rolling basis after
              a <b>minimum 3-month commitment</b>.
            </li>

            <li>
              <strong className="text-blue-400">Payments & Invoicing</strong>
              <br />
              Payments are collected automatically each month via{" "}
              <b>Stripe Direct&nbsp;Debit or card</b> on or before the agreed
              billing date.  
              A VAT invoice is issued for every transaction and will show the
              net amount, VAT rate, VAT total, and gross total clearly.  
              All Direct Debit mandates are covered by the{" "}
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
              Invoices not settled within <b>7 days</b> of the due date may
              incur a <b>5% late fee</b>. Repeated failed payments may result in
              temporary suspension of hosting or maintenance services until
              balances are cleared.  
              Statutory interest may also accrue under the{" "}
              <i>Late Payment of Commercial Debts (Interest) Act 1998</i>.
            </li>

            <li>
              <strong className="text-blue-400">
                Ownership & Intellectual Property
              </strong>
              <br />
              All source code, design files, and digital assets remain the
              property of <b>PJH Web Services</b> until all instalments (plus
              applicable VAT) are fully paid.  
              Full ownership transfers to the client once all payments have been
              received and the account is in good standing.
            </li>

            <li>
              <strong className="text-blue-400">Early Termination</strong>
              <br />
              Cancelling before the end of the minimum term will incur an{" "}
              <b>early exit fee</b> equal to <b>40% of the remaining contract
              value (plus VAT)</b> or the total outstanding balance, whichever
              is lower.  
              This ensures design, setup, and hosting costs are fairly covered.
            </li>

            <li>
              <strong className="text-blue-400">Cancellation Policy</strong>
              <br />
              WebCare maintenance plans can be cancelled with{" "}
              <b>30 days’ written notice</b> after the minimum commitment.  
              Website build subscriptions cannot be cancelled mid-term without
              settlement of early exit fees.
            </li>

            <li>
              <strong className="text-blue-400">Scope of Service</strong>
              <br />
              Monthly subscriptions include only the features and deliverables
              outlined in your signed proposal, quote, or selected package.
              Major redesigns, new integrations, or advanced automation will be
              quoted separately and subject to VAT.
            </li>

            <li>
              <strong className="text-blue-400">Support & Maintenance</strong>
              <br />
              Active subscribers receive ongoing updates, security monitoring,
              and essential email support.  
              Additional WebCare plan benefits — such as performance reporting,
              SEO monitoring, or monthly edits — depend on your chosen plan
              tier.
            </li>

            <li>
              <strong className="text-blue-400">Data Protection & Privacy</strong>
              <br />
              PJH Web Services complies with the{" "}
              <i>UK&nbsp;GDPR</i> and the{" "}
              <i>Data Protection Act&nbsp;2018</i>. Client and end-user data are
              processed securely and only for legitimate service purposes.  
              Please see our{" "}
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
              Services are provided with reasonable skill and care.  
              PJH Web Services is not liable for indirect or consequential loss,
              including loss of income or data.  
              Total liability is limited to the total net fees (exclusive of VAT)
              paid during the previous <b>12 months</b>.
            </li>

            <li>
              <strong className="text-blue-400">Governing Law</strong>
              <br />
              These terms are governed by the laws of <b>England&nbsp;&nbsp;&amp;&nbsp;Wales</b>.  
              Any disputes will be handled exclusively by the courts of England.
            </li>
          </ol>

          <footer className="pt-8 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500 mb-6">
              Version&nbsp;2025-11 — PJH Web Services is VAT-registered under
              GB503&nbsp;3476&nbsp;17.  
              Prices are shown exclusive of VAT with inclusive figures displayed
              for clarity.  
              Aligned with the <i>Consumer Rights Act&nbsp;2015</i>,{" "}
              <i>Consumer Contracts Regulations&nbsp;2013</i>, and{" "}
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
