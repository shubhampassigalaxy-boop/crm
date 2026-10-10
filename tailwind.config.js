/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF4FF',
          100: '#DBE6FE',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF'
        },
        secondary: '#0F172A',
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
        surface: '#F8FAFC'
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 1px 3px 0 rgba(15, 23, 42, 0.06)'
      }
    }
  },
  plugins: []
}
