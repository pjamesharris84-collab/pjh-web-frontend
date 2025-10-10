// ============================================================
// PJH Web Services — Security & Protection Policy
// ============================================================
// Customer-first | Secure | AI-era Web Solutions
// ============================================================

import React from "react";
import SEO from "../components/SEO.jsx";
import { Link } from "react-router-dom";

export default function Security() {
  return (
    <div className="min-h-screen bg-pjh-slate text-pjh-light font-outfit">
      <SEO
        title="Website Security & Protection Policy | PJH Web Services"
        description="Learn how PJH Web Services keeps your website, data, and customers safe. We build secure, encrypted, and AI-ready websites with full protection by design."
        url="https://www.pjhwebservices.co.uk/security"
      />

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <h1 className="text-3xl font-bold text-pjh-blue text-center">
          Website Security & Protection Policy
        </h1>

        <p className="text-center text-pjh-muted max-w-2xl mx-auto">
          At PJH Web Services, your website’s security and your customers’ trust come first.
          Every line of code, every server, and every connection is built to protect your business,
          your data, and your reputation — by design.
        </p>

        {/* Section 1 — Our Security Promise */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-pjh-blue">
            Our Security Promise
          </h2>
          <p className="text-pjh-light/90 leading-relaxed">
            Security isn’t an afterthought — it’s built into every website we create.
            From the first line of code to the final deployment, we design with privacy,
            reliability, and protection at the core.  
            <br /><br />
            As a modern, AI-driven web agency, we combine automation, encryption,
            and continuous monitoring to ensure your website remains fast, safe,
            and compliant in an ever-evolving digital world.
          </p>
        </section>

        {/* Section 2 — How We Protect Your Website */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-pjh-blue">
            How We Protect Your Website
          </h2>

          <ul className="list-disc list-inside space-y-3 text-pjh-light/90 leading-relaxed">
            <li>
              <strong>🔒 HTTPS Everywhere:</strong> All sites we host are protected
              with 256-bit SSL encryption and HSTS for secure communication.
            </li>
            <li>
              <strong>🧱 Server Hardening:</strong> We deploy through trusted,
              cloud-based providers like Netlify, Vercel, and Render with
              enterprise-grade firewalls and DDoS protection.
            </li>
            <li>
              <strong>🧩 Secure APIs:</strong> Every backend endpoint is protected
              by authentication, rate-limiting, and input validation to prevent abuse.
            </li>
            <li>
              <strong>📦 Encrypted Databases:</strong> Sensitive data is stored
              securely, and passwords are hashed using strong encryption standards.
            </li>
            <li>
              <strong>👨‍💻 Access Control:</strong> Only verified, role-based users
              can access administration panels or customer data.
            </li>
            <li>
              <strong>⚙️ Automatic Updates:</strong> All dependencies, CMS systems,
              and security patches are updated regularly — often weekly — to close vulnerabilities.
            </li>
            <li>
              <strong>🔎 Monitoring & Backups:</strong> We run regular uptime checks,
              automated backups, and alert-based monitoring for every managed client site.
            </li>
          </ul>
        </section>

        {/* Section 3 — Customer-First Security Philosophy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-pjh-blue">
            Built Around Your Business, Not Just Technology
          </h2>
          <p className="text-pjh-light/90 leading-relaxed">
            Every business has unique challenges — and your security setup should reflect that.
            Our approach starts with understanding your goals and risks, then applying the right
            mix of protection for your audience and infrastructure.  
            <br /><br />
            Whether you run a small eCommerce shop or a growing tech company,
            your PJH-built site is designed to meet industry best practices,
            maintain compliance, and evolve alongside your business.
          </p>
        </section>

        {/* Section 4 — AI-Era Protection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-pjh-blue">
            Future-Proof Security for the AI Generation
          </h2>
          <p className="text-pjh-light/90 leading-relaxed">
            We believe security should evolve with innovation.  
            PJH Web Services uses AI-driven insights and automated scanning
            to predict and prevent threats before they occur.
            <br /><br />
            From intelligent uptime monitoring to automated code analysis,
            our systems continuously learn and adapt — ensuring your website
            stays one step ahead of cyber risks.
          </p>
        </section>

        {/* Section 5 — Transparency & Support */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-pjh-blue">
            Transparency & Support
          </h2>
          <p className="text-pjh-light/90 leading-relaxed">
            We’re proud to be transparent about how we protect your data and your users.
            Clients on our Care Plans receive priority patching, uptime alerts,
            and direct communication in the rare event of a security incident.  
            <br /><br />
            Want to learn more about how we secure your site or request a custom audit?{" "}
            <Link to="/contact" className="text-pjh-blue hover:underline">
              Contact our security team
            </Link>{" "}
            today — we’re always happy to help.
          </p>
        </section>

        {/* Footer */}
        <div className="pt-10 text-center text-sm text-pjh-muted">
          © {new Date().getFullYear()} PJH Web Services — Secure by Design.  
          All rights reserved.
        </div>
      </div>
    </div>
  );
}
