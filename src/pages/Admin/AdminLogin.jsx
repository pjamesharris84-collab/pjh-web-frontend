import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);

  // 🌍 Backend URL auto-switch
  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "https://pjh-web-backend.onrender.com"; // fallback for local dev or render

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        // ✅ Store login state in localStorage
        localStorage.setItem("isAdmin", "true");
        setStatus("success");

        // Small delay for UX
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 600);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-pjh-charcoal flex items-center justify-center px-6">
      <div className="bg-pjh-gray p-10 rounded-2xl shadow-lg w-full max-w-md border border-white/10">
        {/* === HEADER === */}
        <h1 className="text-3xl font-bold text-center text-pjh-blue mb-2">
          Admin Login
        </h1>
        <p className="text-center text-pjh-muted mb-6 text-sm">
          Secure access to your PJH Web Services dashboard.
        </p>

        {/* === FORM === */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-pjh-slate border border-white/20 text-pjh-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pjh-blue"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 rounded-lg bg-pjh-blue text-white font-semibold hover:bg-pjh-blue/80 transition"
          >
            {status === "loading" ? "Checking..." : "Login"}
          </button>

          {status === "error" && (
            <p className="text-red-400 text-center mt-2">
              Invalid password. Please try again.
            </p>
          )}
          {status === "success" && (
            <p className="text-green-400 text-center mt-2">
              Login successful! Redirecting...
            </p>
          )}
        </form>

        {/* === BACK LINK === */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-pjh-muted hover:text-pjh-blue transition text-sm"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
