const colors = require('./tailwindcss/colors')
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0.75rem'
      }
    }
  },
  plugins: []
}
