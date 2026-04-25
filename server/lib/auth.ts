import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from '../../database/schema'

export const createAuth = (db: DrizzleD1Database<typeof schema>, env: Env) => {
  return betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    trustedOrigins: env.DEV ? ['http://localhost:5173'] : [],
    emailAndPassword: {
      enabled: true,
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5, // 5 minutes
      },
    },
  })
}

export type Auth = ReturnType<typeof createAuth>
