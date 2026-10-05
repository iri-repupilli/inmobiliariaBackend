import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./src/test-setup.ts'],
    exclude: ['dist/**', 'node_modules/**'],
    pool: 'forks',
    env: {
      NODE_ENV: 'test',
    },
  },
  esbuild: {
    target: 'es2020',
    keepNames: true,
  },
});
