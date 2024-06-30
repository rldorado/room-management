/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-dark': '#2e344d',
        'blue-light': '#f5f7fb'
      },
      borderRadius: {
        container: '26px',
        input: '12px',
        button: '12px'
      },
      fontFamily: {
        helvetica: ['Helvetica', 'sans-serif']
      }
    }
  },
  plugins: []
}
