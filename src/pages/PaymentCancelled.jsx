import { useSearchParams } from "react-router-dom";

export default function PaymentCancelled() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const type = params.get("type");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-center px-6">
      <h1 className="text-4xl font-bold text-yellow-700 mb-4">
        Payment Cancelled ⚠️
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        It looks like you cancelled your {type} payment for order #{orderId}.  
        You can safely close this page or try again using the payment link in your email.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
      >
        Return Home
      </a>
    </div>
  );
}
