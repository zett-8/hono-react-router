import { drizzle } from 'drizzle-orm/d1'
import type { Hono, MiddlewareHandler } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { createFactory } from 'hono/factory'
import { logger } from 'hono/logger'
import * as schema from '../database/schema/index'
import { createRepositories } from './infrastructure/repositories'
import { createAuth } from './lib/auth'
import { createServices } from './services'

export const setMiddlewares = (app: Hono<HonoENV>): Hono<HonoENV> => {
  app.use(logger())
  app.use(contextStorage())

  app.use(async (c, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    c.res.headers.set('X-Response-Time', `${end - start}`)
  })

  app.use(setInfrastructure)
  app.use('/dashboard/*', requireAuth)

  return app
}

const F = createFactory<HonoENV>()

const setInfrastructure = F.createMiddleware(async (c, next) => {
  const db = drizzle(c.env.DB, { schema })
  const repositories = createRepositories(db)
  const services = createServices(repositories)
  const auth = createAuth(db, c.env)

  c.set('services', services)
  c.set('auth', auth)

  return next()
})

const requireAuth: MiddlewareHandler<HonoENV> = async (c, next) => {
  const auth = c.get('auth')
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    return c.redirect('/')
  }

  return next()
}
