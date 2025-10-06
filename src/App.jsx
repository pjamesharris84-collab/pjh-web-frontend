import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import SEO from "./components/SEO";

export default function App() {
  return (
    <div className="bg-pjh-slate text-pjh-light min-h-screen flex flex-col">
      {/* ✅ SEO / Meta configuration */}
      <SEO
        title="PJH Web Services | Bespoke Websites & CRM Systems"
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
            className="w-56 sm:w-72 lg:w-80 mb-3 drop-shadow-lg"
            loading="lazy"
          />

          {/* Tagline under logo */}
          <p className="text-pjh-muted text-lg font-medium mb-10 tracking-wide">
            Professional Digital Services
          </p>

          <h1 className="section-heading mb-4">
            Bespoke Websites & Tailored CRM Systems
          </h1>

          <p className="max-w-2xl mx-auto text-pjh-muted text-lg">
            PJH Web Services creates modern, responsive websites and custom CRM
            platforms for small businesses. Whether you already have a design or
            want something built from scratch — we bring your ideas to life.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#services" className="btn-secondary">
              View Services
            </a>
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
                Streamline your business with a fully tailored CRM. Quotes,
                invoices, customer data — all in one place.
              </p>
            </div>

            <div className="admin-card hover:shadow-pjh-blue/20 transition">
              <h3 className="text-xl font-semibold text-pjh-blue mb-2">
                Full Brand Support
              </h3>
              <p className="text-pjh-muted">
                Need help with your brand identity, colours, or messaging? We
                can help you look as good as you perform.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a href="/contact" className="btn-primary">
              Let’s Talk About Your Project
            </a>
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

        {/* CONTACT CALL-TO-ACTION */}
        <section
          id="contact"
          className="bg-pjh-gray py-24 text-center border-t border-white/10"
        >
          <h2 className="section-heading">Ready to Get Started?</h2>
          <p className="text-pjh-muted mb-8 max-w-2xl mx-auto">
            Get in touch today and let’s create something unique together.
          </p>
          <a href="/contact" className="btn-accent">
            Contact Us
          </a>
        </section>
      </main>

      {/* ✅ COOKIE BANNER */}
      <CookieBanner />

      {/* ✅ UPDATED FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-sm text-pjh-muted space-y-2">
        <p>© {new Date().getFullYear()} PJH Web Services — All rights reserved.</p>

        <div className="flex justify-center flex-wrap gap-4 text-xs">
          <a
            href="/privacy"
            className="hover:text-pjh-blue transition underline underline-offset-2"
          >
            Privacy Policy
          </a>
          <a
            href="/cookies"
            className="hover:text-pjh-blue transition underline underline-offset-2"
          >
            Cookies Policy
          </a>
          <a
            href="/terms"
            className="hover:text-pjh-blue transition underline underline-offset-2"
          >
            Terms & Conditions
          </a>
          <a
            href="/admin"
            className="hover:text-pjh-blue transition underline underline-offset-2"
          >
            Admin Login
          </a>
        </div>
      </footer>
    </div>
  );
}

console.log("✅ API URL:", import.meta.env.VITE_API_URL);
