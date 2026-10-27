module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d7f1ff',
          200: '#b6e6ff',
          300: '#80d5ff',
          400: '#46bbff',
          500: '#1d98f1',
          600: '#0f76c7',
          700: '#115da0',
          800: '#134e83',
          900: '#163f69',
        },
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
};
