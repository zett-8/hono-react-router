import { cloudflareTest } from '@cloudflare/vitest-pool-workers'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
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
