import { Hono } from 'hono'
import { setMiddlewares } from './middlewares'

const app = new Hono<HonoENV>()

setMiddlewares(app)

export default app
