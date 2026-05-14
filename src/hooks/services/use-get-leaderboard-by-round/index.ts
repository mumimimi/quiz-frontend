import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Leaderboard from 'src/services/leaderboard'

export const useGetLeaderboardByRound = (roundId: number) => {
  return useQuery({
    queryKey: [CacheKeys.GET_LEADERBOARD_BY_ROUND, roundId],
    queryFn: () => Leaderboard.getByRound(roundId),
    enabled: !!roundId,
  })
}
