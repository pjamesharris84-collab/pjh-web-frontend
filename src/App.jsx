/**
 * ============================================================
 * PJH Web Services — Main App (Static Frontend, Local Focused)
 * ============================================================
 * Frontend now fully decoupled from backend APIs.
 *  • Static, hardcoded package info (no fetch)
 *  • Direct links to /packages/starter, /packages/business, /packages/premium
 *  • Cleaner, faster, simpler to maintain
 * ============================================================
 */

import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import SEO from "./components/SEO";
import { Link } from "react-router-dom";

export default function App() {
  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";
  const buttonSubtle =
    "inline-block px-8 py-3 bg-blue-800/50 hover:bg-blue-800 text-white rounded-xl font-medium transition-all duration-300";

  // Updated static package definitions (refined 2025)
  const packages = [
    {
      id: "starter",
      name: "Starter",
      tagline:
        "Bespoke 5-page website — perfect for tradesmen, shops, and local businesses.",
      price_oneoff: 795,
      price_monthly: 49,
      term_months: 24,
      features: [
        "5 bespoke, fully custom-designed pages",
        "Mobile responsive & SEO-optimised",
        "Google Maps & Business Profile integration",
        "Secure UK-based hosting + SSL (1 year included)",
        "Basic WebCare maintenance & support",
      ],
    },
    {
      id: "business",
      name: "Business",
      tagline:
        "For growing companies who need more than a website — CRM, quoting, and automation built in.",
      price_oneoff: 1495,
      price_monthly: 85,
      term_months: 24,
      features: [
        "All Starter features included",
        "Custom CRM dashboard for leads & jobs",
        "Integrated quoting and invoicing tools",
        "Automated email replies & smart forms",
        "Analytics and local SEO setup",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      tagline:
        "Our flagship bespoke automation suite — CRM, bookings, payments, and client portals.",
      price_oneoff: 2950,
      price_monthly: 160,
      term_months: 24,
      features: [
        "All Business features included",
        "Fully bespoke CRM & project management system",
        "Online bookings, payments, and subscriptions",
        "Automated invoicing and client reminders",
        "Priority WebCare support & performance reporting",
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col font-inter">
      <SEO
        title="PJH Web Services | Suffolk Web Design for Local Businesses"
        description="PJH Web Services builds bespoke, SEO-optimised websites and CRM systems for Suffolk and UK small businesses — cutting through the noise with honest, effective digital solutions."
        url="https://www.pjhwebservices.co.uk"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center text-center pt-32 pb-28 px-6">
<img
  src="/pjh-logo-light.png"
  alt="PJH Web Services logo"
  className="w-80 sm:w-96 lg:w-[28rem] mb-10 opacity-95"
  loading="lazy"
/>


          <p className="text-gray-400 uppercase tracking-[0.25em] text-sm mb-8">
            Local Websites • Real Results
          </p>

          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-8 tracking-tight">
            Modern Websites & CRMs <br className="hidden sm:block" /> for Local
            Businesses That Mean Business
          </h1>

          <p className="max-w-2xl text-gray-300 text-lg mb-12 leading-relaxed">
            At <span className="text-blue-400 font-semibold">PJH Web Services</span>, we
            design and build fully bespoke websites — no templates, no jargon.
            Every project is tailored to your goals, built for performance, and
            ready for the future.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="#services" className={buttonOutline}>
              View Services
            </a>
            <a href="#packages" className={buttonPrimary}>
              View Packages
            </a>
            <Link to="/maintenance" className={buttonSubtle}>
              Website Care Plans
            </Link>
  <Link to="/suffolk-business-directory" className={buttonSubtle}>
    Suffolk Portfolio
  </Link>
  <a
    href="https://www.crowdfunder.co.uk/p/pjh-web-services"
    target="_blank"
    rel="noopener noreferrer"
    className={buttonPrimary}
  >
    Support Our Crowdfunder
  </a>
</div>  </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 px-6 border-t border-white/10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            What We Do for Local Businesses
          </h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Bespoke Website Design",
                desc: "No templates — every design is custom-built for your business, combining great design with Google-ready performance.",
              },
              {
                title: "Custom CRM & Automation",
                desc: "Simplify your day-to-day with integrated systems for enquiries, quotes, invoices, and client management — all built around you.",
              },
              {
                title: "Maintenance & WebCare",
                desc: "From updates and security to uptime monitoring, our WebCare plans keep your site fast, secure, and performing long term.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="group bg-slate-900/70 rounded-2xl border border-white/10 p-8 hover:border-blue-600 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-blue-900/20"
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-3 group-hover:text-blue-300 transition">
                  {s.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/maintenance" className={buttonPrimary}>
              Explore Maintenance Plans
            </Link>
          </div>
        </section>

        {/* PACKAGES SECTION */}
        <section
          id="packages"
          className="py-24 px-6 border-t border-white/10 bg-slate-900/50"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Packages for Every Local Business
          </h2>

          <p className="text-center text-gray-400 mb-10">
            From simple brochure websites to full CRM systems — choose the
            package that fits your goals.
          </p>

<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-stretch">
  {packages.map((pkg) => (
    <div
      key={pkg.id}
      className="flex flex-col justify-between bg-slate-900/70 rounded-2xl border border-white/10 p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-blue-900/20 h-full"
    >
      <div>
        <h3 className="text-xl font-semibold text-blue-400 mb-1">
          {pkg.name}
        </h3>

        <p className="text-gray-400 mb-3 text-sm min-h-[50px]">
          {pkg.tagline}
        </p>

        <p className="text-gray-300 text-lg font-semibold mb-4">
          £{pkg.price_oneoff} one-off <br />
          or £{pkg.price_monthly}/month
        </p>

        <ul className="text-gray-500 text-sm mb-6 list-disc list-inside leading-relaxed">
          {pkg.features.slice(0, 3).map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      <Link
        to={`/packages/${pkg.id}`}
        className="mt-auto inline-block w-full text-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30"
      >
        View Details →
      </Link>
    </div>
  ))}
</div>

        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 px-6 text-center border-t border-white/10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            About PJH Web Services
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 leading-relaxed text-lg">
            We’re a Suffolk-based bespoke web design agency helping local
            businesses grow online with honest, effective digital solutions.
            From tradesmen and startups to growing brands, we build modern,
            high-performing websites and business systems — without the jargon.
            <br />
            <br />
            Every project is handcrafted using the latest tools and trends,
            ensuring your site stays fast, secure, and ahead of the curve.
          </p>
        </section>

        {/* CONTACT CTA */}
        <section className="py-24 text-center border-t border-white/10 bg-slate-900/60">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Stand Out Online?
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let’s simplify your digital world and build a website that actually
            works for your business — bespoke, secure, and built to perform.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link to="/contact" className={buttonPrimary}>
              Contact Us
            </Link>
            <Link to="/maintenance" className={buttonOutline}>
              View Maintenance Plans
            </Link>
          </div>
        </section>
      </main>

      <CookieBanner />

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-gray-500 space-y-4 bg-slate-950">
        <p>© {new Date().getFullYear()} PJH Web Services — All rights reserved.</p>

        <div className="flex justify-center flex-wrap gap-4 text-xs uppercase tracking-wide">
          <Link to="/legal/privacy" className="hover:text-blue-400 transition">
            Privacy
          </Link>
          <Link to="/legal/cookies" className="hover:text-blue-400 transition">
            Cookies
          </Link>
          <Link to="/legal/terms" className="hover:text-blue-400 transition">
            Terms
          </Link>
          <Link
            to="/legal/monthly-terms"
            className="hover:text-blue-400 transition"
          >
            Monthly Terms
          </Link>
          <Link
            to="/legal/direct-debit-policy"
            className="hover:text-blue-400 transition"
          >
            Direct Debit
          </Link>
          <Link to="/security" className="hover:text-blue-400 transition">
            Security
          </Link>
          <Link to="/maintenance" className="hover:text-blue-400 transition">
            Maintenance
          </Link>
          <Link to="/admin" className="hover:text-blue-400 transition">
            Admin
          </Link>
        </div>
      </footer>
    </div>
  );
}
