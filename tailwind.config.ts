import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-color": "#0078d4",
        "primary-color": "#00c6ff",
        "secondary-color": "#1d4ed8",
      },
      gradientColorStops: {
        // Generate gradient utilities
        "accent-color": "#0078d4",
        "primary-color": "#00c6ff",
        "secondary-color": "#1d4ed8",
      },
      backgroundImage: {
        'custom-bg': "url('/robocoin-bg.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
