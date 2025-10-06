import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-pjh-gray/80 backdrop-blur sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">
        {/* === LOGO / TITLE === */}
        <a
          href="/"
          className="text-xl sm:text-2xl font-bold text-pjh-blue whitespace-nowrap"
        >
          PJH Web Services
        </a>

        {/* === DESKTOP NAV === */}
        <nav className="hidden md:flex gap-6 text-pjh-light/80">
          <a href="#services" className="hover:text-pjh-cyan transition">
            Services
          </a>
          <a href="#about" className="hover:text-pjh-cyan transition">
            About
          </a>
          <a href="/contact" className="hover:text-pjh-cyan transition">
            Contact
          </a>
        </nav>

        {/* === MOBILE TOGGLE === */}
        <button
          className="md:hidden text-pjh-light/80 hover:text-pjh-cyan transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* === MOBILE DROPDOWN === */}
      {open && (
        <nav className="md:hidden bg-pjh-gray/95 border-t border-white/10 text-center text-pjh-light/80">
          <a
            href="#services"
            className="block py-3 hover:text-pjh-cyan transition"
            onClick={() => setOpen(false)}
          >
            Services
          </a>
          <a
            href="#about"
            className="block py-3 hover:text-pjh-cyan transition"
            onClick={() => setOpen(false)}
          >
            About
          </a>
          <a
            href="/contact"
            className="block py-3 hover:text-pjh-cyan transition"
            onClick={() => setOpen(false)}
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
