import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Round from 'src/services/round'

export const useFinalizeRound = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (roundId: number) => Round.finalize(roundId),
    onSuccess: (data) => {
      queryClient.setQueryData([CacheKeys.GET_ROUND, data.id], data)
    },
  })
}
