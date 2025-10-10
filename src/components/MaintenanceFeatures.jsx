import { Shield, Zap, RefreshCcw, BarChart } from "lucide-react";

export default function MaintenanceFeatures() {
  const features = [
    { icon: Shield, title: "Security First", text: "Protection against hacks, downtime, and malware." },
    { icon: Zap, title: "Speed Optimisation", text: "Keep your site lightning fast and SEO-ready." },
    { icon: RefreshCcw, title: "Automatic Updates", text: "We handle plugin, CMS, and theme updates for you." },
    { icon: BarChart, title: "Performance Reports", text: "Get transparent monthly reports on your website’s health." },
  ];

  return (
    <section className="py-20 bg-slate-900 text-center">
      <h2 className="text-3xl font-bold mb-10">WebCare That Works</h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-10">
        {features.map((f, i) => (
          <div key={i} className="bg-slate-800 p-6 rounded-xl shadow-md hover:bg-slate-700 transition">
            <f.icon className="w-10 h-10 mx-auto mb-4 text-blue-400" />
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
