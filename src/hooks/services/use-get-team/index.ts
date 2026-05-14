import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import Team from 'src/services/team'

export const useGetTeam = (id: number) => {
  return useQuery({
    queryKey: [CacheKeys.GET_TEAM, id],
    queryFn: () => Team.getById(id),
    enabled: !!id,
  })
}
