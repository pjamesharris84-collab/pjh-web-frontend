import { Link } from "react-router-dom";
import SEO from "../../components/SEO.jsx";

export default function Terms() {
  return (
    <div className="min-h-screen bg-pjh-slate text-pjh-light font-outfit">
      <SEO
        title="Terms & Conditions | PJH Web Services"
        description="Review the terms and conditions governing PJH Web Services’ website design, CRM systems, and digital solutions across the UK."
        url="https://www.pjhwebservices.co.uk/terms"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-pjh-gray p-8 rounded-2xl border border-white/10 shadow-lg space-y-8">
          <h1 className="text-3xl font-bold text-pjh-blue">Terms & Conditions</h1>
          <p className="text-sm text-pjh-muted">Last updated: 28/09/2025</p>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">1. Introduction</h2>
            <p className="text-pjh-light/80">
              By accessing or engaging with PJH Web Services, you agree to abide by these
              Terms & Conditions. Please read them carefully before using our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">2. Customer Agreements</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>All work will be completed as agreed in writing (proposals or quotes).</li>
              <li>Clients must supply accurate and timely content and approvals.</li>
              <li>Project timelines may vary based on revisions or scope changes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">3. Payment Terms</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>50% deposit required before work begins.</li>
              <li>Final payment due prior to project launch.</li>
              <li>Late payments may result in service suspension.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">4. Refund Policy</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>Deposits are non-refundable once work has begun.</li>
              <li>If cancelled mid-project, client will be invoiced for completed work.</li>
              <li>Delivered and approved projects are non-refundable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">5. Intellectual Property</h2>
            <p className="text-pjh-light/80">
              All intellectual property (code, content, designs) remains the property of PJH
              Web Services until full payment is received. Upon settlement, ownership transfers
              to the client except for third-party assets or stock resources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">6. Revisions & Changes</h2>
            <p className="text-pjh-light/80">
              Minor revisions are included as agreed. Major changes beyond the scope may
              incur additional fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">7. Maintenance & Support</h2>
            <p className="text-pjh-light/80">
              Maintenance and updates are offered separately. PJH Web Services is not liable
              for issues resulting from third-party software, hosting, or client-side edits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">8. Limitation of Liability</h2>
            <p className="text-pjh-light/80">
              PJH Web Services will not be liable for data loss, downtime, or indirect damages.
              Our total liability is limited to the project amount paid by the client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">9. Termination</h2>
            <p className="text-pjh-light/80">
              Services may be suspended or terminated for non-payment or breach of terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">10. Governing Law</h2>
            <p className="text-pjh-light/80">
              These terms are governed by the laws of England & Wales. Any disputes will be
              handled under their exclusive jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">11. Contact Us</h2>
            <p className="text-pjh-light/80">
              Email: hello@pjhwebservices.co.uk<br />
              Phone: 07587 707981
            </p>
          </section>

          <div className="pt-6">
            <Link to="/" className="btn-secondary inline-block">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
