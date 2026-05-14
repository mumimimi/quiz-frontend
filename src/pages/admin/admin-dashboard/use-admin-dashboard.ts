import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TournamentStatusEnum } from 'src/enums'
import { RoutesEnum } from 'src/routes/routes'
import { useGetTournaments } from 'src/hooks/services/use-get-tournaments'

export const useAdminDashboard = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data: tournaments = [], isLoading } = useGetTournaments()

  const stats = [
    {
      label: t('admin.dashboard.statDraft'),
      value: tournaments.filter(t_ => t_.status === TournamentStatusEnum.DRAFT).length,
    },
    {
      label: t('admin.dashboard.statRegistration'),
      value: tournaments.filter(t_ => t_.status === TournamentStatusEnum.REGISTRATION).length,
    },
    {
      label: t('admin.dashboard.statRunning'),
      value: tournaments.filter(t_ => t_.status === TournamentStatusEnum.RUNNING).length,
    },
    {
      label: t('admin.dashboard.statFinished'),
      value: tournaments.filter(t_ => t_.status === TournamentStatusEnum.FINISHED).length,
    },
  ]

  const handleManage = () => navigate(RoutesEnum.ADMIN_TOURNAMENTS)

  return { isLoading, stats, handleManage }
}
