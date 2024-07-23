/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    },
    extend: {
      colors: {
        // for light mode
        primary: {
          100: '#d4eaf7',
          200: '#b6ccd8',
          300: '#3b3c3d',
        },
        accent: {
          100: '#71c4ef',
          200: '#00668c',
        },
        text: {
          100: '#1d1c1c',
          200: '#313d44',
        },
        bg: {
          100: '#fffefb',
          200: '#f5f4f1',
          300: '#cccbc8',
        },

        //for dark mode
        darkPrimary: {
          100: '#0085ff',
          200: '#69b4ff',
          300: '#e0ffff',
        },
        darkAccent: {
          100: '#006fff',
          200: '#e1ffff',
        },
        darkText: {
          100: '#FFFFFF',
          200: '#9e9e9e',
        },
        darkBg: {
          100: '#1E1E1E',
          200: '#2d2d2d',
          300: '#454545',
        },
      },
    },
  },
  plugins: [],
}