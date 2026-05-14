import { useMutation } from '@tanstack/react-query'
import Auth from 'src/services/auth'
import { RegisterPayloadT } from 'src/services/auth/types'

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayloadT) => Auth.register(payload),
  })
}
