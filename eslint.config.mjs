// ESLint (flat config) with the recommended rules of typescript-eslint, as with ESLint 7 before
// 2.12.0. The formatting is Prettier's (npm run format).
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig({
  files: ['src/**/*.ts'],
  extends: [tseslint.configs.recommended],
  rules: {
    'prefer-const': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
