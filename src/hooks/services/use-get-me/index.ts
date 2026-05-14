import { useQuery } from '@tanstack/react-query'
import { CacheKeys } from 'src/enums'
import User from 'src/services/user'

export const useGetMe = () => {
  return useQuery({
    queryKey: [CacheKeys.GET_ME],
    queryFn: User.getMe,
  })
}
