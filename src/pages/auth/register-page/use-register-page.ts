import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { RoutesEnum } from 'src/routes/routes'
import { useRegister } from 'src/hooks/services/use-register'
import { schema, type RegisterFormT } from './schema'

export const useRegisterPage = () => {
  const navigate = useNavigate()
  const register_ = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormT>({ resolver: zodResolver(schema) })

  const onSubmit = async ({ confirmPassword: _cp, ...values }: RegisterFormT) => {
    await register_.mutateAsync(values)
    navigate(RoutesEnum.TOURNAMENTS, { replace: true })
  }

  return { register, handleSubmit, errors, isSubmitting, onSubmit }
}
