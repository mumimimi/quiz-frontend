import { useNavigate, useParams } from 'react-router-dom'
import { useRole } from 'src/hooks/use-role'
import { TournamentStatusEnum, RoundStatusEnum } from 'src/enums'
import { RoutesEnum } from 'src/routes/routes'
import { useGetTournament } from 'src/hooks/services/use-get-tournament'
import { useGetRoundsByTournament } from 'src/hooks/services/use-get-rounds-by-tournament'

export const useTournamentDetailPage = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>()
  const navigate = useNavigate()
  const { isTeam } = useRole()
  const numId = Number(tournamentId)

  const { data: tournament, isLoading: lt, isError: et } = useGetTournament(numId)
  const { data: rounds = [], isLoading: lr } = useGetRoundsByTournament(numId)

  const hasResults =
    tournament?.status === TournamentStatusEnum.FINISHED ||
    rounds.some(r => r.status === RoundStatusEnum.EVALUATED)

  const canRegister = isTeam() && tournament?.status === TournamentStatusEnum.REGISTRATION

  const handleBack = () => navigate(RoutesEnum.TOURNAMENTS)
  const toRound = (roundId: number) =>
    navigate(RoutesEnum.ROUND_DETAIL.replace(':roundId', String(roundId)))
  const toLeaderboard = () =>
    navigate(RoutesEnum.TOURNAMENT_LEADERBOARD.replace(':tournamentId', tournamentId!))
  const toRegister = () =>
    navigate(RoutesEnum.TEAM_REGISTER.replace(':tournamentId', tournamentId!))

  return {
    tournament,
    rounds,
    isLoading: lt || lr,
    isError: et,
    hasResults,
    canRegister,
    handleBack,
    toRound,
    toLeaderboard,
    toRegister,
  }
}
