export const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:5000";
export function api(path) { return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`; }
