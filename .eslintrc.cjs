/* eslint-disable no-undef */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    // Enforce consistent indentation
    'indent': ['error', 2],

    // Require the use of single quotes for strings
    'quotes': ['error', 'single'],

    // Enforce the use of semicolons
    'semi': ['error', 'always'],

    // Disallow unused variables
    'no-unused-vars': 'error',

    // Enforce consistent spacing inside array brackets
    'array-bracket-spacing': ['error', 'never'],

    // Enforce consistent spacing inside object literals
    'object-curly-spacing': ['error', 'always'],

    // Require parentheses when invoking a constructor with no arguments
    'new-parens': 'error',

    // Require a space before blocks
    'space-before-blocks': 'error',

    // Require a space before function parentheses
    'space-before-function-paren': ['error', 'never'],

    // Disallow trailing whitespace at the end of lines
    'no-trailing-spaces': 'error',

    // Enforce consistent comma style
    'comma-style': ['error', 'last'],

    // Disallow multiple spaces
    'no-multi-spaces': 'error',

    // Disallow unnecessary parentheses
    'no-extra-parens': 'error',

    // Enforce consistent line breaks
    'linebreak-style': ['error', 'unix'],

    // Require the use of strict mode
    'strict': 'error',
  },
};
