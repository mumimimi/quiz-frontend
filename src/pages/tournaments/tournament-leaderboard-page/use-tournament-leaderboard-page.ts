import { useNavigate, useParams } from 'react-router-dom'
import { RoutesEnum } from 'src/routes/routes'
import { useGetLeaderboardByTournament } from 'src/hooks/services/use-get-leaderboard-by-tournament'

export const useTournamentLeaderboardPage = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>()
  const navigate = useNavigate()
  const numId = Number(tournamentId)

  const { data: entries = [], isLoading, isError } = useGetLeaderboardByTournament(numId)

  const backUrl = RoutesEnum.TOURNAMENT_DETAIL.replace(':tournamentId', tournamentId ?? '')
  const handleBack = () => navigate(backUrl)

  return { entries, isLoading, isError, handleBack }
}
