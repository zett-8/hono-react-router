import { isRouteErrorResponse, Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'
import stylesheet from './global.css?url'
import { useSession, signOut } from './lib/auth-client'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  { rel: 'stylesheet', href: stylesheet },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { data: session, isPending } = useSession()

  return (
    <>
      <header className="fixed right-8 flex items-center justify-center px-4 py-8">
        {isPending ? null : session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">{session.user.email}</span>
            <button
              onClick={() => signOut()}
              className="cursor-pointer rounded border border-gray-300 bg-white px-3 py-1 text-sm text-gray-800 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            to="/sign-in"
            className="cursor-pointer rounded border border-gray-300 bg-white px-3 py-1 text-sm text-gray-800 hover:bg-gray-100"
          >
            Sign In
          </Link>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
