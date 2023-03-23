/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    quotes: ['error', 'single'],
    semi: [1, 'always'],
    'comma-dangle': ['error', 'always-multiline'],
  },
};
