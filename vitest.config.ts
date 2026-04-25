import { cloudflareTest } from '@cloudflare/vitest-pool-workers'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    cloudflareTest({
      wrangler: { configPath: './wrangler.toml' },
    }),
  ],
  test: {
    globals: true,
    server: {
      deps: {
        inline: ['@hono/clerk-auth', '@clerk/react-router', '@clerk/backend', 'snakecase-keys'],
      },
    },
  },
})
