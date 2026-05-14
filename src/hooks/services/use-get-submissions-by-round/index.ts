import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Submission from 'src/services/submission'

export const useGetSubmissionsByRound = (roundId: number) => {
  return useQuery({
    queryKey: [CacheKeys.GET_SUBMISSIONS_BY_ROUND, roundId],
    queryFn: () => Submission.getAllByRound(roundId),
    enabled: !!roundId,
  })
}
