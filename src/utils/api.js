// ============================================
// PJH Web Services — API Helper
// ============================================
// Centralizes backend connection logic so that
// the frontend works locally AND on production.
// ============================================

export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000";

/**
 * Fetch wrapper that automatically prefixes the backend URL
 * and handles JSON parsing + basic error handling.
 *
 * @param {string} endpoint - Example: '/api/customers'
 * @param {RequestInit} [options] - Fetch options
 * @returns {Promise<any>} Parsed JSON response
 */
export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE}${endpoint}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`❌ API error (${res.status}):`, text);
    throw new Error(`API error ${res.status}: ${text}`);
  }

  try {
    return await res.json();
  } catch {
    return {};
  }
}
