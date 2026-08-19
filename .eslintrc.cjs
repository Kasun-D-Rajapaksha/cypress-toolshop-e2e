module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  plugins: ['cypress'],
  extends: ['eslint:recommended', 'plugin:cypress/recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['cypress.config.js', '.eslintrc.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  ignorePatterns: ['node_modules/', 'cypress/reports/', 'cypress/videos/', 'cypress/screenshots/'],
}
