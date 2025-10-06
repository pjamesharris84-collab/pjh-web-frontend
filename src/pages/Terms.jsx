import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Terms() {
  return (
    <div className="min-h-screen bg-pjh-slate text-pjh-light font-outfit">
      {/* ✅ SEO Metadata */}
      <SEO
        title="Terms & Conditions | PJH Web Services"
        description="Review the terms and conditions for using PJH Web Services’ website design, CRM development, and digital branding services in the UK."
        url="https://www.pjhwebservices.co.uk/terms"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-pjh-gray p-8 rounded-2xl border border-white/10 shadow-lg space-y-8">
          <h1 className="text-3xl font-bold text-pjh-blue">Terms & Conditions</h1>
          <p className="text-sm text-pjh-muted">Last updated: 28/09/2025</p>

          {/* Sections */}
          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">1. Introduction</h2>
            <p className="text-pjh-light/80">
              Welcome to PJH Web Services. These Terms and Conditions (“Terms”) govern the use of our
              website, products, and services. By using our website or engaging our services, you
              agree to comply with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">2. Customer Agreements</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>All work will be completed as agreed in writing (quotes or proposals).</li>
              <li>Clients must provide accurate information, materials, and feedback promptly.</li>
              <li>Project timelines are estimates and may vary with revisions or scope changes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">3. Payment Terms</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>A deposit (typically 50%) is required before work begins.</li>
              <li>Final payment is due upon project completion, prior to launch.</li>
              <li>Late payments may result in suspension of services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">4. Refund Policy</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>Deposits are non-refundable once project work has commenced.</li>
              <li>If cancelled, the client will be billed for completed work to date.</li>
              <li>Delivered and approved projects are non-refundable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">5. Intellectual Property</h2>
            <p className="text-pjh-light/80">
              All intellectual property rights in code, designs, and content remain the property of
              PJH Web Services until full payment is received. Once paid, ownership transfers to the
              client, except for third-party assets or software.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">6. Revisions & Changes</h2>
            <p className="text-pjh-light/80">
              Minor revisions are included as outlined in your project scope. Significant or
              additional changes beyond the agreed scope may incur extra charges.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">7. Ongoing Support & Maintenance</h2>
            <p className="text-pjh-light/80">
              Maintenance and support are available as separate packages. PJH Web Services is not
              responsible for issues caused by third-party integrations or client-side edits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">8. Limitation of Liability</h2>
            <p className="text-pjh-light/80">
              While we aim for reliability and uptime, PJH Web Services cannot be held liable for
              data loss, downtime, or damages caused by third-party providers. Our liability is
              limited to the total amount paid for the affected service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">9. Termination</h2>
            <p className="text-pjh-light/80">
              We reserve the right to suspend or terminate services if payments are missed or these
              Terms are breached.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">10. Governing Law</h2>
            <p className="text-pjh-light/80">
              These Terms are governed by the laws of England and Wales. Any disputes shall be
              resolved under the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">11. Contact Us</h2>
            <p className="text-pjh-light/80">
              Email: hello@pjhwebservices.co.uk
              <br />
              Phone: 07587 707981
            </p>
          </section>

          {/* Back to Home */}
          <div className="pt-6">
            <Link to="/" className="btn-secondary inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
