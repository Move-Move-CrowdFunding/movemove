module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['prettier'],
  rules: {
    'no-undef': 'off',
    'prettier/prettier': 'error',
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
