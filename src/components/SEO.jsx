/**
 * ============================================================
 * PJH Web Services — Global SEO Component (React 19 + Vite)
 * ============================================================
 * Provides dynamic meta tags, OpenGraph, and JSON-LD schemas
 * for business + FAQ data. Fully compatible with react-helmet-async.
 * ============================================================
 */

import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "PJH Web Services | Bespoke Websites & CRM Systems",
  description = "PJH Web Services builds fast, modern websites and custom CRM systems for small businesses across Suffolk and the UK.",
  image = "https://www.pjhwebservices.co.uk/pjh-logo-light.png",
  url = "https://www.pjhwebservices.co.uk",
}) {
  // --- Schema: Business Profile ---
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "PJH Web Services",
    url,
    logo: image,
    image,
    description:
      "Modern, SEO-optimised websites, CRMs, and maintenance plans for small and medium-sized businesses across the UK.",
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

  // --- Schema: FAQ for AI & Search ---
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does PJH Web Services offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We design, build, and maintain modern, SEO-optimised websites and CRM systems tailored for UK businesses.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide ongoing maintenance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer WebCare maintenance plans that include backups, updates, monitoring, and dedicated support for PJH-built sites.",
        },
      },
      {
        "@type": "Question",
        name: "Where is PJH Web Services based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are based in Suffolk, England, serving clients locally and nationwide.",
        },
      },
    ],
  };

  return (
    <Helmet prioritizeSeoTags>
      {/* Core Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="PJH Web Services" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Theme & Favicon */}
      <meta name="theme-color" content="#0f172a" />
      <link rel="icon" href="/favicon.ico" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
