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
                "menu_active_light": "var(--menu_active_light)",
                "menu_active_dark": "var(--menu_active_dark)",
                "text_light": "var(--text_light)",
                "text_dark": "var(--text_dark)",
                "dropdown_light": "var(--dropdown_light)",
                "dropdown_dark": "var(--dropdown_dark)",
                "page_light": "var(--page_light)",
                "page_dark": "var(--page_dark)"
            }
        }
    },
    plugins: [],
    darkMode: 'class'
}