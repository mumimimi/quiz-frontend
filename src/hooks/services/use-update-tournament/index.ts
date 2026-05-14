import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Tournament from 'src/services/tournament'
import { UpdateTournamentPayloadT } from 'src/services/tournament/types'

export const useUpdateTournament = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateTournamentPayloadT) => Tournament.update(payload),
    onSuccess: (data) => {
      queryClient.setQueryData([CacheKeys.GET_TOURNAMENT, data.id], data)
      queryClient.invalidateQueries({ queryKey: [CacheKeys.GET_TOURNAMENTS] })
    },
  })
}
