import React from "react";
import SEO from "../components/SEO";

export default function SuffolkBusinessDirectory() {
  const client = {
    name: "Suffolk Rural Solutions",
    category: "Professional Gardening & Landscaping",
    website: "https://www.suffolkruralsolutions.co.uk",
    description:
      "Expert gardening and landscaping services across Suffolk. Custom website designed to showcase services, galleries, and client testimonials.",
    logo: "public/srs.png", // Added logo path
  };

  return (
    <section className="bg-slate-950 text-gray-100 min-h-screen py-16 px-6">
      <SEO
        title="Suffolk Rural Solutions | PJH Web Services Portfolio"
        description="Showcasing the bespoke website built for Suffolk Rural Solutions — professional gardening and landscaping services across Suffolk."
        url="https://www.pjhwebservices.co.uk/suffolk-business-directory"
      />

      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="mb-6 text-left">
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            ← Back to Home
          </a>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-400">
          Suffolk Business Portfolio
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Featured project: Suffolk Rural Solutions — professional gardening and 
          landscaping services across Suffolk. See how we designed a modern, 
          responsive website tailored to their business needs.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-sm hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center">
          {/* Logo */}
<img
  src={client.logo}
  alt={`${client.name} Logo`}
  className="h-40 w-auto mb-6 mx-auto rounded-lg shadow-lg"
/>


          <div className="text-center">
            <h2 className="text-3xl font-semibold text-blue-400 mb-2">
              {client.name}
            </h2>
            <p className="text-gray-400 italic text-sm mb-2">{client.category}</p>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {client.description}
            </p>
          </div>

          <a
            href={client.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 text-center"
          >
            Visit Website →
          </a>
        </div>
      </div>
    </section>
  );
}
