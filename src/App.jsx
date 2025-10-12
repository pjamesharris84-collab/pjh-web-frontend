/**
 * ============================================================
 * PJH Web Services — Main App (Public Frontend, Local Focused)
 * ============================================================
 * Homepage layout for PJH Web Services.
 * Updated to include:
 *   • Local business focus & plain-English messaging
 *   • Clearer flow to detailed package pages
 *   • Removed redundant “See Full Pricing” link
 *   • Restored footer, maintenance, and CookieBanner
 * ============================================================
 */

import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import SEO from "./components/SEO";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/packages`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.packages)
          ? data.packages
          : Array.isArray(data.data)
          ? data.data
          : [];
        setPackages(list);
      })
      .catch(() => {
        setPackages([
          {
            id: 1,
            name: "Starter",
            tagline: "Perfect for small local businesses",
            price_oneoff: 900,
            price_monthly: 60,
            term_months: 24,
            features: [
              "5-page custom website",
              "Mobile responsive design",
              "SEO setup & Google optimisation",
              "Social media links",
              "Hosting & domain management",
            ],
          },
          {
            id: 2,
            name: "Business",
            tagline: "For growing local companies ready to scale",
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
            tagline: "Full bespoke CRM + automation suite",
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

  const buttonPrimary =
    "inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30";
  const buttonOutline =
    "inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300";
  const buttonSubtle =
    "inline-block px-8 py-3 bg-blue-800/50 hover:bg-blue-800 text-white rounded-xl font-medium transition-all duration-300";

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col font-inter">
      <SEO
        title="PJH Web Services | Suffolk Web Design for Local Businesses"
        description="PJH Web Services builds modern, SEO-optimised websites and CRMs for Suffolk and UK small businesses — cutting through the noise with honest, effective digital solutions."
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
            className="w-60 sm:w-80 lg:w-96 mb-10 opacity-95"
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
            help small businesses cut through the digital noise and stand out
            online. We build clear, fast, SEO-ready websites that work hard for
            your business — and we stay on top of trends, so you don’t have to.
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
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 px-6 border-t border-white/10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            What We Do for Local Businesses
          </h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Local Website Design",
                desc: "We turn your local business goals into modern, responsive websites that attract customers and rank well on Google.",
              },
              {
                title: "Custom CRM Systems",
                desc: "Simplify your daily tasks with custom-built CRM systems that automate quotes, bookings, and invoices — saving you time every day.",
              },
              {
                title: "Maintenance & WebCare",
                desc: "Your website deserves long-term care. We handle updates, security, and performance so your business stays online and stress-free.",
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
            Click a package below to view full details and inclusions.
          </p>

          {packages.length > 0 ? (
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
              {packages.map((pkg) => (
                <div
                  key={pkg.id || pkg.name}
                  className="bg-slate-900/70 rounded-2xl border border-white/10 p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-blue-900/20"
                >
                  <h3 className="text-xl font-semibold text-blue-400 mb-1">
                    {pkg.name}
                  </h3>

                  <p className="text-gray-400 mb-3 text-sm">
                    {pkg.tagline || "Perfect for growing local businesses"}
                  </p>

                  <p className="text-gray-300 text-lg font-semibold mb-4">
                    £{pkg.price_oneoff} one-off <br />
                    or £{pkg.price_monthly}/month
                  </p>

                  <ul className="text-gray-500 text-sm mb-6 list-disc list-inside leading-relaxed">
                    {(pkg.features || []).slice(0, 2).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>

                  <Link
                    to={`/packages/${encodeURIComponent(pkg.name.toLowerCase())}`}
                    className="inline-block w-full text-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No packages available.</p>
          )}
        </section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="py-24 px-6 text-center border-t border-white/10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            About PJH Web Services
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 leading-relaxed text-lg">
            We’re a Suffolk-based web design and development agency helping
            local businesses grow online. From builders and landscapers to
            salons and shops, we create fast, functional, and future-ready
            websites that attract customers and build trust. <br />
            <br />
            We cut through the online confusion, focus on what really matters,
            and stay on top of the latest digital trends — so you don’t have to.
          </p>
        </section>

        {/* CONTACT CTA */}
        <section className="py-24 text-center border-t border-white/10 bg-slate-900/60">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Stand Out Online?
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let’s simplify your digital world and build something that actually
            works for your business — secure, modern, and built to perform.
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
        <p>
          © {new Date().getFullYear()} PJH Web Services — All rights reserved.
        </p>

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
