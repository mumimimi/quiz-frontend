import { JSX } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from 'src/contexts/user-provider/use-user'
import { RoutesEnum } from 'src/routes/routes'
import type { ProtectedRouteProps } from './types'

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps): JSX.Element => {
  const { user } = useUser()

  if (!user) {
    return <Navigate to={RoutesEnum.AUTH_LOGIN} replace />
  }

  if (allowedRoles?.length) {
    console.log(allowedRoles)
    console.log(user.roles)
    const hasAccess = user.roles.some(r => allowedRoles.includes(r.role))
    if (!hasAccess) {
      return <Navigate to={RoutesEnum.TOURNAMENTS} replace />
    }
  }

  return <Outlet />
}

export default ProtectedRoute
