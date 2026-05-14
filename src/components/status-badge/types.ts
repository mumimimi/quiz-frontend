import { RoundStatusEnum, TournamentStatusEnum } from 'src/enums'

export type StatusBadgeProps = {
  status: TournamentStatusEnum | RoundStatusEnum
  className?: string
}
