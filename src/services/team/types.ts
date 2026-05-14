export type CreateTeamMemberPayloadT = {
  firstName: string
  lastName: string
  email: string
}

export type CreateTeamPayloadT = {
  tournamentId: number
  name: string
  city?: string
  school?: string
  telegramHandle?: string
  discordHandle?: string
  members: CreateTeamMemberPayloadT[]
}

export type UpdateTeamPayloadT = {
  id: number
  name?: string
  city?: string
  school?: string
  telegramHandle?: string
  discordHandle?: string
}
