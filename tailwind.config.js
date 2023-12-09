/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    safelist: [
        {
          pattern: /bg-(red|green|blue|yellow)-(100|200|300|400|500|600|700|800|900)/,
          variants: ['hover', 'focus'],
        },
        'fill-gray-500',
        'animate-spin'
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
                "page_dark": "var(--page_dark)",
                "card_light": "var(--card_light)",
                "card_dark": "var(--card_dark)",
                "input_disabled_light": "var(--input_disabled_light)",
                "input_disabled_dark": "var(--input_disabled_dark)"
            }
        }
    },
    plugins: [],
    darkMode: 'class'
}