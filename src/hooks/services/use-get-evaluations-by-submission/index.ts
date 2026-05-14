import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Jury from 'src/services/jury'

export const useGetEvaluationsBySubmission = (submissionId: number) => {
  return useQuery({
    queryKey: [CacheKeys.GET_EVALUATIONS_BY_SUBMISSION, submissionId],
    queryFn: () => Jury.getEvaluationsBySubmission(submissionId),
    enabled: !!submissionId,
  })
}
