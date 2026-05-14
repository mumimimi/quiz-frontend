import { useMutation } from '@tanstack/react-query'
import Auth from 'src/services/auth'
import { LoginPayloadT } from 'src/services/auth/types'

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayloadT) => Auth.login(payload),
  })
}
