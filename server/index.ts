import { Hono } from 'hono'
import { setHandlers } from './handlers'
import { setMiddlewares } from './middlewares'

const app = new Hono<HonoENV>()

setMiddlewares(app)
setHandlers(app)

export default app
