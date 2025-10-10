// ============================================================
// PJH Web Services — FAQ Page
// ============================================================
// SEO + AI Optimised Frequently Asked Questions
// ============================================================

import React from "react";
import SEO from "../components/SEO.jsx";
import { Link } from "react-router-dom";

export default function FAQ() {
  const faqs = [
    {
      q: "What does PJH Web Services offer?",
      a: "We design, build, and maintain modern, SEO-optimised websites and CRM systems for small and medium-sized businesses across the UK.",
    },
    {
      q: "Do you provide website care plans?",
      a: "Yes. We offer optional Care Plans that include updates, backups, monitoring, and priority support for all websites we build.",
    },
    {
      q: "Can you host my website?",
      a: "Absolutely. We provide fast, secure hosting options, ensuring optimal uptime and performance for all our clients’ websites.",
    },
    {
      q: "Do you only work with local clients?",
      a: "While we’re proudly based in Suffolk, we work with clients across the UK and internationally through our remote setup.",
    },
    {
      q: "What is your design process?",
      a: "We start with a consultation to understand your goals, then move through design, development, testing, and post-launch support. Every project is built for speed, SEO, and scalability.",
    },
    {
      q: "How do I get a quote?",
      a: "Simply visit our Contact page and fill out the enquiry form, or email info@pjhwebservices.co.uk. We’ll respond with a tailored quote based on your project needs.",
    },
  ];

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
        description="Find answers to common questions about PJH Web Services — from website care plans and hosting to our bespoke design process."
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
          Find answers to common questions about our web design, hosting, and CRM services.
          Can’t find what you’re looking for?{" "}
          <Link to="/contact" className="text-pjh-blue hover:underline">
            Contact us
          </Link>
          .
        </p>

        <div className="mt-10 space-y-6">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-pjh-gray border border-white/10 p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-xl font-semibold text-pjh-blue mb-2">
                {item.q}
              </h2>
              <p className="text-pjh-light/90">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
