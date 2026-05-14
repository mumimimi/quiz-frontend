import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Team from 'src/services/team'

export const useGetTeamsByTournament = (tournamentId: number) => {
  return useQuery({
    queryKey: [CacheKeys.GET_TEAMS_BY_TOURNAMENT, tournamentId],
    queryFn: () => Team.getAllByTournament(tournamentId),
    enabled: !!tournamentId,
  })
}
