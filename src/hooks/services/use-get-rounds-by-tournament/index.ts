import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Round from 'src/services/round'

export const useGetRoundsByTournament = (tournamentId: number) => {
  return useQuery({
    queryKey: [CacheKeys.GET_ROUNDS_BY_TOURNAMENT, tournamentId],
    queryFn: () => Round.getAllByTournament(tournamentId),
    enabled: !!tournamentId,
  })
}
