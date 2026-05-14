import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { RoutesEnum } from 'src/routes/routes'
import { useLogin } from 'src/hooks/services/use-login'
import { schema, type LoginFormT } from './schema'

export const useLoginPage = () => {
  const navigate = useNavigate()
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormT>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: LoginFormT) => {
    await login.mutateAsync(values)
    navigate(RoutesEnum.TOURNAMENTS, { replace: true })
  }

  return { register, handleSubmit, errors, isSubmitting, onSubmit }
}
