export type LeaderboardEntryT = {
  rank: number
  team: {
    id: number
    name: string
    city?: string | null
    school?: string | null
  }
  totalScore: number
  backendQuality: number
  databaseStructure: number
  frontendQuality: number
  requirementsCompletion: number
  functionality: number
  usability: number
  evaluationCount: number
}

export type RawLeaderboardEntryT = {
  teamId: number
  teamName: string
  totalScore: number
  backendQuality: string
  databaseStructure: string
  frontendQuality: string
  requirementsCompletion: string
  functionality: string
  usability: string
}
