// ============================================================
// PJH Web Services — FAQ Page (Accessible, VAT-Registered 2025)
// ============================================================
// Updated for VAT transparency, Essential→Premium tiers,
// and clear plain-English explanations for social media,
// SEO, and AI search optimisation.
// ============================================================

import React from "react";
import SEO from "../components/SEO.jsx";
import { Link } from "react-router-dom";

export default function FAQ() {
  const faqs = [
    {
      q: "What makes PJH Web Services different?",
      a: "We help local businesses cut through digital noise. Instead of jargon and buzzwords, we give you clear, honest advice that works. Every website and CRM we build is handcrafted to your business goals — no templates or gimmicks. Our focus is results, not trends.",
    },
    {
      q: "Do you work with small or local businesses?",
      a: "Yes — that’s exactly who we specialise in. From sole traders and shops to service providers, we help Suffolk and UK-based businesses look professional online and attract real customers. You don’t need to be technical — we handle everything from design to hosting.",
    },
    {
      q: "What website packages do you offer?",
      a: "We have four tiers to suit every budget and goal: the Essential (3-page starter site), Starter (5-page bespoke site), Business (CRM and quoting tools), and Premium (advanced automation and client portals). All prices are shown exclusive of VAT, with inclusive figures displayed for clarity.",
    },
    {
      q: "Are your prices subject to VAT?",
      a: "Yes. PJH Web Services is VAT-registered under GB503 3476 17. All prices are exclusive of VAT unless stated otherwise, with inclusive totals shown for transparency. Every client receives a full VAT invoice for their records.",
    },
    {
      q: "Do you offer social media management?",
      a: "Every website package includes a basic social media setup — we connect and optimise your Facebook, Instagram, and Google Business profiles so customers can find you easily. If you’d like us to create and post content for you each week, we also offer rolling monthly Social Media Management plans starting from £295 plus VAT per month. These include branded graphics, captions, scheduling, and monthly performance reporting, all handled for you with clear VAT invoicing. We also make sure your website is designed to work well when shared on social media, so your links look great, attract attention, and bring more visitors to your business.",
    },
    {
      q: "How do you optimise websites for Google and AI searches?",
      a: "We build every website so that search engines can clearly understand what your business offers. This includes using clear headings, well-written text, and accurate descriptions to help you appear higher on Google. We also make sure your business details and contact information are set up correctly for local searches, such as Google Maps. As new search tools like ChatGPT, Bing Copilot and other AI platforms become more popular, our websites are built in a way that helps them find and show your business accurately. In simple terms, we make sure people — and search engines — can easily discover you online.",
    },
    {
      q: "Do you offer website care or maintenance plans?",
      a: "Yes. Our WebCare Maintenance Plans keep your site fast, protected, and up to date. We handle security patches, software updates, backups, and performance checks — all billed monthly with VAT shown clearly on each invoice.",
    },
    {
      q: "Can you host my website and professional email?",
      a: "Yes. We provide secure UK-based hosting and business email setup. Every site includes SSL security, daily backups, and managed support — so your business stays online reliably without stress.",
    },
    {
      q: "Do you only work locally?",
      a: "We’re proudly based in Suffolk and love supporting local businesses, but we also work with clients across the UK. Our remote-friendly setup allows seamless collaboration wherever you’re located.",
    },
    {
      q: "Do you keep up with digital and AI trends?",
      a: "Yes. The online world changes quickly, and we stay up to date so you don’t have to. From new search tools and AI platforms to design and accessibility standards, we test and apply what genuinely helps your business. Our goal is to make sure your website stays visible, modern, and relevant as technology continues to evolve.",
    },
    {
      q: "What’s your design and build process?",
      a: "We start with a short discovery call to understand your goals. Then we move through design, development, and testing — with speed, accessibility, and search optimisation built in. You’ll review every stage to make sure the final site reflects your brand and works perfectly on all devices.",
    },
    {
      q: "How do I get a quote or start a project?",
      a: "You can use our online contact form or email info@pjhwebservices.co.uk. We’ll discuss your goals and then provide a clear, no-obligation proposal showing both ex-VAT and inc-VAT figures so you know exactly what to expect.",
    },
  ];

  // SEO Schema — FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-inter">
      <SEO
        title="FAQs | PJH Web Services | Suffolk Web Design, SEO & AI Search Optimisation"
        description="Common questions about PJH Web Services — VAT-registered Suffolk web design, SEO and social media specialists helping UK businesses grow online."
        url="https://www.pjhwebservices.co.uk/faq"
      />

      {/* Structured data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <main
        id="main-content"
        role="main"
        className="max-w-4xl mx-auto px-6 py-16 space-y-8"
      >
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            Frequently Asked Questions
          </h1>
          <p
            className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
            aria-describedby="faq-intro"
          >
            Honest answers about how PJH Web Services helps small and local
            businesses succeed online — from web design and hosting to search
            optimisation and social media management. All services are
            transparent, VAT-compliant, and built for long-term results.
          </p>
        </header>

        <section
          id="faq-list"
          aria-label="Frequently asked questions"
          className="space-y-6"
        >
          {faqs.map((item, index) => (
            <article
              key={index}
              className="bg-slate-900/70 border border-white/10 p-6 rounded-2xl shadow-lg hover:border-blue-500 hover:shadow-blue-900/30 transition-all duration-300 focus-within:border-blue-500"
            >
              <h2
                className="text-xl font-semibold text-blue-400 mb-2"
                id={`faq-${index}`}
              >
                {item.q}
              </h2>
              <p
                className="text-gray-300 leading-relaxed whitespace-pre-line"
                aria-labelledby={`faq-${index}`}
              >
                {item.a}
              </p>
            </article>
          ))}
        </section>

        {/* Footer Navigation Links */}
        <footer className="text-center pt-10 border-t border-white/10 mt-16 space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to Home
            </Link>

            <Link
              to="/contact"
              className="inline-block border border-blue-500 text-blue-400 hover:bg-blue-700 hover:text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Contact Form
            </Link>
          </div>

          <p className="text-gray-400 leading-relaxed mt-4">
            Still have questions?{" "}
            <Link
              to="/contact"
              className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
            >
              Get in touch
            </Link>{" "}
            and we’ll respond personally within one business day.
          </p>

          <p className="text-xs text-gray-500 mt-4">
            © {new Date().getFullYear()} PJH Web Services — Suffolk, United
            Kingdom. VAT No. GB503 3476 17. Prices shown are exclusive of VAT
            with inclusive figures displayed for clarity.
          </p>
        </footer>
      </main>
    </div>
  );
}
