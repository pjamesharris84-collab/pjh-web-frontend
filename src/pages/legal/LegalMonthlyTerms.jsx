import { Link } from "react-router-dom";

export default function LegalMonthlyTerms() {
  return (
    <div className="min-h-screen bg-pjh-charcoal text-pjh-light py-20 px-6 font-outfit">
      <div className="max-w-4xl mx-auto bg-pjh-slate/50 p-10 rounded-2xl border border-white/10 shadow-lg">
        <h1 className="text-4xl font-bold text-pjh-blue mb-6">
          Monthly Website Plan Terms
        </h1>
        <p className="text-pjh-muted mb-8">
          These terms apply to PJH Web Services’ monthly website plans, covering
          payment structure, ownership rights, and cancellation conditions.
          Version 2025-01.
        </p>

        <ol className="list-decimal ml-6 space-y-6 text-pjh-light/90 text-sm leading-relaxed">
          <li>
            <strong className="text-pjh-blue">Eligibility & Deposit</strong>
            <br />
            The first <b>month’s payment</b> is due upfront before any design or
            development work begins. Work will commence only once funds have
            cleared.
          </li>

          <li>
            <strong className="text-pjh-blue">Minimum Term</strong>
            <br />
            The standard minimum term is <b>24 months</b> unless otherwise agreed
            in writing. Early termination within this period triggers an early-exit
            fee (see section 5).
          </li>

          <li>
            <strong className="text-pjh-blue">Payments & Late Fees</strong>
            <br />
            Monthly payments must be made by the agreed method (default:{" "}
            <b>Direct Debit</b>) on or before the due date. Late payments may
            incur a <b>5% late fee</b> and/or suspension of services until payment
            is received.
          </li>

          <li>
            <strong className="text-pjh-blue">Ownership & Intellectual Property</strong>
            <br />
            All website code, content, designs, and digital assets remain the
            property of <b>PJH Web Services</b> until the full contract term has
            been paid in full. Ownership transfers only after the final payment
            clears.
          </li>

          <li>
            <strong className="text-pjh-blue">Early Termination</strong>
            <br />
            Should you cancel before completing the minimum term, you agree to
            pay an early exit fee equal to <b>40% of the remaining contract
            value</b> or the total outstanding balance—whichever is lower.
          </li>

          <li>
            <strong className="text-pjh-blue">Scope & Changes</strong>
            <br />
            Monthly plans cover the features listed in your signed quote or
            selected package. Major scope changes or redesigns will require a
            new quote.
          </li>

          <li>
            <strong className="text-pjh-blue">Suspension & Termination for Breach</strong>
            <br />
            We reserve the right to suspend or terminate service in the event of
            persistent late payment, misuse, or breach of these terms. Notice
            will be provided in writing.
          </li>

          <li>
            <strong className="text-pjh-blue">Support & Maintenance</strong>
            <br />
            Routine technical support and updates are included in your monthly
            plan. Extensive feature requests, redesigns, or integrations may be
            quoted separately.
          </li>

          <li>
            <strong className="text-pjh-blue">Liability</strong>
            <br />
            PJH Web Services will deliver services with reasonable skill and
            care. Liability for indirect or consequential loss is excluded. Our
            liability is limited to fees paid within the preceding 12 months.
          </li>

          <li>
            <strong className="text-pjh-blue">Governing Law</strong>
            <br />
            These terms are governed by the laws of <b>England & Wales</b>. Any
            disputes shall be subject to the exclusive jurisdiction of the
            English courts.
          </li>
        </ol>

        <div className="mt-10 text-sm text-pjh-muted italic">
          Version 2025-01 — PJH Web Services reserves the right to update these
          terms with prior written notice for material changes.
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="btn-accent inline-block mt-4 text-lg font-semibold"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
