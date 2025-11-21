module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: ['plugin:n8n-nodes-base/community'],
  ignorePatterns: [
    'dist',
    '*.js',
    'node_modules',
  ],
  rules: {
    'n8n-nodes-base/node-execute-block-missing-continue-on-fail': 'warn',
    'n8n-nodes-base/node-resource-description-filename-against-convention': 'warn',
  },
};
