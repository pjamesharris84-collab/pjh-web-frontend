import { useSearchParams } from "react-router-dom";

export default function PaymentFailed() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const type = params.get("type");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-6">
      <h1 className="text-4xl font-bold text-red-700 mb-4">
        Payment Failed ❌
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Unfortunately, your {type} payment for order #{orderId} didn’t go through.  
        Please check your card details and try again.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Try Again
      </a>
    </div>
  );
}
