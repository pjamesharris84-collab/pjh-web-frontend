import { Head } from "react-head";
import { Link } from "react-router-dom";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-pjh-slate text-pjh-light font-outfit">
      {/* SEO Metadata */}
      <Head>
        <title>Cookies Policy | PJH Web Services</title>
        <meta
          name="description"
          content="Learn how PJH Web Services uses cookies to enhance your browsing experience, improve performance, and provide secure functionality."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.pjhwebservices.co.uk/cookies" />
      </Head>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-pjh-gray p-8 rounded-2xl border border-white/10 shadow-lg space-y-8">
          <h1 className="text-3xl font-bold text-pjh-blue">Cookies Policy</h1>
          <p className="text-sm text-pjh-muted">Last updated: 28/09/2025</p>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">
              1. What Are Cookies?
            </h2>
            <p className="text-pjh-light/80">
              Cookies are small text files placed on your device when you visit
              a website. They help websites function efficiently, enhance user
              experience, and provide insights to site owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">
              2. How We Use Cookies
            </h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>Enable essential website functionality.</li>
              <li>Understand how visitors use our site through analytics.</li>
              <li>Improve performance and personalise content.</li>
              <li>Support security features and detect fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">
              3. Types of Cookies We Use
            </h2>
            <ul className="list-disc ml-6 text-pjh-light/80 space-y-1">
              <li>
                <strong>Essential:</strong> Required for the website to function.
              </li>
              <li>
                <strong>Performance:</strong> Help us analyse usage patterns.
              </li>
              <li>
                <strong>Functionality:</strong> Remember your preferences.
              </li>
              <li>
                <strong>Third-Party:</strong> For analytics or embedded content.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">
              4. Managing Cookies
            </h2>
            <p className="text-pjh-light/80">
              You can control or disable cookies via your browser settings.
              Disabling some may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pjh-blue mb-2">
              5. Contact Us
            </h2>
            <p className="text-pjh-light/80">
              Email: info@pjhwebservices.co.uk
              <br />
              Phone: 07587 707981
            </p>
          </section>

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
