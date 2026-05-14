import { useNavigate, useParams } from 'react-router-dom'
import { RoutesEnum } from 'src/routes/routes'
import { useGetSubmission } from 'src/hooks/services/use-get-submission'
import { useGetEvaluationsBySubmission } from 'src/hooks/services/use-get-evaluations-by-submission'

export const useAdminSubmissionDetailPage = () => {
  const { submissionId } = useParams<{ submissionId: string }>()
  const navigate = useNavigate()
  const numId = Number(submissionId)

  const { data: submission, isLoading: ls, isError: es } = useGetSubmission(numId)
  const { data: evaluations = [], isLoading: le } = useGetEvaluationsBySubmission(numId)

  const backUrl =
    submission?.round?.tournament
      ? RoutesEnum.ADMIN_ROUND_DETAIL
          .replace(':tournamentId', String(submission.round.tournament.id))
          .replace(':roundId', String(submission.round.id))
      : RoutesEnum.ADMIN_TOURNAMENTS

  const handleBack = () => navigate(backUrl)

  return {
    submission,
    evaluations,
    isLoading: ls || le,
    isError: es,
    backUrl,
    handleBack,
  }
}
