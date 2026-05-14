import { useNavigate, useParams } from 'react-router-dom'
import { RoutesEnum } from 'src/routes/routes'
import { useGetMyAssignments } from 'src/hooks/services/use-get-my-assignments'

export const useJuryRoundPage = () => {
  const { roundId } = useParams<{ roundId: string }>()
  const navigate = useNavigate()
  const numId = Number(roundId)

  const { data: assignments = [], isLoading, isError } = useGetMyAssignments(numId)

  const round = assignments[0]?.round
  const evaluatedCount = assignments.filter(a => a.evaluation != null).length

  const handleBack = () => navigate(RoutesEnum.JURY)

  const handleEvaluate = (
    assignmentId: number,
    assignment: (typeof assignments)[number],
  ) =>
    navigate(
      RoutesEnum.JURY_EVALUATE.replace(':assignmentId', String(assignmentId)),
      { state: { assignment } },
    )

  return {
    assignments,
    isLoading,
    isError,
    round,
    evaluatedCount,
    handleBack,
    handleEvaluate,
  }
}
