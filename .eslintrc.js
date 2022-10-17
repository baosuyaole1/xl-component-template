module.exports = {
  root: true,
  env: {
    node: true,
    browser: true, // browser global variables
    es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'eslint-config-airbnb-base',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.json',
    sourceType: 'module',
  },

  rules: {
    'prettier/prettier': 'error',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', './src'],
      },
    },
  },
};
