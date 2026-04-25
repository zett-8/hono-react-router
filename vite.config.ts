import adapter from '@hono/vite-dev-server/cloudflare'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import serverAdapter from 'hono-react-router-adapter/vite'
import { defineConfig, type PluginOption } from 'vite'
import { getLoadContext } from './load-context'

export default defineConfig((_) => ({
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    target: 'webworker',
    resolve: {
      conditions: ['workerd', 'worker', 'browser'],
      externalConditions: ['workerd', 'worker'],
    },
    optimizeDeps: {
      include: [
        'react',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-dom',
        'react-dom/server',
        'react-router',
        'remix-auth-oauth2',
      ],
    },
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    serverAdapter({ adapter, getLoadContext, entry: './server/index.ts' }),
  ] as PluginOption[],
}))
