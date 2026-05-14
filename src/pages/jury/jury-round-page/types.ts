import { JuryAssignmentT } from 'src/types'

export type AssignmentCardProps = {
  assignment: JuryAssignmentT
  onEvaluate: () => void
}
