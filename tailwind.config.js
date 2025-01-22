/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neumorphism: 
        '0px 0px 16px 0 rgba(0, 0, 0, 0.1), -8px -8px 12px 0 rgba(30, 30, 30, 0.8)',
      },

      backgroundImage:{
        me3d:'url(/Image/me.png)',
        blur: 'linear-gradient(0deg, rgba(30,30,30,1) 0%, rgba(255,255,255,0) 100%)',
        dot:'radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0)',
        noise:'url(/Image/bg.png)',
        blurVt:'linear-gradient(90deg, rgba(30,30,30,1) 0%, rgba(30,30,30,1) 17%, rgba(255,248,248,0) 100%)',
      },
      fontFamily:{
        "sans":['Inter'],
        "serif":['"Open Sans"']

      },
      colors:{
        backgroundPrimary:"#1e1e1e"
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'reverse-infinite-scroll': 'infinite-scroll 25s linear infinite reverse',
        'leftAppear':'leftAppear linear ',

      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'leftAppear':{
          from:{
            transform: 'translateX(-100%)',
          },
          to:{
            transform: 'translateX(-25%)'
          }
        },
      },
      "meSq":"url('/Image/me.png')",
    },
  },
  plugins: [require('tailwindcss-motion')], 
}

