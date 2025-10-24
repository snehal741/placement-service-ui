export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#182a68',  // Updated to match your desired blue
          600: '#142254',
          700: '#101b40',
          800: '#0c142c',
          900: '#080d18',
        },
        // Override default blue colors with your desired navy blue palette
        blue: {
          50: '#f0f2f9',
          100: '#e1e6f3',
          200: '#c3cde7',
          300: '#a5b4db',
          400: '#879bcf',
          500: '#6982c3',  // Lighter version for main elements
          600: '#4b5b9f',
          700: '#3d4a82',
          800: '#182a68',  // Your chosen primary color
          900: '#121f4f',
        }
      }
    },
  },
  plugins: [],
}
