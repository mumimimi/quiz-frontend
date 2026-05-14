import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { RoutesEnum } from 'src/routes/routes'
import { useGetTournament } from 'src/hooks/services/use-get-tournament'
import { useCreateTournament } from 'src/hooks/services/use-create-tournament'
import { useUpdateTournament } from 'src/hooks/services/use-update-tournament'
import { schema, type FormT } from './schema'

export const useTournamentFormPage = () => {
  const { tournamentId } = useParams<{ tournamentId?: string }>()
  const navigate = useNavigate()
  const isEdit = !!tournamentId

  const { data: existingTournament, isLoading: isLoadingData } = useGetTournament(
    isEdit ? Number(tournamentId) : 0,
  )

  const createTournament = useCreateTournament()
  const updateTournament = useUpdateTournament()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormT>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (!existingTournament || !isEdit) return
    const t = existingTournament
    reset({
      name: t.name,
      description: t.description ?? '',
      rules: t.rules ?? '',
      registrationStartDate: dayjs(t.registrationStartDate).format('YYYY-MM-DD'),
      registrationEndDate: dayjs(t.registrationEndDate).format('YYYY-MM-DD'),
      startDate: dayjs(t.startDate).format('YYYY-MM-DD'),
      maxTeamCapacity: t.maxTeamCapacity != null ? String(t.maxTeamCapacity) : '',
    })
  }, [existingTournament, isEdit, reset])

  const backUrl = isEdit
    ? RoutesEnum.ADMIN_TOURNAMENT_DETAIL.replace(':tournamentId', tournamentId!)
    : RoutesEnum.ADMIN_TOURNAMENTS

  const handleBack = () => navigate(backUrl)

  const onSubmit = async (values: FormT) => {
    const payload = {
      name: values.name,
      description: values.description || undefined,
      rules: values.rules || undefined,
      registrationStartDate: values.registrationStartDate,
      registrationEndDate: values.registrationEndDate,
      startDate: values.startDate,
      maxTeamCapacity: values.maxTeamCapacity ? Number(values.maxTeamCapacity) : undefined,
    }

    if (isEdit) {
      await updateTournament.mutateAsync({ id: Number(tournamentId), ...payload })
      navigate(backUrl)
    } else {
      const created = await createTournament.mutateAsync(payload)
      navigate(RoutesEnum.ADMIN_TOURNAMENT_DETAIL.replace(':tournamentId', String(created.id)))
    }
  }

  return { isEdit, isLoadingData, register, handleSubmit, errors, isSubmitting, handleBack, onSubmit }
}
