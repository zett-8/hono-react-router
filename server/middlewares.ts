import type { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { logger } from 'hono/logger'

export const setMiddlewares = (app: Hono<HonoENV>): Hono<HonoENV> => {
  app.use(logger())
  app.use(contextStorage())

  app.use(async (c, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    c.res.headers.set('X-Response-Time', `${end - start}`)
  })

  return app
}
