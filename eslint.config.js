import eslintNext from 'eslint-config-next/core-web-vitals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const flatConfig = eslintNext.extends ?? eslintNext;

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      ...flatConfig[0]?.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
    settings: {
      next: {
        rootDir: './',
      },
    },
  },
];
