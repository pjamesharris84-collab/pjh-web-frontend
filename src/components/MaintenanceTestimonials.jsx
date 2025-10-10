export default function MaintenanceTestimonials() {
  const testimonials = [
    {
      name: "Sarah T.",
      text: "PJH Web Services keeps our site running flawlessly. Every month we get a full report — it’s like having our own IT department.",
      role: "Boutique Owner",
    },
    {
      name: "Mike H.",
      text: "Before the maintenance plan, we constantly had plugin issues. Now it’s just handled — totally worth it.",
      role: "Construction Firm Owner",
    },
  ];

  return (
    <section className="py-20 bg-slate-950 text-center">
      <h2 className="text-3xl font-bold mb-10">Trusted by Businesses Across Suffolk</h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700">
            <p className="italic text-gray-300 mb-4">“{t.text}”</p>
            <p className="font-semibold text-blue-400">{t.name}</p>
            <p className="text-sm text-gray-400">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
