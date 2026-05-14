import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from 'src/contexts/user-provider/use-user'
import User from 'src/services/user'
import { schema, type ProfileFormT } from './schema'
import { useGetUserRole } from 'src/hooks/services/use-get-user-role'

export const useProfilePage = () => {
  const { user, updateUser } = useUser()
  const { data: roles = [] } = useGetUserRole()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormT>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      roleId: user?.roles[0]?.id,
    },
  })

  const selectedRoleId = watch('roleId')

  const onSubmit = async (values: ProfileFormT) => {
    if (!isDirty) return

    const roleChanged = values.roleId !== user?.roles[0]?.id
    const updated = await User.updateMe(values)

    updateUser({ firstName: updated.firstName, lastName: updated.lastName })
    reset({ firstName: updated.firstName, lastName: updated.lastName, roleId: values.roleId })
    if (roleChanged) window.location.reload()
  }

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    isDirty,
    onSubmit,
    user,
    roles,
    selectedRoleId,
  }
}
