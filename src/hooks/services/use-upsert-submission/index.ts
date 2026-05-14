import { useMutation } from '@tanstack/react-query'
import Submission from 'src/services/submission'
import { UpsertSubmissionPayloadT } from 'src/services/submission/types'

export const useUpsertSubmission = () => {
  return useMutation({
    mutationFn: (payload: UpsertSubmissionPayloadT) => Submission.upsert(payload),
  })
}
