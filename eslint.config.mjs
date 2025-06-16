import globals from 'globals';
import pluginJs from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.playwright,
      },
    },
  },
  eslintConfigPrettier,
  {
    ...pluginJs.configs.recommended,
    ...playwright.configs['flat/recommended'],
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      'no-unused-vars': 'error',
      'max-len': [
        'error',
        {
          code: 80,
          comments: 80,
          ignorePatterns: 'import *',
        },
      ],
      'playwright/expect-expect': 'off',
    },
    ignores: [
      '**/node_modules/*',
      'playwright.config.js',
      '**/playwright-report/**',
    ],
  },
];

