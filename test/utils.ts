export const setTestEnv = (env: Record<string, unknown>) => ({
  ...env,
  BETTER_AUTH_SECRET: 'test-secret-key-for-testing-purposes',
  BETTER_AUTH_URL: 'http://localhost:5173',
})
