import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Jury from 'src/services/jury'

export const useGetMyAssignments = (roundId?: number) => {
  return useQuery({
    queryKey: roundId ? [CacheKeys.GET_MY_ASSIGNMENTS, roundId] : [CacheKeys.GET_MY_ASSIGNMENTS],
    queryFn: () => Jury.getMyAssignments(roundId),
  })
}
