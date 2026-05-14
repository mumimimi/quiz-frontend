import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Tournament from 'src/services/tournament'

export const useGetTournament = (id: number) => {
  return useQuery({
    queryKey: [CacheKeys.GET_TOURNAMENT, id],
    queryFn: () => Tournament.getById(id),
    enabled: !!id,
  })
}
