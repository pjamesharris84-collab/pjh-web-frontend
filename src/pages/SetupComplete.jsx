import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SetupComplete() {
  const navigate = useNavigate();

  // Optional: auto-redirect after a short delay
  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
      <div className="max-w-lg w-full bg-white shadow-md rounded-2xl p-8 border border-gray-200">
        <img
          src="/pjh-logo-dark.png"
          alt="PJH Web Services"
          className="w-32 mx-auto mb-6 opacity-90"
        />

        <h2 className="text-2xl font-semibold text-green-600 mb-3">
          Direct Debit Setup Complete
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you! Your Direct Debit mandate has been securely set up.
          You’ll receive an email confirmation shortly from Stripe on behalf of PJH Web Services.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>

          <p className="text-sm text-gray-400">
            You’ll be redirected automatically in a few seconds.
          </p>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} PJH Web Services. All rights reserved.
      </p>
    </div>
  );
}
