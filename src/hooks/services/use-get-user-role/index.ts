import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import UserRole from 'src/services/user-role'

export const useGetUserRole = () => {
  return useQuery({
    queryKey: [CacheKeys.GET_USER_ROLE],
    queryFn: UserRole.getAll,
  })
}
