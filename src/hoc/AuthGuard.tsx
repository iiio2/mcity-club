import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import NoAccess from '../components/NoAccess'
import { useAuth } from '../services/auth'

interface Props {
  children?: ReactNode
}

function AuthGuard({ children }: Props) {
  const { user, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading)
    return null

  if (!user)
    return <Navigate to="/sign_in" replace state={{ from: location.pathname }} />

  if (!isAdmin)
    return <NoAccess />

  return <>{children}</>
}

export default AuthGuard
