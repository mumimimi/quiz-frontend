import { useMutation } from '@tanstack/react-query'
import Jury from 'src/services/jury'

export const useAssignJury = () => {
  return useMutation({
    mutationFn: (roundId: number) => Jury.assign(roundId),
  })
}
