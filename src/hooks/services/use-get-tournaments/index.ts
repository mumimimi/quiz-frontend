import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Tournament from 'src/services/tournament'

export const useGetTournaments = () => {
  return useQuery({
    queryKey: [CacheKeys.GET_TOURNAMENTS],
    queryFn: Tournament.getAll,
  })
}
