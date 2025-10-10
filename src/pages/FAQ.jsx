// ============================================================
// PJH Web Services — FAQ Page
// ============================================================
// Customer-First | Modern | AI-Era Web Design & CRM Solutions
// ============================================================

import React from "react";
import SEO from "../components/SEO.jsx";
import { Link } from "react-router-dom";

export default function FAQ() {
  const faqs = [
    {
      q: "What makes PJH Web Services different?",
      a: "Everything we do starts with you — your vision, your goals, and your business needs. We don’t just build websites; we craft digital experiences that align perfectly with your objectives. Our customer-first approach ensures every site we create is tailored, strategic, and results-driven.",
    },
    {
      q: "Do you build modern, AI-ready websites?",
      a: "Absolutely. PJH Web Services is built for the AI generation — we design and develop future-ready websites that leverage modern frameworks, automation, and AI integrations. Your website will be optimised for search, voice, and AI discovery so it stays ahead of digital trends.",
    },
    {
      q: "What services do you provide?",
      a: "We design, build, and maintain modern, SEO-optimised websites, CRMs, and online systems that help small and medium-sized businesses grow. From branding and user experience to hosting and automation, every solution is built with performance and your customers in mind.",
    },
    {
      q: "Do you offer website care or maintenance plans?",
      a: "Yes. We offer Care Plans exclusively for websites we build — providing updates, security patches, backups, uptime monitoring, and performance tuning. It’s complete peace of mind knowing your site is always protected and performing at its best.",
    },
    {
      q: "Can you host my website and email?",
      a: "Yes — we handle everything from fast, secure hosting to email setup and SSL management. Our hosting platform ensures high uptime, top-tier performance, and professional support tailored to your business size and needs.",
    },
    {
      q: "Do you only work with local clients?",
      a: "While we’re proudly based in Suffolk, we work with forward-thinking businesses across the UK and internationally. Through our modern, remote-first setup, we deliver seamless collaboration and communication wherever you are.",
    },
    {
      q: "What is your design and build process?",
      a: "We start with a discovery session to fully understand your goals, audience, and vision. From there, we move into design, development, and refinement — ensuring the final product doesn’t just look good but performs exceptionally. Every site is mobile-first, SEO-ready, and modernised for today’s digital landscape.",
    },
    {
      q: "How do I get a quote or start a project?",
      a: "Simply visit our Contact page or email info@pjhwebservices.co.uk. We’ll discuss your ideas, business goals, and future plans, then prepare a tailored proposal designed to help your brand succeed online.",
    },
  ];

  // SEO Schema — FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-pjh-slate text-pjh-light font-outfit">
      <SEO
        title="Frequently Asked Questions | PJH Web Services"
        description="Customer-first, AI-ready web design and CRM systems. Explore FAQs about PJH Web Services — our process, care plans, hosting, and modern, goal-driven approach."
        url="https://www.pjhwebservices.co.uk/faq"
      />

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-3xl font-bold text-pjh-blue text-center">
          Frequently Asked Questions
        </h1>

        <p className="text-center text-pjh-muted max-w-2xl mx-auto">
          Discover how PJH Web Services blends customer-first strategy with
          cutting-edge technology to build websites that grow with your business.
          Can’t find what you’re looking for?{" "}
          <Link to="/contact" className="text-pjh-blue hover:underline">
            Get in touch
          </Link>{" "}
          and let’s talk about your vision.
        </p>

        <div className="mt-10 space-y-6">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-pjh-gray border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-pjh-blue/20 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-pjh-blue mb-2">
                {item.q}
              </h2>
              <p className="text-pjh-light/90 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
