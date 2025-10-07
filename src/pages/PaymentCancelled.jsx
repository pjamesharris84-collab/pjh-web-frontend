import { useSearchParams } from "react-router-dom";

export default function PaymentCancelled() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const type = params.get("type");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-pjh-light px-6 text-center">
      <div className="max-w-md bg-[#161b22] border border-yellow-500/20 rounded-2xl p-10 shadow-lg">
        <img
          src="/pjh-logo-light.png"
          alt="PJH Web Services"
          className="mx-auto w-28 mb-6"
        />
        <h1 className="text-3xl font-bold text-yellow-400 mb-3">
          Payment Cancelled ⚠️
        </h1>
        <p className="text-gray-300 mb-6 leading-relaxed">
          It looks like you cancelled your <span className="font-semibold">{type}</span>{" "}
          payment for order <span className="font-semibold">#{orderId}</span>.
          <br />
          You can try again anytime using your secure payment link.
        </p>
        <a
          href="/"
          className="inline-block bg-yellow-500 text-black font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-yellow-400 transition"
        >
          Return Home
        </a>
      </div>
      <p className="mt-8 text-xs text-gray-500">
        © {new Date().getFullYear()} PJH Web Services
      </p>
    </div>
  );
}
