import { Hono } from 'hono'
import { todosDelete, todosGet, todosPost } from './todo.handler'

const apiHandler = new Hono<HonoENV>()

const _h = apiHandler
  .get('/todos', ...todosGet)
  .post('/todos', ...todosPost)
  .delete('/todos/:id', ...todosDelete)
  .get('/check', (c) => {
    return c.json({ status: 'ok' }, 200)
  })
export type RPC = typeof _h

export const setHandlers = (app: Hono<HonoENV>) => {
  // Better Auth API routes
  app.on(['POST', 'GET'], '/api/auth/**', (c) => {
    const auth = c.get('auth')
    return auth.handler(c.req.raw)
  })

  app.route('/api', apiHandler)
  return app
}
