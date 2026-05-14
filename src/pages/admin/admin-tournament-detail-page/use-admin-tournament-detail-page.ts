import { useNavigate, useParams } from 'react-router-dom'
import { ModalsEnum, TournamentStatusEnum } from 'src/enums'
import { RoutesEnum } from 'src/routes/routes'
import { useGetTournament } from 'src/hooks/services/use-get-tournament'
import { useGetRoundsByTournament } from 'src/hooks/services/use-get-rounds-by-tournament'
import { useGetTeamsByTournament } from 'src/hooks/services/use-get-teams-by-tournament'
import { useUpdateTournamentStatus } from 'src/hooks/services/use-update-tournament-status'
import { useDeleteTournament } from 'src/hooks/services/use-delete-tournament'
import { useModals } from 'src/contexts/modal-provider/use-modals'

const nextStatusMap: Partial<Record<TournamentStatusEnum, TournamentStatusEnum>> = {
  [TournamentStatusEnum.DRAFT]: TournamentStatusEnum.REGISTRATION,
  [TournamentStatusEnum.REGISTRATION]: TournamentStatusEnum.RUNNING,
  [TournamentStatusEnum.RUNNING]: TournamentStatusEnum.FINISHED,
}

const statusButtonLabel: Partial<Record<TournamentStatusEnum, string>> = {
  [TournamentStatusEnum.DRAFT]: 'Open Registration',
  [TournamentStatusEnum.REGISTRATION]: 'Start Tournament',
  [TournamentStatusEnum.RUNNING]: 'Finish Tournament',
}

export const useAdminTournamentDetailPage = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>()
  const navigate = useNavigate()
  const numId = Number(tournamentId)
  const { onOpen } = useModals()

  const { data: tournament, isLoading: lt, isError: et } = useGetTournament(numId)
  const { data: rounds = [], isLoading: lr } = useGetRoundsByTournament(numId)
  const { data: teams = [], isLoading: ltm } = useGetTeamsByTournament(numId)
  const updateStatusMutation = useUpdateTournamentStatus()
  const deleteMutation = useDeleteTournament()

  const nextStatus = tournament ? nextStatusMap[tournament.status] : undefined
  const buttonLabel = tournament ? statusButtonLabel[tournament.status] : undefined

  const handleBack = () => navigate(RoutesEnum.ADMIN_TOURNAMENTS)
  const handleEdit = () =>
    navigate(RoutesEnum.ADMIN_TOURNAMENT_EDIT.replace(':tournamentId', String(tournamentId)))
  const handleAddRound = () =>
    navigate(RoutesEnum.ADMIN_ROUNDS_CREATE.replace(':tournamentId', String(tournamentId)))
  const handleNavigateToRound = (roundId: number) =>
    navigate(
      RoutesEnum.ADMIN_ROUND_DETAIL
        .replace(':tournamentId', String(tournamentId))
        .replace(':roundId', String(roundId)),
    )
  const handleNavigateToTeam = (teamId: number) =>
    navigate(RoutesEnum.TEAM_DETAIL.replace(':teamId', String(teamId)))

  const handleChangeStatus = () => {
    if (!nextStatus || !buttonLabel || !tournament) return
    onOpen({
      name: ModalsEnum.CONFIRM_DIALOG,
      title: 'Change tournament status',
      data: {
        message: `This will move the tournament to "${nextStatus}". Continue?`,
        confirmLabel: buttonLabel,
        onConfirm: async () => {
          await updateStatusMutation.mutateAsync({ id: tournament.id, status: nextStatus })
        },
      },
    })
  }

  const handleDelete = () => {
    if (!tournament) return
    onOpen({
      name: ModalsEnum.CONFIRM_DIALOG,
      title: 'Delete tournament',
      data: {
        message: `Are you sure you want to delete "${tournament.name}"? This action cannot be undone.`,
        confirmLabel: 'Delete',
        onConfirm: async () => {
          await deleteMutation.mutateAsync({ id: tournament.id })
          navigate(RoutesEnum.ADMIN_TOURNAMENTS)
        },
      },
    })
  }

  return {
    tournament,
    rounds,
    teams,
    isLoading: lt || lr || ltm,
    isError: et,
    nextStatus,
    buttonLabel,
    handleBack,
    handleEdit,
    handleAddRound,
    handleNavigateToRound,
    handleNavigateToTeam,
    handleChangeStatus,
    handleDelete,
  }
}
