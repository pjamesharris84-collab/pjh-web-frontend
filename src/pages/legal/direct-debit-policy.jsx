/**
 * ============================================================
 * PJH Web Services — Direct Debit Terms & Guarantee (2025)
 * ============================================================
 * Unified with blue/white premium design system.
 * Matches legal and marketing page aesthetics.
 * ============================================================
 */

import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

export default function DirectDebitPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-outfit">
      <SEO
        title="Direct Debit Terms & Guarantee | PJH Web Services"
        description="Learn how PJH Web Services manages Direct Debit payments securely via Stripe, including your rights under the Direct Debit Guarantee."
        url="https://www.pjhwebservices.co.uk/legal/direct-debit-policy"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <article className="bg-slate-900/70 p-10 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-bold text-blue-400 mb-2">
              Direct Debit Terms & Guarantee
            </h1>
            <p className="text-sm text-gray-400">
              Applies to all PJH Web Services clients paying via Direct Debit.
            </p>
          </header>

          {/* Sections */}
          <section className="space-y-8 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                1. Direct Debit Setup
              </h2>
              <p>
                By authorising a Direct Debit mandate through our secure payment
                processor (Stripe), you permit PJH Web Services to collect
                recurring payments from your nominated bank account in accordance
                with your agreed package and payment schedule. All mandates are
                processed under the UK BACS scheme.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                2. Advance Notice
              </h2>
              <p>
                You will receive advance notice by email at least three (3)
                working days before any Direct Debit is collected, detailing the
                amount and date of the payment. You should check this notice and
                contact us immediately if any details are incorrect.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                3. The Direct Debit Guarantee
              </h2>
              <p>
                The Direct Debit Guarantee is offered by all banks and building
                societies that accept instructions to pay Direct Debits. If there
                are any changes to the amount, date, or frequency of your Direct
                Debit, PJH Web Services (via Stripe Payments UK, Ltd.) will notify
                you in advance of your account being debited or as otherwise
                agreed. If an error is made in the payment of your Direct Debit,
                by PJH Web Services, Stripe, or your bank, you are entitled to a
                full and immediate refund from your bank or building society.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                4. Cancellations
              </h2>
              <p>
                You may cancel your Direct Debit at any time by contacting your
                bank or building society. Please also notify PJH Web Services in
                writing to avoid interruption of service. Cancellation before your
                minimum term may result in early termination charges as detailed
                in your service agreement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                5. Failed or Rejected Payments
              </h2>
              <p>
                If a Direct Debit payment fails or is returned unpaid, PJH Web
                Services reserves the right to suspend services until payment is
                received. Repeated failed payments may incur late fees or service
                suspension, as outlined in our standard terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                6. Data & Security
              </h2>
              <p>
                All payment data and mandates are managed securely by Stripe
                Payments UK, Ltd., an FCA-authorised payment institution. PJH Web
                Services does not store or have access to your bank details.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                7. Contact
              </h2>
              <p>
                For questions about your Direct Debit or to update your details,
                please email{" "}
                <a
                  href="mailto:info@pjhwebservices.co.uk"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  info@pjhwebservices.co.uk
                </a>{" "}
                or write to PJH Web Services, Suffolk, United Kingdom.
              </p>
            </div>
          </section>

          {/* Footer / Navigation */}
          <footer className="pt-8 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500 mb-6">
              Last updated: October 2025 — Version DD-1.0
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
