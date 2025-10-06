// src/pages/Terms.jsx
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

export default function Terms() {
  return (
    <div className="admin-page font-sans">
      <Helmet>
        <title>Terms & Conditions | PJH Web Services</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="admin-card space-y-8">
          {/* Heading */}
          <h1 className="admin-heading text-3xl">Terms and Conditions</h1>
          <p className="text-gray-300 text-sm">Last updated: [28/09/2025]</p>

          {/* Sections */}
          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">1. Introduction</h2>
            <p className="text-gray-300">
              Welcome to PJH Web Services. These Terms and Conditions (“Terms”) govern the
              use of our website, products, and services. By engaging with us or using our
              website, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">2. Customer Agreements</h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>All work will be carried out as agreed in writing (e.g., proposals, quotes, or contracts).</li>
              <li>Clients are responsible for providing accurate and timely information, materials, and approvals.</li>
              <li>Project timelines are estimates and may change depending on revisions or scope changes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">3. Payment Terms</h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>A deposit (usually 50%) is required before work begins.</li>
              <li>The balance is due upon completion, before the website or project goes live.</li>
              <li>Late payments may result in suspension of services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">4. Refund Policy</h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>Deposits are non-refundable once work has commenced.</li>
              <li>If a project is cancelled, the client will be invoiced for the work completed to date.</li>
              <li>Completed and delivered projects are non-refundable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">5. Intellectual Property</h2>
            <p className="text-gray-300">
              All intellectual property rights in the designs, code, and content we create
              remain the property of PJH Web Services until full payment is received. Once
              paid in full, ownership of final project deliverables transfers to the client,
              except where third-party software or stock assets are used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">6. Revisions and Changes</h2>
            <p className="text-gray-300">
              Reasonable revisions are included as agreed in the project proposal. Major
              scope changes may be subject to additional charges.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">7. Ongoing Support and Maintenance</h2>
            <p className="text-gray-300">
              Ongoing support and maintenance are not included unless specified in a
              maintenance package. We are not responsible for issues caused by third-party
              software, hosting providers, or client-side changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">8. Limitation of Liability</h2>
            <p className="text-gray-300">
              While we take care to provide secure, reliable, and functional websites, PJH
              Web Services cannot be held liable for downtime, data loss, or business
              losses caused by third parties. Our liability is limited to the amount paid
              by the client for the service in question.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">9. Termination</h2>
            <p className="text-gray-300">
              We reserve the right to terminate services if a client breaches these Terms
              or fails to make payments within agreed timeframes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">10. Governing Law</h2>
            <p className="text-gray-300">
              These Terms are governed by the laws of England and Wales. Any disputes will
              be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">11. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about these Terms, please contact us:
            </p>
            <p className="text-gray-300">Email: hello@pjhwebservices.com</p>
            <p className="text-gray-300">Phone: 07587 707981</p>
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
  )
}