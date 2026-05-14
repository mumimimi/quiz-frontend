import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Tournament from 'src/services/tournament'
import { DeleteTournamentPayloadT } from 'src/services/tournament/types'

export const useDeleteTournament = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: DeleteTournamentPayloadT) => Tournament.delete(payload),

    onSuccess: data => {
      queryClient.removeQueries({ queryKey: [CacheKeys.GET_TOURNAMENT, data.id] })
      queryClient.invalidateQueries({ queryKey: [CacheKeys.GET_TOURNAMENTS] })
    },
  })
}
