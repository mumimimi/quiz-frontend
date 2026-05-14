import { TournamentStatusEnum } from 'src/enums'

export type CreateTournamentPayloadT = {
  name: string
  description?: string
  rules?: string
  registrationStartDate: string
  registrationEndDate: string
  startDate: string
  maxTeamCapacity?: number
}

export type UpdateTournamentPayloadT = Partial<CreateTournamentPayloadT> & {
  id: number
}

export type UpdateTournamentStatusPayloadT = {
  id: number
  status: TournamentStatusEnum
}

export type DeleteTournamentPayloadT = {
  id: number
}
