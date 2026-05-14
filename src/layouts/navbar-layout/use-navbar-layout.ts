import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from 'src/contexts/user-provider/use-user'
import { useRole } from 'src/hooks/use-role'
import { RoutesEnum } from 'src/routes/routes'
import Auth from 'src/services/auth'

export const useNavbarLayout = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUser()
  const { isAdmin, isJury } = useRole()
  const { pathname } = useLocation()

  const handleLogout = async () => {
    await Auth.logout()

    setUser(null)
    navigate(RoutesEnum.AUTH_LOGIN)
  }

  const navLinks = [
    RoutesEnum.TOURNAMENTS,
    ...(isAdmin() ? [RoutesEnum.ADMIN] : []),
    ...(isJury() ? [RoutesEnum.JURY] : []),
  ]

  const selectedButton = navLinks.find(route => pathname.startsWith(route))

  const displayRole = (): string => {
    if (!user?.roles.length) return ''
    const role = user.roles[0].role
    return role.charAt(0).toUpperCase() + role.slice(1)
  }

  const handleOpenProfile = () => navigate(RoutesEnum.PROFILE)

  return { handleLogout, handleOpenProfile, selectedButton, displayRole, navLinks, navigate, user }
}
