import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function ProtectedRoute() {
  const { isAuthenticated, isChecking } = useAuth()

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-text-secondary">
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
