import { useNavigate } from 'react-router-dom'
import { TournamentStatusEnum } from 'src/enums'
import { RoutesEnum } from 'src/routes/routes'
import { useGetTournaments } from 'src/hooks/services/use-get-tournaments'

export const useAdminDashboard = () => {
  const navigate = useNavigate()
  const { data: tournaments = [], isLoading } = useGetTournaments()

  const stats = [
    {
      label: 'Draft',
      value: tournaments.filter(t => t.status === TournamentStatusEnum.DRAFT).length,
    },
    {
      label: 'Registration',
      value: tournaments.filter(t => t.status === TournamentStatusEnum.REGISTRATION)
        .length,
    },
    {
      label: 'Running',
      value: tournaments.filter(t => t.status === TournamentStatusEnum.RUNNING)
        .length,
    },
    {
      label: 'Finished',
      value: tournaments.filter(t => t.status === TournamentStatusEnum.FINISHED)
        .length,
    },
  ]

  const handleManage = () => navigate(RoutesEnum.ADMIN_TOURNAMENTS)

  return { isLoading, stats, handleManage }
}
