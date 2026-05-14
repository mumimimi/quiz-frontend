import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Round from 'src/services/round'

export const useGetRound = (id: number) => {
  return useQuery({
    queryKey: [CacheKeys.GET_ROUND, id],
    queryFn: () => Round.getById(id),
    enabled: !!id,
  })
}
