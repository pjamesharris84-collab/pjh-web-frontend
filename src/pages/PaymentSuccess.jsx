import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const type = params.get("type");

  useEffect(() => {
    console.log(`✅ Payment success for order ${orderId} (${type})`);
  }, [orderId, type]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-pjh-light px-6 text-center">
      <div className="max-w-md bg-[#161b22] border border-white/10 rounded-2xl p-10 shadow-lg">
        <img
          src="/pjh-logo-light.png"
          alt="PJH Web Services"
          className="mx-auto w-28 mb-6"
        />
        <h1 className="text-3xl font-bold text-pjh-blue mb-3">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Thank you for your <span className="font-semibold">{type}</span>{" "}
          payment for order <span className="font-semibold">#{orderId}</span>.
          <br />
          A receipt has been emailed to you.
        </p>
        <a
          href="/"
          className="inline-block bg-pjh-blue text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-pjh-blue/80 transition"
        >
          Return to Website
        </a>
      </div>
      <p className="mt-8 text-xs text-gray-500">
        © {new Date().getFullYear()} PJH Web Services
      </p>
    </div>
  );
}
