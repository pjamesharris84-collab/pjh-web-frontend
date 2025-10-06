import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-pjh-slate text-pjh-light font-outfit">
      <SEO
        title="Privacy Policy | PJH Web Services"
        description="Discover how PJH Web Services collects, uses, and safeguards your personal data in accordance with UK GDPR and privacy regulations."
        url="https://www.pjhwebservices.co.uk/privacy"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-pjh-gray p-8 rounded-2xl border border-white/10 shadow-lg space-y-8">
          <h1 className="text-3xl font-bold text-pjh-blue">Privacy Policy</h1>
          <p className="text-sm text-pjh-muted">Last updated: 28/09/2025</p>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">1. Introduction</h2>
            <p className="text-pjh-light/80">
              At PJH Web Services, we are committed to protecting your personal data and
              respecting your privacy. This policy explains how we collect, use, and store
              information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">2. Information We Collect</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>Personal information (name, email, phone) provided via forms.</li>
              <li>Business details supplied during service enquiries.</li>
              <li>Technical data (IP address, browser type, cookies).</li>
              <li>Analytics data such as pages visited and session duration.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>To respond to enquiries and deliver requested services.</li>
              <li>To manage projects, quotes, and customer relationships.</li>
              <li>To enhance our site’s usability and customer experience.</li>
              <li>To comply with UK data protection and legal requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">4. Cookies & Analytics</h2>
            <p className="text-pjh-light/80">
              We use cookies and analytics tools (like Google Analytics) to monitor website
              performance and user engagement. All analytics data is anonymised. You can
              disable cookies via your browser at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">5. Data Sharing</h2>
            <p className="text-pjh-light/80">
              We do not sell your personal data. We only share information with trusted
              third-party partners (hosting, analytics, or payment providers) when required
              to deliver our services securely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">6. Data Retention</h2>
            <p className="text-pjh-light/80">
              We retain personal data only as long as necessary to fulfil contractual or
              legal obligations, after which it is securely deleted or anonymised.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">7. Your Rights</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>Access the data we hold about you.</li>
              <li>Request corrections or updates.</li>
              <li>Request deletion (“right to be forgotten”).</li>
              <li>Withdraw consent for non-essential communications.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">8. Security</h2>
            <p className="text-pjh-light/80">
              We apply SSL encryption and secure hosting to safeguard your information.
              Although no online system is completely risk-free, we continuously improve our
              protections to minimise threats.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">9. Policy Updates</h2>
            <p className="text-pjh-light/80">
              We may update this Privacy Policy periodically. All updates will be posted on
              this page with a revised “Last Updated” date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">10. Contact Us</h2>
            <p className="text-pjh-light/80">
              Email: info@pjhwebservices.co.uk<br />
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
