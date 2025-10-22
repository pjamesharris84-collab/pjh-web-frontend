import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services", internal: false },
    { name: "About", href: "#about", internal: false },
    { name: "Maintenance", href: "/maintenance", internal: true },
    { name: "Pricing", href: "/pricing", internal: true },
    { name: "FAQ", href: "/faq", internal: true },
    { name: "Recommended", href: "/recommended-services", internal: true },
    { name: "Contact", href: "/contact", internal: true, highlight: true },
  ];

  return (
    <header className="bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">
        {/* === LOGO / TITLE === */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-white tracking-tight hover:text-blue-400 transition-colors duration-300"
          aria-label="PJH Web Services Home"
          onClick={() => setOpen(false)}
        >
          PJH Web Services
        </Link>

        {/* === DESKTOP NAV === */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) =>
            link.internal ? (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`${
                  link.highlight
                    ? "ml-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
                    : "text-gray-300 hover:text-white hover:bg-blue-700/20 px-3 py-2 rounded-lg transition-all duration-300"
                }`}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white hover:bg-blue-700/20 px-3 py-2 rounded-lg transition-all duration-300"
              >
                {link.name}
              </a>
            )
          )}
        </nav>

        {/* === MOBILE TOGGLE === */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle mobile menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* === MOBILE DROPDOWN === */}
      {open && (
        <nav className="md:hidden bg-slate-950/95 border-t border-white/10 text-center text-gray-300 shadow-lg">
          {navLinks.map((link) =>
            link.internal ? (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`block py-3 ${
                  link.highlight
                    ? "bg-blue-700 hover:bg-blue-800 text-white font-semibold"
                    : "hover:bg-blue-700/30 hover:text-white"
                } transition`}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 hover:bg-blue-700/30 hover:text-white transition"
              >
                {link.name}
              </a>
            )
          )}
        </nav>
      )}
    </header>
  );
}
