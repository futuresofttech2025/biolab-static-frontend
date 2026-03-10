export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  safelist: [
    'lg:ml-[72px]',
    'lg:ml-[260px]',
  ],
  theme: {
    extend: {
      fontFamily: { display: ['"Space Grotesk"','sans-serif'], sans: ['Inter','system-ui','sans-serif'] },
    },
  },
  plugins: [],
};
