import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
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

const getStatusKey = (status: TournamentStatusEnum | RoundStatusEnum): string => {
  switch (status) {
    case TournamentStatusEnum.REGISTRATION:
      return 'status.registration'
    case TournamentStatusEnum.RUNNING:
      return 'status.running'
    case TournamentStatusEnum.FINISHED:
      return 'status.finished'
    case RoundStatusEnum.ACTIVE:
      return 'status.active'
    case RoundStatusEnum.SUBMISSION_CLOSED:
      return 'status.submission_closed'
    case RoundStatusEnum.EVALUATED:
      return 'status.evaluated'
    default:
      return 'status.draft'
  }
}

const StatusBadge = ({ status, className }: StatusBadgeProps): JSX.Element => {
  const { t } = useTranslation()

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        getStatusStyle(status),
        className,
      )}
    >
      {t(getStatusKey(status))}
    </span>
  )
}

export default StatusBadge
