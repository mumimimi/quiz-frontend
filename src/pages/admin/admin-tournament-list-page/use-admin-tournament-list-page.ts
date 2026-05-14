import { useNavigate } from 'react-router-dom'
import { RoutesEnum } from 'src/routes/routes'
import { useGetTournaments } from 'src/hooks/services/use-get-tournaments'

export const useAdminTournamentListPage = () => {
  const navigate = useNavigate()
  const { data: tournaments = [], isLoading } = useGetTournaments()

  const handleBack = () => navigate(RoutesEnum.ADMIN)
  const handleCreate = () => navigate(RoutesEnum.ADMIN_TOURNAMENTS_CREATE)
  const handleView = (id: number) =>
    navigate(RoutesEnum.ADMIN_TOURNAMENT_DETAIL.replace(':tournamentId', String(id)))
  const handleEdit = (id: number) =>
    navigate(RoutesEnum.ADMIN_TOURNAMENT_EDIT.replace(':tournamentId', String(id)))

  return { tournaments, isLoading, handleBack, handleCreate, handleView, handleEdit }
}
