import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**/*', 'node_modules/**/*']
  },
  ...tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
  ).map(config => ({
    ...config,
    files: ['**/*.{js,ts,tsx}'],
  })),
  {
    files: ['firestore.rules'],
    ...firebaseRulesPlugin.configs['flat/recommended'],
  },
];
