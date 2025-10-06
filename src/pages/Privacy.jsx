import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-pjh-slate text-pjh-light font-outfit">
      {/* ✅ SEO Metadata */}
      <SEO
        title="Privacy Policy | PJH Web Services"
        description="Learn how PJH Web Services collects, uses, and protects your personal data in accordance with UK GDPR and data protection laws."
        url="https://www.pjhwebservices.co.uk/privacy"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-pjh-gray p-8 rounded-2xl border border-white/10 shadow-lg space-y-8">
          <h1 className="text-3xl font-bold text-pjh-blue">Privacy Policy</h1>
          <p className="text-sm text-pjh-muted">Last updated: 28/09/2025</p>

          {/* Sections */}
          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">1. Introduction</h2>
            <p className="text-pjh-light/80">
              At PJH Web Services, we respect your privacy and are committed to protecting your
              personal data. This policy explains how we collect, use, and safeguard information
              when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">2. Information We Collect</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>Personal information you provide (e.g., name, email, phone).</li>
              <li>Business details shared when requesting quotes or services.</li>
              <li>Technical data such as IP address, browser type, and cookies.</li>
              <li>Analytics data like pages visited and time spent on site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>To respond to enquiries and deliver requested services.</li>
              <li>To process quotes, invoices, and customer agreements.</li>
              <li>To improve our website and user experience.</li>
              <li>To comply with UK legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">4. Cookies & Analytics</h2>
            <p className="text-pjh-light/80">
              We use cookies and third-party analytics to understand how visitors use our site.
              Cookies can be disabled in your browser, but this may affect functionality. Google
              Analytics data is anonymised and used solely for performance insights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">5. Data Sharing</h2>
            <p className="text-pjh-light/80">
              We never sell or rent personal data. Information may only be shared with trusted
              partners (such as hosting providers or payment processors) where necessary to provide
              our services securely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">6. Data Retention</h2>
            <p className="text-pjh-light/80">
              Personal data is retained only as long as needed to fulfil contractual or legal
              obligations. Older data may be securely deleted or anonymised.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">7. Your Rights</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request updates or corrections.</li>
              <li>Request deletion of your information (“right to be forgotten”).</li>
              <li>Opt out of non-essential communications at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">8. Security</h2>
            <p className="text-pjh-light/80">
              We employ appropriate security measures, including SSL encryption and secure
              databases. While no system is entirely risk-free, we strive to protect your data
              with the highest standards available.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">9. Updates to This Policy</h2>
            <p className="text-pjh-light/80">
              We may update this Privacy Policy periodically. Updates will appear on this page with
              the new “Last Updated” date indicated above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">10. Contact Us</h2>
            <p className="text-pjh-light/80">
              Email: info@pjhwebservices.co.uk
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
