import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { RoutesEnum } from 'src/routes/routes'
import { useGetRound } from 'src/hooks/services/use-get-round'
import { useCreateRound } from 'src/hooks/services/use-create-round'
import { useUpdateRound } from 'src/hooks/services/use-update-round'
import { schema, type FormT } from './schema'

export const useRoundFormPage = () => {
  const { roundId, tournamentId: tournamentIdParam = '' } = useParams<{
    roundId?: string
    tournamentId?: string
  }>()
  const navigate = useNavigate()
  const isEdit = !!roundId

  const { data: existingRound, isLoading: isLoadingData } = useGetRound(
    isEdit ? Number(roundId) : 0,
  )
  const createRound = useCreateRound()
  const updateRound = useUpdateRound()

  const [tournamentId, setTournamentId] = useState<number | null>(
    tournamentIdParam ? Number(tournamentIdParam) : null,
  )
  const [mustHaveCriteria, setMustHaveCriteria] = useState<string[]>([])
  const [referenceLinks, setReferenceLinks] = useState<string[]>([])
  const [criteriaError, setCriteriaError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormT>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (!existingRound || !isEdit) return
    const r = existingRound
    if (r.tournament) setTournamentId(r.tournament.id)
    reset({
      name: r.name,
      description: r.description ?? '',
      technologyRequirements: r.technologyRequirements ?? '',
      startTime: dayjs(r.startTime).format('YYYY-MM-DDTHH:mm'),
      submissionDeadline: dayjs(r.submissionDeadline).format('YYYY-MM-DDTHH:mm'),
    })
    setMustHaveCriteria(r.mustHaveCriteria)
    setReferenceLinks(r.referenceLinks ?? [])
  }, [existingRound, isEdit, reset])

  const backUrl = isEdit
    ? RoutesEnum.ADMIN_ROUND_DETAIL
        .replace(':tournamentId', tournamentIdParam)
        .replace(':roundId', String(roundId))
    : tournamentId
      ? RoutesEnum.ADMIN_TOURNAMENT_DETAIL.replace(':tournamentId', String(tournamentId))
      : RoutesEnum.ADMIN_TOURNAMENTS

  const handleBack = () => navigate(backUrl)

  const onSubmit = async (values: FormT) => {
    if (mustHaveCriteria.length === 0) {
      setCriteriaError('At least one criterion is required')
      return
    }
    setCriteriaError(null)

    if (isEdit) {
      await updateRound.mutateAsync({
        id: Number(roundId),
        name: values.name,
        description: values.description || undefined,
        technologyRequirements: values.technologyRequirements || undefined,
        mustHaveCriteria,
        referenceLinks: referenceLinks.length > 0 ? referenceLinks : undefined,
        startTime: values.startTime,
        submissionDeadline: values.submissionDeadline,
      })
      navigate(backUrl)
    } else {
      if (!tournamentId) return
      const created = await createRound.mutateAsync({
        tournamentId,
        name: values.name,
        description: values.description || undefined,
        technologyRequirements: values.technologyRequirements || undefined,
        mustHaveCriteria,
        referenceLinks: referenceLinks.length > 0 ? referenceLinks : undefined,
        startTime: values.startTime,
        submissionDeadline: values.submissionDeadline,
      })
      navigate(
        RoutesEnum.ADMIN_ROUND_DETAIL
          .replace(':tournamentId', String(tournamentId))
          .replace(':roundId', String(created.id)),
      )
    }
  }

  return {
    isEdit,
    isLoadingData,
    mustHaveCriteria,
    setMustHaveCriteria,
    referenceLinks,
    setReferenceLinks,
    criteriaError,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleBack,
    onSubmit,
  }
}
