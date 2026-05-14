import { UserRoleEnum } from 'src/enums'

export type ProtectedRouteProps = {
  allowedRoles?: UserRoleEnum[]
}
