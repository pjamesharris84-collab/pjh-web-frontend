export default function Navbar() {
  return (
    <header className="bg-pjh-gray/80 backdrop-blur sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">
        <a href="/" className="text-2xl font-bold text-pjh-blue">
          PJH Web Services
        </a>
        <nav className="flex gap-6 text-pjh-light/80">
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
      </div>
    </header>
  );
}
