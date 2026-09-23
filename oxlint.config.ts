import { defineConfig } from 'oxlint'

export default defineConfig({
  categories: {
    correctness: 'error',
    suspicious: 'error',
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  ignorePatterns: ['build', '.wrangler', 'public', '.react-router'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'react/react-in-jsx-scope': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/anchor-is-valid': ['error', { components: ['Link', 'NavLink'], specialLink: ['to'] }],
  },
  settings: {
    'jsx-a11y': {
      components: {
        Link: 'a',
        NavLink: 'a',
        Form: 'form',
      },
    },
  },
})
