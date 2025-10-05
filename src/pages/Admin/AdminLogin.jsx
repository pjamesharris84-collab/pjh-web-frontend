import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      // Attempt to parse JSON safely
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        // ✅ Successful login
        localStorage.setItem("isAdmin", "true");
        setStatus("success");

        // Redirect to dashboard
        window.location.href = "/admin/dashboard";
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
        <h1 className="text-2xl font-bold text-center text-pjh-blue mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-pjh-slate border border-white/20 text-pjh-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pjh-blue"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 rounded-lg bg-pjh-blue text-white font-semibold hover:bg-pjh-blue/80 transition"
          >
            {status === "loading" ? "Checking..." : "Login"}
          </button>

          {/* Status Messages */}
          {status === "error" && (
            <p className="text-red-400 text-center mt-2">
              Invalid password. Please try again.
            </p>
          )}
          {status === "success" && (
            <p className="text-green-400 text-center mt-2">Login successful!</p>
          )}
        </form>

        {/* Optional Back Link */}
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
