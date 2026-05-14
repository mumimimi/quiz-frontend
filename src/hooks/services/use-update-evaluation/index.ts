import { useMutation } from '@tanstack/react-query'
import Jury from 'src/services/jury'
import { UpdateEvaluationPayloadT } from 'src/services/jury/types'

export const useUpdateEvaluation = () => {
  return useMutation({
    mutationFn: (payload: UpdateEvaluationPayloadT) => Jury.updateEvaluation(payload),
  })
}
