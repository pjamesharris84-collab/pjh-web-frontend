// ============================================================
// PJH Web Services — FAQ Page (Local Focus, Clarity-Driven)
// ============================================================
// Helping local businesses cut through digital noise
// and stay ahead of trends with modern, honest web design.
// ============================================================

import React from "react";
import SEO from "../components/SEO.jsx";
import { Link } from "react-router-dom";

export default function FAQ() {
  const faqs = [
    {
      q: "What makes PJH Web Services different?",
      a: "We help local businesses cut through the digital noise. Instead of jargon and buzzwords, we give you clear, honest advice that works. Every website and CRM we build is tailored to your business goals, not a one-size-fits-all template. Our focus is results, not trends.",
    },
    {
      q: "Do you work with small or local businesses?",
      a: "Yes — that’s who we specialise in. From trades and shops to service providers, we help Suffolk and UK-based businesses look professional online and attract real customers. You don’t need to be a tech expert — we handle everything from start to finish.",
    },
    {
      q: "Do you keep up with the latest digital trends?",
      a: "Absolutely. The online world changes fast — AI, algorithms, SEO, design tools. We stay on top of it all, filter out the hype, and apply only what benefits your business. You focus on running your company; we’ll keep your website current and performing.",
    },
    {
      q: "What services do you offer?",
      a: "We design, build, and maintain modern, SEO-ready websites and custom CRM systems. Our services include local SEO setup, hosting, branding, automation, and ongoing maintenance — everything your business needs to stay visible and secure online.",
    },
    {
      q: "Do you offer website care or maintenance plans?",
      a: "Yes. Our Website Care Plans keep your site protected, fast, and up-to-date. We handle all updates, security patches, backups, and performance checks — so you can rest easy knowing your site is in safe hands.",
    },
    {
      q: "Can you host my website and emails?",
      a: "Yes. We provide fast, secure hosting and professional email setup. Every site includes SSL security, daily backups, and managed support — so your business stays online and reliable without technical stress.",
    },
    {
      q: "Do you only work locally?",
      a: "We’re proudly based in Suffolk and love supporting local businesses — but we also work with clients across the UK. Thanks to our modern, remote-friendly setup, we can collaborate seamlessly wherever you are.",
    },
    {
      q: "What’s your design and build process?",
      a: "We start with a simple discovery session to understand your business and your customers. Then we move through design, development, and testing. The result is a fast, mobile-first, SEO-optimised site that looks great and converts visitors into customers.",
    },
    {
      q: "How do I get a quote or start a project?",
      a: "Just visit our Contact page or email info@pjhwebservices.co.uk. We’ll chat about your goals and ideas, then create a clear, no-obligation proposal focused on what will actually help your business grow online.",
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
    <div className="min-h-screen bg-slate-950 text-white font-inter">
      <SEO
        title="FAQs | PJH Web Services | Suffolk Web Design for Local Businesses"
        description="Honest, modern web design and CRM systems for Suffolk and UK businesses. Explore PJH Web Services FAQs to see how we cut through the noise and keep your site ahead of digital trends."
        url="https://www.pjhwebservices.co.uk/faq"
      />

      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-3xl font-bold text-blue-400 text-center">
          Frequently Asked Questions
        </h1>

        <p className="text-center text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Get straight, no-nonsense answers about how PJH Web Services helps
          small and local businesses build fast, secure, and effective websites.
          We believe in clarity, not confusion — and we stay on top of digital
          trends so you don’t have to. Can’t find what you’re looking for?{" "}
          <Link to="/contact" className="text-blue-400 hover:underline">
            Get in touch
          </Link>{" "}
          and let’s talk about your goals.
        </p>

        <div className="mt-10 space-y-6">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900/70 border border-white/10 p-6 rounded-2xl shadow-lg hover:border-blue-500 hover:shadow-blue-900/30 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                {item.q}
              </h2>
              <p className="text-gray-300 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
