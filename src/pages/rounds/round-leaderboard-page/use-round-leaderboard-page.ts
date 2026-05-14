import { useNavigate, useParams } from 'react-router-dom'
import { RoutesEnum } from 'src/routes/routes'
import { useGetLeaderboardByRound } from 'src/hooks/services/use-get-leaderboard-by-round'

export const useRoundLeaderboardPage = () => {
  const { roundId } = useParams<{ roundId: string }>()
  const navigate = useNavigate()
  const numId = Number(roundId)

  const { data: rawEntries = [], isLoading, isError } = useGetLeaderboardByRound(numId)
  const entries = rawEntries.filter(e => e.team != null)

  const backUrl = RoutesEnum.ROUND_DETAIL.replace(':roundId', roundId ?? '')
  const handleBack = () => navigate(backUrl)

  return { entries, isLoading, isError, handleBack }
}
