const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const pluginJest = require('eslint-plugin-jest');

module.exports = defineConfig([
  expoConfig,

  {
    ignores: ['dist/*'],
  },

  {
    files: ['**/*.test.js', '**/*.test.jsx', '**/*.spec.js'],
    ...pluginJest.configs['flat/recommended'],

    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
      },
    },
  },

  {
    files: ['src/setupTests.js'],
    languageOptions: {
      globals: {
        jest: 'readonly',
      },
    },
  },
]);
