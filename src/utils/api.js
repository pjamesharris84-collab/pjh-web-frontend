// ============================================================
// PJH Web Services — API Helper (Final Production Version)
// ============================================================
// Centralises backend URL + ensures safe fetch + JSON parsing.
// Works seamlessly in dev (localhost) and production.
// ============================================================

export const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://pjh-web-backend-1.onrender.com";

/**
 * apiFetch()
 * Universal safe JSON fetch wrapper
 *
 * @param {string} endpoint - Example: '/api/customers'
 * @param {RequestInit} [options] - Fetch options
 * @returns {Promise<any>} Parsed JSON response
 */
export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE}${endpoint}`;

  let res;
  try {
    res = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body,
    });
  } catch (networkErr) {
    console.error(`🌐 Network error fetching ${url}:`, networkErr);
    throw new Error("Network connection failed. Check backend or CORS.");
  }

  let data;
  try {
    data = await res.json();
  } catch (parseErr) {
    console.error(`⚠️ Failed to parse JSON from ${url}:`, parseErr);
    data = {};
  }

  if (!res.ok) {
    console.error(`❌ API Error ${res.status}:`, data?.error || data);
    throw new Error(
      data?.error || data?.message || `API responded with ${res.status}`
    );
  }

  if (import.meta.env.DEV) {
    console.log(`📡 [API] ${url}`, { status: res.status, data });
  }

  return data;
}
