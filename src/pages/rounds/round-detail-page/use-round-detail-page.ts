import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useRole } from 'src/hooks/use-role'
import { SubmissionT } from 'src/types'
import { RoundStatusEnum } from 'src/enums'
import { RoutesEnum } from 'src/routes/routes'
import { useGetRound } from 'src/hooks/services/use-get-round'
import { useUpsertSubmission } from 'src/hooks/services/use-upsert-submission'
import { submissionSchema, type SubmissionFormT } from './schema'

export const useRoundDetailPage = () => {
  const { roundId } = useParams<{ roundId: string }>()
  const navigate = useNavigate()
  const { isTeam } = useRole()
  const numId = Number(roundId)

  const { data: round, isLoading, isError } = useGetRound(numId)
  const upsertSubmission = useUpsertSubmission()
  const [submission, setSubmission] = useState<SubmissionT | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubmissionFormT>({ resolver: zodResolver(submissionSchema) })

  const backUrl = round?.tournament
    ? RoutesEnum.TOURNAMENT_DETAIL.replace(':tournamentId', String(round.tournament.id))
    : RoutesEnum.TOURNAMENTS

  const handleBack = () => navigate(backUrl)

  const isPastDeadline = round ? dayjs().isAfter(dayjs(round.submissionDeadline)) : false
  const canSubmit = isTeam() && round?.status === RoundStatusEnum.ACTIVE && !isPastDeadline
  const showSubmissionForm = isTeam()

  const onSubmit = async (values: SubmissionFormT) => {
    if (!round) return
    const result = await upsertSubmission.mutateAsync({
      roundId: round.id,
      githubUrl: values.githubUrl,
      videoDemoUrl: values.videoDemoUrl,
      liveDemoUrl: values.liveDemoUrl || undefined,
      description: values.description || undefined,
    })
    setSubmission(result)
  }

  return {
    round,
    isLoading,
    isError,
    submission,
    isPastDeadline,
    canSubmit,
    showSubmissionForm,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleBack,
    onSubmit,
  }
}
