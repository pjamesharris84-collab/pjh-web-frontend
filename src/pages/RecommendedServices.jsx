import React from "react";

export default function RecommendedServices() {
  return (
    <section className="bg-slate-950 text-gray-100 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8 text-left">
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            ← Back to Home
          </a>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-400">
          Recommended Services
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          These are trusted tools and providers that PJH Web Services personally recommends
          for hosting, domains, and web management.
          Some links are affiliate links — meaning we may earn a small commission
          at no extra cost to you.
        </p>

        {/* === Cards Grid === */}
        <div className="grid sm:grid-cols-2 gap-8 mt-10">
          {/* === IONOS Card === */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
            <div className="flex flex-col items-center flex-grow">
              {/* IONOS Affiliate Banner */}
              <div className="mb-4">
                <a href="https://acn.ionos.co.uk/SHXf?file_id=85">
                  <img
                    src="https://media.go2speed.org/brand/files/ionos/3/21637_Banner_AffiliatePlattform_MyWebsite_EN_234x60px_v0.gif"
                    width="234"
                    height="60"
                    border="0"
                    alt="IONOS Affiliate Banner"
                  />
                </a>
                <img
                  src="https://acn.ionos.co.uk/aff_i?offer_id=3&file_id=85&aff_id=10921&url_id=47"
                  width="0"
                  height="0"
                  style={{ position: "absolute", visibility: "hidden" }}
                  border="0"
                  alt=""
                />
              </div>

              <h2 className="text-2xl font-semibold text-white mb-3">
                IONOS Web Hosting
              </h2>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-sm">
                Reliable, affordable hosting for small businesses — with great uptime,
                free SSL, and UK-based support. Perfect for WordPress and email hosting.
              </p>
            </div>

            <a
              href="https://acn.ionos.co.uk/SHXf?file_id=85"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 self-center"
            >
              Visit IONOS
            </a>
          </div>

          {/* === 123 Reg Card === */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
            <div className="flex flex-col items-center flex-grow">
              {/* 123 Reg Affiliate Logo */}
              <div className="mb-4">
                <a
                  href="https://www.jdoqocy.com/click-101567173-12398589"
                  target="_top"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.ftjcfx.com/image-101567173-12398589"
                    width="150"
                    height="150"
                    alt="domain names"
                    border="0"
                  />
                </a>
              </div>

              <h2 className="text-2xl font-semibold text-white mb-3">
                123 Reg Domains & Hosting
              </h2>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-sm">
                A long-established UK domain and hosting provider. Ideal for quick
                domain registration, affordable email hosting, and straightforward
                website management.
              </p>
            </div>

            <a
              href="https://www.tkqlhce.com/click-1-12398592"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 self-center"
            >
              Visit 123 Reg
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
