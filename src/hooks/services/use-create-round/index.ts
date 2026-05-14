import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Round from 'src/services/round'
import { CreateRoundPayloadT } from 'src/services/round/types'

export const useCreateRound = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateRoundPayloadT) => Round.create(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.GET_ROUNDS_BY_TOURNAMENT, data.tournament?.id] })
    },
  })
}
