import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
eslint.configs.recommended,
...tseslint.configs.recommended,
eslintConfigPrettier,
...eslintPluginAstro.configs.recommended,
  {
    rules: {},
    ignores: [
      "package-lock.json",
      "dist/",
      ".astro/",
      "node_modules/",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "pnpm-debug.log*",
      ".env",
      ".env.production",
      ".DS_Store",
      ".idea/",
    ],
  },
];
