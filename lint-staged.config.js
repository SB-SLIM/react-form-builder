export default {
  '**/*.{ts,tsx}': ['eslint', () => 'tsc --noEmit', 'prettier --write'],
  'docs/**/*.md': ['prettier --write'],
};
