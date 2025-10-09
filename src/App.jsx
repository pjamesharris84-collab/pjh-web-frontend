import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import SEO from "./components/SEO";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [packages, setPackages] = useState([]);

  // 🔗 Fetch live package data from backend (with fallback)
  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/packages`;
    console.log("✅ API URL:", apiUrl);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Packages API response:", data);

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.packages)
          ? data.packages
          : Array.isArray(data.data)
          ? data.data
          : [];

        setPackages(list);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch packages:", err);

        // ✅ Fallback demo data
        setPackages([
          {
            id: 1,
            name: "Starter",
            tagline: "Perfect for small business websites",
            price_oneoff: 900,
            price_monthly: 60,
            term_months: 24,
            features: [
              "5-page custom website",
              "Responsive design",
              "SEO setup",
              "Social media links",
              "Hosting & domain management",
            ],
          },
          {
            id: 2,
            name: "Business",
            tagline: "For growing companies needing automation",
            price_oneoff: 2600,
            price_monthly: 140,
            term_months: 24,
            features: [
              "All Starter features",
              "Custom CRM core",
              "Booking form / scheduler",
              "Integrated invoicing",
              "On-page SEO",
            ],
          },
          {
            id: 3,
            name: "Premium",
            tagline: "Full bespoke CRM + integrations",
            price_oneoff: 6000,
            price_monthly: 300,
            term_months: 24,
            features: [
              "All Business features",
              "Full bespoke CRM & booking systems",
              "Online payments",
              "Automated workflows",
              "Priority support",
            ],
          },
        ]);
      });
  }, []);

  return (
    <div className="bg-pjh-slate text-pjh-light min-h-screen flex flex-col">
      {/* ✅ SEO / Meta configuration */}
      <SEO
        title="PJH Web Services | Bespoke Websites, CRM & Booking Systems"
        description="PJH Web Services builds modern, responsive websites and custom CRM platforms for small businesses across Suffolk and beyond."
        url="https://www.pjhwebservices.co.uk"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      {/* ✅ NAVBAR */}
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="section text-center flex flex-col items-center pt-28 sm:pt-32">
  <img
    src="/pjh-logo-light.png"
    alt="PJH Web Services logo"
    className="w-72 sm:w-96 lg:w-[28rem] mb-6 drop-shadow-xl"
    loading="lazy"
  />

  <p className="text-pjh-muted text-lg font-medium mb-10 tracking-wide">
    Professional Digital Services
  </p>

  <h1 className="section-heading mb-10 leading-relaxed sm:leading-[1.3]">
    Bespoke Websites, CRMs & Booking Systems
  </h1>

  <p className="max-w-2xl mx-auto text-pjh-muted text-lg">
    PJH Web Services creates modern, responsive websites and bespoke CRM systems
    that automate your workflow and bring your ideas to life — built around your
    exact business needs.
  </p>

  <div className="mt-10 flex flex-wrap justify-center gap-4">
    <a href="#services" className="btn-secondary">
      View Services
    </a>
    <Link to="/pricing" className="btn-accent">
      View Packages
    </Link>
  </div>
</section>


        {/* SERVICES SECTION */}
        <section id="services" className="section">
          <h2 className="section-heading">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="admin-card hover:shadow-pjh-blue/20 transition">
              <h3 className="text-xl font-semibold text-pjh-blue mb-2">
                Website Design
              </h3>
              <p className="text-pjh-muted">
                Modern, responsive websites built to your exact vision — whether
                you bring your own design or we start fresh.
              </p>
            </div>

            <div className="admin-card hover:shadow-pjh-blue/20 transition">
              <h3 className="text-xl font-semibold text-pjh-blue mb-2">
                Custom CRM Systems
              </h3>
              <p className="text-pjh-muted">
                Streamline your business with a fully bespoke CRM. Quotes,
                invoices, customer data — all in one place.
              </p>
            </div>

            <div className="admin-card hover:shadow-pjh-blue/20 transition">
              <h3 className="text-xl font-semibold text-pjh-blue mb-2">
                Booking & Payment Systems
              </h3>
              <p className="text-pjh-muted">
                Allow customers to book, pay, and manage appointments directly
                on your site — fully integrated with your CRM.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/pricing" className="btn-primary">
              Explore Packages
            </Link>
          </div>
        </section>

        {/* PACKAGES PREVIEW */}
        <section id="packages" className="bg-pjh-gray/30 py-20 border-t border-white/10">
          <h2 className="section-heading text-center mb-10">
            Our Most Popular Packages
          </h2>

          {Array.isArray(packages) && packages.length > 0 ? (
            <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 px-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id || pkg.name}
                  className="bg-pjh-gray/40 rounded-2xl p-6 border border-white/10 hover:border-pjh-blue transition"
                >
                  <h3 className="text-xl font-semibold text-pjh-blue mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-pjh-muted mb-3 text-sm">
                    £{pkg.price_oneoff} one-off<br />
                    or £{pkg.price_monthly}/month (min {pkg.term_months || 24} months)
                  </p>

                  <ul className="text-sm text-pjh-muted mb-4 list-disc list-inside">
                    {(pkg.features || []).slice(0, 4).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>

                  <Link
                    to={`/packages/${encodeURIComponent(pkg.name.toLowerCase())}`}
                    className="btn-accent w-full block text-center"
                  >
                    Select Package
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-pjh-muted">No packages available.</p>
          )}

          <div className="text-center mt-10">
            <Link to="/pricing" className="btn-secondary">
              View Full Pricing →
            </Link>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section text-center">
          <h2 className="section-heading">About PJH Web Services</h2>
          <p className="max-w-3xl mx-auto text-pjh-muted">
            We’re passionate about building technology that empowers small
            businesses. No templates, no guesswork — just bespoke solutions that
            match your goals and personality.
          </p>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" className="bg-pjh-gray py-24 text-center border-t border-white/10">
          <h2 className="section-heading">Ready to Get Started?</h2>
          <p className="text-pjh-muted mb-8 max-w-2xl mx-auto">
            Get in touch today and let’s create something unique together.
          </p>
          <Link to="/contact" className="btn-accent">
            Contact Us
          </Link>
        </section>
      </main>

      {/* ✅ COOKIE BANNER */}
      <CookieBanner />

      {/* ✅ FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-sm text-pjh-muted space-y-2">
        <p>© {new Date().getFullYear()} PJH Web Services — All rights reserved.</p>

        <div className="flex justify-center flex-wrap gap-4 text-xs">
          <Link to="/legal/privacy" className="hover:text-pjh-blue underline underline-offset-2 transition">
            Privacy Policy
          </Link>
          <Link to="/legal/cookies" className="hover:text-pjh-blue underline underline-offset-2 transition">
            Cookies Policy
          </Link>
          <Link to="/legal/terms" className="hover:text-pjh-blue underline underline-offset-2 transition">
            Terms & Conditions
          </Link>
          <Link to="/legal/monthly-terms" className="hover:text-pjh-blue underline underline-offset-2 transition">
            Monthly Plan Terms
          </Link>
          <Link to="/legal/direct-debit-policy" className="hover:text-pjh-blue underline underline-offset-2 transition">
            Direct Debit Policy
          </Link>
          <Link to="/admin" className="hover:text-pjh-blue underline underline-offset-2 transition">
            Admin Login
          </Link>
        </div>
      </footer>
    </div>
  );
}
