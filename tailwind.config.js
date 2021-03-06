module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#0075EA',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
