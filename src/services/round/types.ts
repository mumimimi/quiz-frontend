import { RoundStatusEnum } from 'src/enums'

export type CreateRoundPayloadT = {
  tournamentId: number
  name: string
  description?: string
  technologyRequirements?: string
  mustHaveCriteria: string[]
  referenceLinks?: string[]
  startTime: string
  submissionDeadline: string
}

export type UpdateRoundPayloadT = Partial<
  Omit<CreateRoundPayloadT, 'tournamentId'>
> & {
  id: number
}

export type UpdateRoundStatusPayloadT = {
  id: number
  status: RoundStatusEnum
}

export type DeleteRoundPayloadT = {
  id: number
}
