import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Team from 'src/services/team'
import { UpdateTeamPayloadT } from 'src/services/team/types'

export const useUpdateTeam = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateTeamPayloadT) => Team.update(payload),
    onSuccess: (data) => {
      queryClient.setQueryData([CacheKeys.GET_TEAM, data.id], data)
    },
  })
}
