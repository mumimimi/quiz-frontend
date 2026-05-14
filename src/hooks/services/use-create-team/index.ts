import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Team from 'src/services/team'
import { CreateTeamPayloadT } from 'src/services/team/types'

export const useCreateTeam = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateTeamPayloadT) => Team.create(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.GET_TEAMS_BY_TOURNAMENT, data.tournament?.id] })
    },
  })
}
