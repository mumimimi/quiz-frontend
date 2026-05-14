import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Submission from 'src/services/submission'

export const useGetSubmission = (id: number) => {
  return useQuery({
    queryKey: [CacheKeys.GET_SUBMISSION, id],
    queryFn: () => Submission.getById(id),
    enabled: !!id,
  })
}
