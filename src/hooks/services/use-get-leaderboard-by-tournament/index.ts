import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Leaderboard from 'src/services/leaderboard'

export const useGetLeaderboardByTournament = (tournamentId: number) => {
  return useQuery({
    queryKey: [CacheKeys.GET_LEADERBOARD_BY_TOURNAMENT, tournamentId],
    queryFn: () => Leaderboard.getByTournament(tournamentId),
    enabled: !!tournamentId,
  })
}
