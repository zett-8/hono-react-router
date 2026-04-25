import type { Auth } from '../server/lib/auth'
import type { Services } from '../server/services'

declare global {
  type HonoENV = {
    Bindings: Env
    Variables: {
      services: Services
      auth: Auth
    }
  }
}

export {}
