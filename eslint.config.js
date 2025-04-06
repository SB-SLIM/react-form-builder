import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import perfectionist from 'eslint-plugin-perfectionist';
import pluginReact from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json',
        createDefaultProgram: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js, 'unused-imports': unusedImports, perfectionist },
    extends: ['js/recommended'],
    rules: {
      '@typescript-eslint/ban-ts-comment': [0],
      '@typescript-eslint/no-redeclare': [2],
      '@typescript-eslint/no-explicit-any': [0],
      '@typescript-eslint/no-unused-vars': [0],
      '@typescript-eslint/ban-types': [0],
      '@typescript-eslint/consistent-type-imports': [
        2,
        { fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': 2,
      'jsdoc/valid-types': 2,
      'jsdoc/require-returns': 2,
      'jsdoc/require-param-type': 2,

      // React rules
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
      'react/no-children-prop': 'error',

      // unused-imports
      // https://www.npmjs.com/package/eslint-plugin-unused-imports
      'unused-imports/no-unused-imports': 1,
      'unused-imports/no-unused-vars': [
        0,
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // perfectionist
      // https://eslint-plugin-perfectionist.azat.io/

      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: ['multiline', 'unknown', 'shorthand'],
        },
      ],

      'perfectionist/sort-named-imports': [
        1,
        {
          order: 'asc',
          type: 'line-length',
        },
      ],
      'perfectionist/sort-named-exports': [
        1,
        {
          order: 'asc',
          type: 'line-length',
        },
      ],
      'perfectionist/sort-exports': [
        1,
        {
          order: 'asc',
          type: 'line-length',
        },
      ],
      'perfectionist/sort-imports': [
        1,
        {
          order: 'asc',
          type: 'line-length',
          'newlinesBetween': 'always',
          groups: [
            ['builtin', 'external'],
            'custom-configs',
            'custom-components',
            'custom-hooks',
            'custom-utils',
            'internal',
            [('parent', 'sibling', 'index')],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              'custom-hooks': ['^hooks$'],
              'custom-utils': ['^utils$'],
              'custom-components': ['^components$'],
              'custom-assets': ['^assets$'],
              'custom-configs': ['^configs$'],
            },
          },
        },
      ],
    },
  },
  // TypeScript recommended config
  tseslint.configs.recommended,

  // React recommended config
  pluginReact.configs.flat.recommended,

  // JSdoc recommended config
  jsdoc.configs['flat/recommended'],
]);
