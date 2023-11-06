/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "menu_light": "var(--menu_light)",
        "menu_dark": "var(--menu_dark)",
        "text_light": "var(--text_light)",
        "text_dark": "var(--text_dark)",
        "dropdown_light": "var(--dropdown_light)",
        "dropdown_dark": "var(--dropdown_dark)"
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}

