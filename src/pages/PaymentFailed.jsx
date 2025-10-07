import { useSearchParams } from "react-router-dom";

export default function PaymentFailed() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const type = params.get("type");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-pjh-light px-6 text-center">
      <div className="max-w-md bg-[#161b22] border border-red-600/30 rounded-2xl p-10 shadow-lg">
        <img
          src="/pjh-logo-light.png"
          alt="PJH Web Services"
          className="mx-auto w-28 mb-6"
        />
        <h1 className="text-3xl font-bold text-red-500 mb-3">
          Payment Failed ❌
        </h1>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Your <span className="font-semibold">{type}</span> payment for order{" "}
          <span className="font-semibold">#{orderId}</span> did not go through.
          <br />
          Please check your card details or try again.
        </p>
        <a
          href="/"
          className="inline-block bg-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-red-700 transition"
        >
          Try Again
        </a>
      </div>
      <p className="mt-8 text-xs text-gray-500">
        © {new Date().getFullYear()} PJH Web Services
      </p>
    </div>
  );
}
