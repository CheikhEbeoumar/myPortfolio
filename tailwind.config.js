/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        brutal: {
          yellow: '#FFDE00',
          pink: '#FF90E8',
          cyan: '#00E5FF',
          lime: '#B8FF00',
          orange: '#FF7A00',
          blue: '#2D6CDF',
          purple: '#B69CFF',
          red: '#FF5C5C',
          cream: '#FFFDF0',
          ink: '#000000',
        },
      },
      boxShadow: {
        brutal: '6px 6px 0 0 #000000',
        'brutal-sm': '4px 4px 0 0 #000000',
        'brutal-lg': '10px 10px 0 0 #000000',
        'brutal-xl': '14px 14px 0 0 #000000',
        'brutal-press': '2px 2px 0 0 #000000',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
}
