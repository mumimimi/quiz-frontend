import { useMutation } from '@tanstack/react-query'
import Jury from 'src/services/jury'
import { CreateEvaluationPayloadT } from 'src/services/jury/types'

export const useCreateEvaluation = () => {
  return useMutation({
    mutationFn: (payload: CreateEvaluationPayloadT) => Jury.createEvaluation(payload),
  })
}
