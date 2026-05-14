import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Round from 'src/services/round'
import { UpdateRoundPayloadT } from 'src/services/round/types'

export const useUpdateRound = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateRoundPayloadT) => Round.update(payload),
    onSuccess: (data) => {
      queryClient.setQueryData([CacheKeys.GET_ROUND, data.id], data)
    },
  })
}
