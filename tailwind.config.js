module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#010042',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
