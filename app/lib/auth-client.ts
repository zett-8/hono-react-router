import { createAuthClient } from 'better-auth/react'

const authClient = createAuthClient({
  baseURL: import.meta.env.DEV ? 'http://localhost:5173' : undefined,
})

export const signIn = authClient.signIn
export const signUp = authClient.signUp
export const signOut = authClient.signOut
export const useSession = authClient.useSession
