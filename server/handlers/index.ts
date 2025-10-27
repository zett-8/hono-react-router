import { Hono } from 'hono'

const apiHandler = new Hono<HonoENV>()

const _h = apiHandler
  // some other routes
  // .get('/users', ...getUsers)
  // .get('/users', ...getUsers)
  .get('/check', (c) => {
    return c.json({ status: 'ok' }, 200)
  })
export type RPC = typeof _h

export const setHandlers = (app: Hono<HonoENV>) => {
  app.route('/api', apiHandler)
  return app
}
