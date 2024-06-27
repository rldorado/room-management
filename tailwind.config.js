/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-dark': '#2E344D',
        'blue-light': '#F5F7FB'
      },
      borderRadius: {
        container: '26px',
        input: '12px',
        button: '12px'
      }
    }
  },
  plugins: []
}
