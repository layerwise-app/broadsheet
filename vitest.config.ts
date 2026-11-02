import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

// Separate from vite.config.ts: tests need none of the Worker or Start plugins.
export default defineConfig({
  resolve: { alias: { '~': resolve(import.meta.dirname, 'src') } },
  test: { include: ['tests/**/*.test.ts'] }
});
