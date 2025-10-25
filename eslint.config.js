import eslintPluginAstro from "eslint-plugin-astro";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {},
    ignores: [
'package-lock.json',
'dist/',
'.astro/',
'node_modules/',
'npm-debug.log*',
'yarn-debug.log*',
'yarn-error.log*',
'pnpm-debug.log*',
'.env',
'.env.production',
'.DS_Store',
'.idea/',
    ],
  },
];
