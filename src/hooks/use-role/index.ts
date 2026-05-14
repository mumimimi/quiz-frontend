import { useUser } from 'src/contexts/user-provider/use-user'
import { UserRoleEnum } from 'src/enums'

export const useRole = () => {
  const { user } = useUser()

  const hasRole = (role: UserRoleEnum): boolean => {
    return user?.roles.some(r => r.role === role) ?? false
  }

  const isAdmin = (): boolean => hasRole(UserRoleEnum.ADMIN)
  const isJury = (): boolean => hasRole(UserRoleEnum.JURY)
  const isTeam = (): boolean => hasRole(UserRoleEnum.TEAM)

  const primaryRole = (): UserRoleEnum | null => {
    if (!user?.roles.length) return null
    if (isAdmin()) return UserRoleEnum.ADMIN
    if (isJury()) return UserRoleEnum.JURY
    return UserRoleEnum.TEAM
  }

  return { hasRole, isAdmin, isJury, isTeam, primaryRole }
}
