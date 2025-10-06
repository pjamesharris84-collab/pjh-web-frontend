import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-pjh-slate text-pjh-light font-outfit">
      <SEO
        title="Cookies Policy | PJH Web Services"
        description="Learn how PJH Web Services uses cookies to enhance your browsing experience, improve performance, and provide secure functionality."
        url="https://www.pjhwebservices.co.uk/cookies"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-pjh-gray p-8 rounded-2xl border border-white/10 shadow-lg space-y-8">
          <h1 className="text-3xl font-bold text-pjh-blue">Cookies Policy</h1>
          <p className="text-sm text-pjh-muted">Last updated: 28/09/2025</p>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">1. What Are Cookies?</h2>
            <p className="text-pjh-light/80">
              Cookies are small text files stored on your device to help websites
              function efficiently, enhance performance, and provide usage insights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">2. How We Use Cookies</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>Enable essential site functionality.</li>
              <li>Track anonymous analytics to improve performance.</li>
              <li>Personalise user experience and preferences.</li>
              <li>Enhance security and detect misuse or fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">3. Types of Cookies</h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li><strong>Essential:</strong> Required for site operation.</li>
              <li><strong>Performance:</strong> Collect anonymous analytics data.</li>
              <li><strong>Functionality:</strong> Remember settings and preferences.</li>
              <li><strong>Third-Party:</strong> Used by analytics or embedded tools.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">4. Managing Cookies</h2>
            <p className="text-pjh-light/80">
              You can manage or disable cookies through your browser settings. Some
              features may not work correctly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">5. Contact Us</h2>
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
