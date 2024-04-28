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
      colors: {
        'primary-1': '#F57E31',
        'primary-2': '#FBB230',
        'primary-3': '#FDD00D',
        'secondary-1': '#2B4C7D',
        'secondary-2': '#4767A2',
        'secondary-3': '#6FBEE6',
        'secondary-4': '#80B5D6',
        'secondary-5': '#FFF7F1',
        'neutral-900': '#000000',
        'neutral-800': '#3D3D3D',
        'neutral-600': '#6F6F6F',
        'neutral-400': '#B7B7B7',
        'neutral-100': '#F3F3F3',
        'neutral-50': '#FFFFFF',
        'warning-500': '#FF4B30',
        'warning-300': '#EF9072',
        'warning-50': '#FFECE5',
        'warning-700': '#5B9D2D'
      }
    }
  },
  plugins: []
}
