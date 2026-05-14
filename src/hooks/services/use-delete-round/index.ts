import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Round from 'src/services/round'
import { DeleteRoundPayloadT } from 'src/services/round/types'

export const useDeleteRound = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: DeleteRoundPayloadT) => Round.delete(payload),
    onSuccess: (_data, payload) => {
      queryClient.removeQueries({ queryKey: [CacheKeys.GET_ROUND, payload.id] })
      queryClient.invalidateQueries({ queryKey: [CacheKeys.GET_ROUNDS_BY_TOURNAMENT] })
    },
  })
}
