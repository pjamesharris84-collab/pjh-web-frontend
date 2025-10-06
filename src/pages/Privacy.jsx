// src/pages/Privacy.jsx
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

export default function Privacy() {
  return (
    <div className="admin-page font-sans">
      <Helmet>
        <title>Privacy Policy | PJH Web Services</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="admin-card space-y-8">
          {/* Heading */}
          <h1 className="admin-heading text-3xl">Privacy Policy</h1>
          <p className="text-gray-300 text-sm">Last updated: [28/09/2025]</p>

          {/* Sections */}
          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">1. Introduction</h2>
            <p className="text-gray-300">
              At PJH Web Services, we respect your privacy and are committed to protecting
              your personal data. This policy explains how we collect, use, and safeguard
              information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">2. Information We Collect</h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>Personal information provided via contact forms (e.g., name, email, phone).</li>
              <li>Business details shared when requesting quotes or services.</li>
              <li>Technical information such as IP address, browser type, and cookies.</li>
              <li>Analytics data (e.g., pages visited, time on site) collected via Google Analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>To respond to enquiries and provide requested services.</li>
              <li>To process orders, quotes, and customer agreements.</li>
              <li>To improve our website, services, and customer experience.</li>
              <li>To comply with legal obligations and regulatory requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">4. Cookies & Analytics</h2>
            <p className="text-gray-300">
              We use cookies and third-party analytics tools to understand how visitors use
              our website. Cookies can be disabled in your browser settings, but this may
              affect functionality. Google Analytics data is anonymised and used only for
              internal performance monitoring.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">5. Data Sharing</h2>
            <p className="text-gray-300">
              We do not sell or share your personal information with third parties for
              marketing purposes. Data may be shared with trusted partners (such as payment
              providers or hosting services) when necessary to deliver our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">6. Data Retention</h2>
            <p className="text-gray-300">
              We keep personal data only as long as necessary to fulfil the purposes outlined
              in this policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">7. Your Rights</h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>The right to access the personal data we hold about you.</li>
              <li>The right to request corrections or updates.</li>
              <li>The right to request deletion of your data (“right to be forgotten”).</li>
              <li>The right to opt out of non-essential communications.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">8. Security</h2>
            <p className="text-gray-300">
              We use appropriate technical and organisational measures to safeguard your
              information, including SSL encryption and secure servers. However, no system
              is 100% secure, and we cannot guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">9. Changes to this Policy</h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. Updates will be posted
              on this page with a new “last updated” date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-accent mb-2">10. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <p className="text-gray-300">Email: info@pjhwebservices.com</p>
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