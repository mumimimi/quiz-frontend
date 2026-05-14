import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Tournament from 'src/services/tournament'
import { CreateTournamentPayloadT } from 'src/services/tournament/types'

export const useCreateTournament = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateTournamentPayloadT) => Tournament.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.GET_TOURNAMENTS] })
    },
  })
}
