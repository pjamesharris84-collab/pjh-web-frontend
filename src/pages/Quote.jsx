// src/pages/Quote.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Quote() {
  const [searchParams] = useSearchParams();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customPrice, setCustomPrice] = useState("");
  const packageId = searchParams.get("package");

  useEffect(() => {
    if (packageId) {
      fetch(`${import.meta.env.VITE_API_URL}/api/packages/${packageId}`)
        .then((res) => res.json())
        .then(setSelectedPackage);
    }
  }, [packageId]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Request a Quote</h1>

      {selectedPackage && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-blue-600">{selectedPackage.name}</h2>
          <p className="text-gray-600">{selectedPackage.tagline}</p>
          <p className="text-sm mt-2">
            Base price: <strong>£{selectedPackage.price_oneoff}</strong>
          </p>

          <label className="block mt-4">
            Override Price (optional):
            <input
              type="number"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mt-1"
              placeholder="e.g. 1200"
            />
          </label>

          <p className="text-gray-500 text-sm mt-2">
            You can adjust the quoted price for discounts or custom projects.
          </p>
        </div>
      )}

      {/* rest of your quote form fields here */}
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Submit Quote Request
      </button>
    </div>
  );
}
