import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function DirectDebitSetup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const clientSecret = searchParams.get("client_secret");

  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error" | "success"
  const [message, setMessage] = useState("");

  useEffect(() => {
    const startSetup = async () => {
      if (!clientSecret) {
        setStatus("error");
        setMessage("Missing client secret. Please use the link sent to your email.");
        return;
      }

      try {
        const stripe = await stripePromise;
        const elements = stripe.elements({ clientSecret });
        setStatus("ready");

        const result = await stripe.confirmSetup({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/setup-complete`,
          },
        });

        if (result.error) {
          console.error("❌ Direct Debit setup error:", result.error);
          setStatus("error");
          setMessage(result.error.message || "Setup failed. Please try again.");
        } else {
          setStatus("success");
          setMessage("Your Direct Debit setup is being confirmed.");
        }
      } catch (err) {
        console.error("⚠️ Stripe setup error:", err);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again later.");
      }
    };

    startSetup();
  }, [clientSecret]);

  const handleReturn = () => navigate("/");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
      <div className="max-w-lg w-full bg-white shadow-md rounded-2xl p-8 border border-gray-200">
        <img
          src="/pjh-logo-dark.png"
          alt="PJH Web Services"
          className="w-32 mx-auto mb-6 opacity-90"
        />
        {status === "loading" && (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Setting up your Direct Debit...
            </h2>
            <p className="text-gray-500">
              Please wait a moment while we securely connect to Stripe.
            </p>
          </>
        )}

        {status === "ready" && (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Please complete your mandate setup
            </h2>
            <p className="text-gray-500">
              Follow the on-screen instructions in the secure Stripe form.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Setup Complete
            </h2>
            <p className="text-gray-600 mb-6">
              Your Direct Debit mandate is being processed. You’ll receive a
              confirmation email shortly.
            </p>
            <button
              onClick={handleReturn}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Return to Dashboard
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Setup Failed
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={handleReturn}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Return Home
            </button>
          </>
        )}
      </div>

      <p className="mt-6 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} PJH Web Services. All rights reserved.
      </p>
    </div>
  );
}
