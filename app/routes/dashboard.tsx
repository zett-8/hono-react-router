import { useSession } from '../lib/auth-client'

export default function DashboardPage() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return <div className="p-4">Loading...</div>
  }

  if (!session) {
    return <div className="p-4">Not authenticated</div>
  }

  return (
    <div className="p-4">
      <h1 className="my-4 text-2xl font-bold">Dashboard</h1>

      <div>
        <h2 className="text-lg font-semibold">User Information</h2>
        <ul className="mt-2 space-y-1">
          <li>ID: {session.user.id}</li>
          <li>Name: {session.user.name}</li>
          <li>Email: {session.user.email}</li>
        </ul>
      </div>
    </div>
  )
}
