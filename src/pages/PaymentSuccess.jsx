import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const type = params.get("type");

  useEffect(() => {
    // Optionally trigger a refresh or confirmation API call
    console.log(`✅ Payment success for order ${orderId} (${type})`);
  }, [orderId, type]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        Payment Successful 🎉
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your {type} payment for order #{orderId}.  
        A receipt has been sent to your email.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Return to Website
      </a>
    </div>
  );
}
