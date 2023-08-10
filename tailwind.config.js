/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navbar: '#080D14',
        accent1: '#39BEEC',
        accent2: '#0071BC',
        text1: '#FFFFFF',
        text2: '#9FA0A1',
        background1: '#161C26',
        background2: '#15151A',
        background3: '#030A14',
      },
    },
  },
  plugins: [],
}
