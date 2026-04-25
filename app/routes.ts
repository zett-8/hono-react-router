import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/sample', 'routes/sample.tsx'),
  route('/sign-in', 'routes/sign-in.tsx'),
  route('/sign-up', 'routes/sign-up.tsx'),
  // Auth required routes (verified on Hono server)
  route('/dashboard', 'routes/dashboard.tsx'),
] satisfies RouteConfig
