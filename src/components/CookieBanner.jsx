import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-pjh-gray text-pjh-light p-4 shadow-lg z-50 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center md:text-left">
          We use cookies to improve your browsing experience and analyse site traffic.{" "}
          <Link to="/cookies" className="underline text-pjh-blue hover:text-pjh-cyan">
            Cookies Policy
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm bg-pjh-slate rounded hover:bg-pjh-gray-light transition"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-pjh-blue text-white rounded hover:bg-pjh-cyan transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
