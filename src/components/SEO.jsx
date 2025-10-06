import React from "react";

export default function SEO({
  title = "PJH Web Services | Bespoke Websites & CRM Systems",
  description = "PJH Web Services builds modern, responsive websites and custom CRM platforms for small businesses across Suffolk and beyond.",
  image = "https://www.pjhwebservices.co.uk/pjh-logo-light.png",
  url = "https://www.pjhwebservices.co.uk",
}) {
  return (
    <>
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
    </>
  );
}
