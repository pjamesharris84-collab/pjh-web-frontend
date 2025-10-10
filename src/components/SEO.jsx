import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "PJH Web Services | Bespoke Websites & CRM Systems",
  description = "PJH Web Services builds modern, responsive websites and custom CRM platforms for small businesses across Suffolk and beyond.",
  image = "https://www.pjhwebservices.co.uk/pjh-logo-light.png",
  url = "https://www.pjhwebservices.co.uk",
}) {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "PJH Web Services",
    url: "https://www.pjhwebservices.co.uk",
    logo: "https://www.pjhwebservices.co.uk/pjh-logo-light.png",
    image: "https://www.pjhwebservices.co.uk/pjh-logo-light.png",
    description:
      "Modern, fast, SEO-optimised websites and digital solutions for small businesses across the UK. Built and maintained by PJH Web Services in Suffolk.",
    telephone: "+44-7587-707981",
    email: "info@pjhwebservices.co.uk",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Suffolk",
      addressRegion: "England",
      addressCountry: "UK",
    },
    areaServed: "United Kingdom",
    sameAs: [
      "https://www.facebook.com/pjhwebservices",
      "https://www.instagram.com/pjhwebservices",
      "https://www.linkedin.com/company/pjhwebservices",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does PJH Web Services offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We design, build, and maintain modern, SEO-optimised websites and CRM systems for small and medium-sized businesses across the UK.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide website care plans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer optional Care Plans that include updates, backups, monitoring, and priority support for all websites we build.",
        },
      },
      {
        "@type": "Question",
        name: "Where is PJH Web Services based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We’re based in Suffolk, UK, and work with clients nationwide.",
        },
      },
    ],
  };

  return (
    <Helmet>
      {/* ✅ Core SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* ✅ OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="PJH Web Services" />

      {/* ✅ Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ✅ Theme & Icons */}
      <meta name="theme-color" content="#007BFF" />
      <link rel="icon" href="/favicon.ico" />

      {/* ✅ Structured Data for AI Crawlers */}
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
