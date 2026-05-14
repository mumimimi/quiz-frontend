import { JSX } from 'react'
import { RoundStatusEnum, TournamentStatusEnum } from 'src/enums'
import { cn } from 'src/utils/cn'
import type { StatusBadgeProps } from './types'

const getStatusStyle = (status: TournamentStatusEnum | RoundStatusEnum): string => {
  switch (status) {
    case TournamentStatusEnum.REGISTRATION:
      return 'bg-blue-900/40 text-blue-300'
    case TournamentStatusEnum.RUNNING:
      return 'bg-yellow-900/40 text-yellow-300'
    case TournamentStatusEnum.FINISHED:
    case RoundStatusEnum.EVALUATED:
      return 'bg-purple-900/40 text-purple-300'
    case RoundStatusEnum.ACTIVE:
      return 'bg-green-900/40 text-green-300'
    case RoundStatusEnum.SUBMISSION_CLOSED:
      return 'bg-orange-900/40 text-orange-300'
    default:
      return 'bg-[#2a2a2a] text-[#888]'
  }
}

const getStatusLabel = (status: TournamentStatusEnum | RoundStatusEnum): string => {
  switch (status) {
    case TournamentStatusEnum.REGISTRATION:
      return 'Registration'
    case TournamentStatusEnum.RUNNING:
      return 'Running'
    case TournamentStatusEnum.FINISHED:
      return 'Finished'
    case RoundStatusEnum.ACTIVE:
      return 'Active'
    case RoundStatusEnum.SUBMISSION_CLOSED:
      return 'Submissions Closed'
    case RoundStatusEnum.EVALUATED:
      return 'Evaluated'
    default:
      return 'Draft'
  }
}

const StatusBadge = ({ status, className }: StatusBadgeProps): JSX.Element => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        getStatusStyle(status),
        className,
      )}
    >
      {getStatusLabel(status)}
    </span>
  )
}

export default StatusBadge
