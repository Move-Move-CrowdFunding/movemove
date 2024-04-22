module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["@nuxt/eslint-config", "plugin:prettier/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    "no-undef": "off",
    "prettier/prettier": "error",
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": "off",
  },
  plugins: ["prettier"],
};
