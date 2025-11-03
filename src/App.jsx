/**
 * ============================================================
 * PJH Web Services — Main App (Static Frontend, Local Focused)
 * ============================================================
 * Updated November 2025
 *  • Added “Essential” entry-level plan for local startups
 *  • Dual pricing (ex-VAT + inc-VAT)
 *  • Reinforced Suffolk-local, inclusive tone
 *  • Social Media cards aligned, VAT footer retained
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

  // ============================================================
  // STATIC PACKAGES (Dual pricing inc. VAT)
  // ============================================================
  const packages = [
    {
      id: "essential",
      name: "Essential",
      tagline:
        "A simple, professional 3-page website — perfect for sole traders, startups, and small Suffolk businesses getting online for the first time.",
      price_oneoff: 595,
      price_monthly: 49,
      term_months: 24,
      features: [
        "Up to 3 custom-designed pages",
        "Clean, mobile-friendly layout",
        "Basic SEO setup & Google indexing",
        "Google Business Profile connection",
        "Secure UK-based hosting + SSL (1 year included)",
        "Contact form with spam protection",
        "3-month WebCare support included",
      ],
    },
    {
      id: "starter",
      name: "Starter",
      tagline:
        "Professional 5-page website — ideal for tradesmen and small businesses who just need a solid online presence done properly.",
      price_oneoff: 995,
      price_monthly: 79,
      term_months: 24,
      features: [
        "5 bespoke, fully custom-designed pages",
        "Mobile responsive & SEO-optimised",
        "Basic social media setup (Facebook, Instagram, Google Business)",
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
      price_oneoff: 1995,
      price_monthly: 129,
      term_months: 24,
      features: [
        "All Starter features included",
        "Custom CRM dashboard for leads & jobs",
        "Integrated quoting and invoicing tools",
        "Enhanced social media setup + content branding",
        "Automated email replies & smart forms",
        "Analytics and local SEO setup",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      tagline:
        "Our flagship bespoke automation suite — CRM, bookings, payments, and client portals.",
      price_oneoff: 3995,
      price_monthly: 199,
      term_months: 24,
      features: [
        "All Business features included",
        "Fully bespoke CRM & project management system",
        "Online bookings, payments & subscriptions",
        "Advanced social media integration & automation tools",
        "Automated invoicing & client reminders",
        "Priority WebCare support & performance reporting",
      ],
    },
  ];

  const renderDual = (net) => (
    <>
      £{net.toLocaleString()} + VAT (£{(net * 1.2).toLocaleString()} inc. VAT)
    </>
  );

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex flex-col font-inter">
      <SEO
        title="PJH Web Services | Suffolk Web Design for Local Businesses"
        description="PJH Web Services builds bespoke, SEO-optimised websites and CRM systems for Suffolk and UK small businesses — cutting through the noise with honest, effective digital solutions for everyone."
        url="https://www.pjhwebservices.co.uk"
        image="https://www.pjhwebservices.co.uk/pjh-logo-light.png"
      />

      <Navbar />

      <main className="flex-grow">
        {/* ============================================================
            HERO SECTION
        ============================================================ */}
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
            Modern Websites & CRMs <br className="hidden sm:block" /> for Every Business
          </h1>
          <p className="max-w-2xl text-gray-300 text-lg mb-12 leading-relaxed">
            At <span className="text-blue-400 font-semibold">PJH Web Services</span>, we believe every local business deserves a professional online presence — from sole traders to established brands. No templates, no jargon — just honest, effective design.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#services" className={buttonOutline}>
              View Services
            </a>
            <a href="#packages" className={buttonPrimary}>
              View Packages
            </a>
            <a href="#social-media" className={buttonOutline}>
              Social Media Management
            </a>
            <Link to="/maintenance" className={buttonSubtle}>
              Website Care Plans
            </Link>
            <Link to="/suffolk-business-directory" className={buttonSubtle}>
              Suffolk Portfolio
            </Link>
          </div>
        </section>

        {/* ============================================================
            SERVICES SECTION
        ============================================================ */}
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
                desc: "Simplify your day-to-day with integrated systems for enquiries, quotes, invoices & client management — all built around you.",
              },
              {
                title: "Maintenance & WebCare",
                desc: "From updates and security to uptime monitoring, our WebCare plans keep your site fast, secure & performing long term.",
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

        {/* ============================================================
            “NEED SOMETHING SIMPLE?” SECTION (Points to Essential)
        ============================================================ */}
        <section
          id="simple"
          className="py-20 px-6 border-t border-white/10 bg-slate-900/40 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Need Something Simple?
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 leading-relaxed text-lg mb-8">
            Starting out or just need a clean, affordable, and professional
            website to showcase your business? Our{" "}
            <span className="text-blue-400 font-semibold">
              Essential Website Package
            </span>{" "}
            is designed for Suffolk sole traders and local startups — simple,
            fast, and ready to grow when you are.
          </p>
          <p className="text-gray-300 font-semibold mb-10">
            From {renderDual(595)} — or {renderDual(49)}/month including hosting.
          </p>
          <Link to="/packages/essential" className={buttonPrimary}>
            View Essential Package →
          </Link>
        </section>

        {/* ============================================================
            PACKAGES SECTION
        ============================================================ */}
        <section
          id="packages"
          className="py-24 px-6 border-t border-white/10 bg-slate-900/50"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Packages for Every Local Business
          </h2>
          <p className="text-center text-gray-400 mb-10">
            Whether you’re a startup, a family-run shop, or a growing company —
            we’ve got a package that fits your needs and your budget.
          </p>
<div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 items-stretch">
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
          {renderDual(pkg.price_oneoff)} one-off <br />
          or {renderDual(pkg.price_monthly)} / month
        </p>
        <ul className="text-gray-500 text-sm mb-6 list-disc list-inside leading-relaxed">
          {pkg.features.map((f, i) => (
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

{/* Compare Button (added beneath packages) */}
<div className="text-center mt-12">
  <Link
    to="/compare-builds"
    className="inline-block px-8 py-3 border border-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-all duration-300"
  >
    Compare Packages Side-by-Side →
  </Link>
</div>
        </section>

        {/* ============================================================
            SOCIAL MEDIA MANAGEMENT (aligned cards)
        ============================================================ */}
        <section
          id="social-media"
          className="py-24 px-6 border-t border-white/10 bg-slate-900/60"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            Full Social Media Management
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Every website package includes basic social media setup — but if you want
            us to create, post, and manage your content each week, choose one of our
            flexible rolling monthly plans below.
          </p>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-stretch">
            {[
              {
                tier: "Start",
                price: 295,
                posts: "3 custom branded posts per week on 2 platforms",
                extras: [
                  "Hashtag & caption optimisation",
                  "Monthly performance report",
                  "Rolling monthly plan — cancel anytime",
                ],
              },
              {
                tier: "Grow",
                price: 595,
                posts: "4–5 branded posts per week on up to 3 platforms",
                extras: [
                  "Custom graphics & post templates",
                  "Monthly review call with content insights",
                  "Rolling monthly plan — cancel anytime",
                ],
              },
              {
                tier: "Scale",
                price: 995,
                posts: "6–8 posts per week across up to 4 platforms",
                extras: [
                  "Short-form video content & ad management",
                  "Priority scheduling & monthly growth review",
                  "Rolling monthly plan — cancel anytime",
                ],
              },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col justify-between bg-slate-900/70 rounded-2xl border border-white/10 p-10 text-center hover:border-blue-600 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-blue-900/20 h-full"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-blue-400 mb-3">
                    {s.tier} Plan
                  </h3>
                  <p className="text-gray-300 font-semibold mb-2">
                    £{s.price.toLocaleString()} + VAT (£
                    {(s.price * 1.2).toLocaleString()} inc. VAT)
                  </p>
                  <p className="text-sm text-gray-400 mb-6">
                    Monthly rolling plan
                  </p>
                  <p className="text-gray-400 mb-4">{s.posts}</p>
                  <ul className="text-gray-500 text-sm mb-6 list-disc list-inside leading-relaxed text-left inline-block">
                    {s.extras.map((e, j) => (
                      <li key={j}>{e}</li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="inline-block mt-auto px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-900/30"
                >
                  Enquire About {s.tier} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            ABOUT SECTION
        ============================================================ */}
        <section
          id="about"
          className="py-24 px-6 text-center border-t border-white/10"
        >
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

        {/* ============================================================
            CONTACT CTA
        ============================================================ */}
        <section className="py-24 text-center border-t border-white/10 bg-slate-900/60">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Stand Out Online?
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let’s simplify your digital world and build a website that actually
            works for your business — bespoke, secure & built to perform.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link to="/contact" className={buttonPrimary}>
              Contact Us
            </Link>
            <a href="#social-media" className={buttonOutline}>
              Social Media Management
            </a>
            <Link to="/maintenance" className={buttonOutline}>
              View Maintenance Plans
            </Link>
          </div>
        </section>
      </main>

      <CookieBanner />

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-gray-500 space-y-4 bg-slate-950">
        <p>
          © {new Date().getFullYear()} PJH Web Services — All rights reserved.
          <br />
          PJH Web Services is a VAT-registered business (VAT No. GB503 3476 17).
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Prices shown are exclusive of VAT with inclusive figures shown for clarity.
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
