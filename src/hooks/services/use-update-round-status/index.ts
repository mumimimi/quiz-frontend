import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Round from 'src/services/round'
import { UpdateRoundStatusPayloadT } from 'src/services/round/types'

export const useUpdateRoundStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateRoundStatusPayloadT) => Round.updateStatus(payload),
    onSuccess: (data) => {
      queryClient.setQueryData([CacheKeys.GET_ROUND, data.id], data)
    },
  })
}
