module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-undef': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
