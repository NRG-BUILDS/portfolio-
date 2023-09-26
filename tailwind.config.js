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
        primary: 'rgb(139, 179, 165)',
        deep: 'rgb(10, 47, 34)',
        light: 'rgb(177, 255, 100)',
        faint: 'rgb(204, 246, 204)'
      },
      fontSize: {
        heroHead: 'clamp(40px, 7.5vw, 80px)',
        heading: 'clamp(20px, 4vw, 32px)'
      },
    },
  },
  plugins: [],
}
