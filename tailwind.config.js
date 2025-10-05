/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // === PJH Web Services Refined Brand Palette ===
        "pjh-charcoal": "#1b1f24", // softer background
        "pjh-gray": "#2a2f36",
        "pjh-light": "#f5f7fa",
        "pjh-muted": "#9ca3af",
        "pjh-blue": "#3b82f6",
        "pjh-blue-dark": "#1e40af",
        "pjh-cyan": "#22d3ee",
        "pjh-glow": "#60a5fa",
      },
    },
  },
  plugins: [],
};
