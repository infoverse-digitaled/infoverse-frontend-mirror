import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#33A1CD', // Teal-Blue - decorative surfaces/large elements only, fails WCAG AA as text/button-fill
          light: '#6BB3D4',
          dark: '#2A85A8', // Slightly darker for hover states
          text: '#1D6E8C', // WCAG AA (5.7:1 on white) - use for small text and button fills with white text
          textHover: '#17586F', // Darker hover state for the `text` shade above
        },
        secondary: {
          DEFAULT: '#E87B5C', // Coral/Orange - decorative surfaces/large elements only, fails WCAG AA as text/button-fill
          light: '#F29580',
          dark: '#D66B4D',
          text: '#B14E33', // WCAG AA (5.2:1 on white) - use for small text and button fills with white text
          textHover: '#8F3E29', // Darker hover state for the `text` shade above
        },
        accent: {
          coral: '#D4856D', // Icon backgrounds
          blueGray: '#BDD0D2', // Inputs/Cards
        },
        background: {
          dark: '#2C5F75', // Hero sections
          light: '#F3F3F3', // Page background
        },
        text: {
          dark: '#333333', // Headings
          light: '#7A7A7A', // Secondary text
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(51, 161, 205, 0.1)', // Subtle primary-tinted shadow
        'card': '0 2px 10px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
export default config;