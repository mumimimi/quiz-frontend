import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ModalsEnum, RoundStatusEnum } from 'src/enums'
import { RoutesEnum } from 'src/routes/routes'
import { useGetRound } from 'src/hooks/services/use-get-round'
import { useGetSubmissionsByRound } from 'src/hooks/services/use-get-submissions-by-round'
import { useUpdateRoundStatus } from 'src/hooks/services/use-update-round-status'
import { useAssignJury } from 'src/hooks/services/use-assign-jury'
import { useFinalizeRound } from 'src/hooks/services/use-finalize-round'
import { useDeleteRound } from 'src/hooks/services/use-delete-round'
import { useModals } from 'src/contexts/modal-provider/use-modals'

const nextStatusMap: Partial<Record<RoundStatusEnum, RoundStatusEnum>> = {
  [RoundStatusEnum.DRAFT]: RoundStatusEnum.ACTIVE,
  [RoundStatusEnum.ACTIVE]: RoundStatusEnum.SUBMISSION_CLOSED,
}

const statusButtonLabel: Partial<Record<RoundStatusEnum, string>> = {
  [RoundStatusEnum.DRAFT]: 'Activate Round',
  [RoundStatusEnum.ACTIVE]: 'Close Submissions',
}

export const useAdminRoundDetailPage = () => {
  const { roundId, tournamentId: tournamentIdParam = '' } = useParams<{
    roundId: string
    tournamentId: string
  }>()
  const navigate = useNavigate()
  const numId = Number(roundId)
  const { onOpen } = useModals()

  const { data: round, isLoading: lr, isError: er } = useGetRound(numId)
  const { data: submissions = [], isLoading: ls } = useGetSubmissionsByRound(numId)

  const updateStatusMutation = useUpdateRoundStatus()
  const assignJuryMutation = useAssignJury()
  const finalizeRoundMutation = useFinalizeRound()
  const deleteMutation = useDeleteRound()

  const [actionResult, setActionResult] = useState<string | null>(null)

  const backUrl = RoutesEnum.ADMIN_TOURNAMENT_DETAIL.replace(':tournamentId', tournamentIdParam)
  const editUrl = RoutesEnum.ADMIN_ROUND_EDIT
    .replace(':tournamentId', tournamentIdParam)
    .replace(':roundId', String(roundId))
  const createNextRoundUrl = RoutesEnum.ADMIN_ROUNDS_CREATE.replace(':tournamentId', tournamentIdParam)

  const handleBack = () => navigate(backUrl)
  const handleEdit = () => navigate(editUrl)
  const handleCreateNextRound = () => navigate(createNextRoundUrl)
  const handleNavigateToSubmission = (submissionId: number) =>
    navigate(RoutesEnum.ADMIN_SUBMISSION_DETAIL.replace(':submissionId', String(submissionId)))

  const nextStatus = round ? nextStatusMap[round.status] : undefined
  const statusLabel = round ? statusButtonLabel[round.status] : undefined
  const isSubmissionClosed = round?.status === RoundStatusEnum.SUBMISSION_CLOSED
  const isEvaluated = round?.status === RoundStatusEnum.EVALUATED

  const handleChangeStatus = () => {
    if (!nextStatus || !statusLabel || !round) return
    onOpen({
      name: ModalsEnum.CONFIRM_DIALOG,
      title: 'Change round status',
      data: {
        message: `This will move the round to "${nextStatus}". Continue?`,
        confirmLabel: statusLabel,
        onConfirm: async () => {
          await updateStatusMutation.mutateAsync({ id: round.id, status: nextStatus })
        },
      },
    })
  }

  const handleAssignJury = () => {
    if (!round) return
    onOpen({
      name: ModalsEnum.CONFIRM_DIALOG,
      title: 'Assign Jury',
      data: {
        message: 'This will randomly assign jury members to all submissions in this round.',
        confirmLabel: 'Assign Jury',
        onConfirm: async () => {
          const result = await assignJuryMutation.mutateAsync(round.id)
          setActionResult(`Jury assigned: ${result.created} new assignment(s) created.`)
        },
      },
    })
  }

  const handleFinalizeRound = () => {
    if (!round) return
    onOpen({
      name: ModalsEnum.CONFIRM_DIALOG,
      title: 'Finalize Round',
      data: {
        message: 'This will finalize the round and mark it as EVALUATED. This cannot be undone.',
        confirmLabel: 'Finalize',
        onConfirm: async () => {
          await finalizeRoundMutation.mutateAsync(round.id)
        },
      },
    })
  }

  const handleDelete = () => {
    if (!round) return
    onOpen({
      name: ModalsEnum.CONFIRM_DIALOG,
      title: 'Delete round',
      data: {
        message: `Are you sure you want to delete "${round.name}"? This action cannot be undone.`,
        confirmLabel: 'Delete',
        onConfirm: async () => {
          await deleteMutation.mutateAsync({ id: round.id })
          navigate(backUrl)
        },
      },
    })
  }

  return {
    round,
    submissions,
    isLoading: lr || ls,
    isError: er,
    actionResult,
    nextStatus,
    statusLabel,
    isSubmissionClosed,
    isEvaluated,
    handleBack,
    handleEdit,
    handleCreateNextRound,
    handleNavigateToSubmission,
    handleChangeStatus,
    handleAssignJury,
    handleFinalizeRound,
    handleDelete,
  }
}
