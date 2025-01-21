import { type AppLoadContext, redirect } from 'react-router'
import { Authenticator } from 'remix-auth'
import { GoogleStrategy } from '@coji/remix-auth-google'
import { eq } from 'drizzle-orm/sql/expressions/conditions'

import { users, type User } from '~/database/schema/user'

export const getAuthenticator = (context: AppLoadContext): Authenticator<User> => {
  const SESSION_SECRET = context.env.SESSION_SECRET
  const GOOGLE_CLIENT_ID = context.env.GOOGLE_CLIENT_ID
  const GOOGLE_CLIENT_SECRET = context.env.GOOGLE_CLIENT_SECRET
  const CLIENT_URL = context.env.CLIENT_URL

  if (!(SESSION_SECRET && GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && CLIENT_URL)) {
    throw new Error('SESSION_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CLIENT_URL are not all defined')
  }

  const googleStrategy = new GoogleStrategy<User>(
    {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      redirectURI: `${CLIENT_URL}/auth/google/callback`,
    },
    async ({ tokens }) => {
      const profile = await GoogleStrategy.userProfile(tokens)
      const [user] = await context.db.select().from(users).where(eq(users.email, profile.emails[0].value)).limit(1)

      if (user) return user

      const [newUser] = await context.db
        .insert(users)
        .values({
          userId: profile.id,
          email: profile.emails[0].value || '',
          password: '',
          name: profile.displayName,
          image: profile.photos[0].value || '',
          provider: 'google',
        })
        .returning()

      if (!newUser) {
        throw new Error('Failed to create a new user')
      }

      return newUser
    }
  )

  const authenticator = new Authenticator<User>()
  authenticator.use(googleStrategy)

  return authenticator
}

const SESSION_KEY = 'user'
export const getAuthSessionHandlers = async (context: AppLoadContext, request: Request) => {
  const session = await context.sessionStorage.getSession(request.headers.get('Cookie'))

  const getSessionUser = () => {
    return session?.get(SESSION_KEY)
  }

  const setSessionUser = async (user: User): Promise<Headers> => {
    session.set(SESSION_KEY, user)
    return new Headers({
      'Set-Cookie': await context.sessionStorage.commitSession(session),
    })
  }

  const deleteSession = async (): Promise<Headers> => {
    return new Headers({
      'Set-Cookie': await context.sessionStorage.destroySession(session),
    })
  }

  return { getSessionUser, setSessionUser, deleteSession }
}

export const logout = async (context: AppLoadContext, request: Request) => {
  const { deleteSession } = await getAuthSessionHandlers(context, request)
  const headers = await deleteSession()
  return redirect('/', { headers })
}

export const authRequired = async (context: AppLoadContext, request: Request): Promise<User> => {
  const { getSessionUser } = await getAuthSessionHandlers(context, request)
  const sessionUser = await getSessionUser()

  if (sessionUser) {
    console.log('sessionUser detected - ', sessionUser)
    return sessionUser
  }

  throw redirect('/login')
}
