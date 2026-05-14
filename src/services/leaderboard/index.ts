import axiosClient from 'src/config/axios-client'
import { FetchEndpointEnum } from 'src/services/endpoints'
import { LeaderboardEntryT, RawLeaderboardEntryT } from 'src/services/leaderboard/types'

const mapEntry = (raw: RawLeaderboardEntryT, index: number): LeaderboardEntryT => ({
  rank: index + 1,
  team: { id: raw.teamId, name: raw.teamName },
  totalScore: Number(raw.totalScore),
  backendQuality: Number(raw.backendQuality),
  databaseStructure: Number(raw.databaseStructure),
  frontendQuality: Number(raw.frontendQuality),
  requirementsCompletion: Number(raw.requirementsCompletion),
  functionality: Number(raw.functionality),
  usability: Number(raw.usability),
  evaluationCount: 0,
})

export default class Leaderboard {
  static async getByTournament(tournamentId: number): Promise<LeaderboardEntryT[]> {
    const { data } = await axiosClient.get<RawLeaderboardEntryT[]>(
      `${FetchEndpointEnum.LEADERBOARD_TOURNAMENT}/${tournamentId}`,
    )
    return data.map(mapEntry)
  }

  static async getByRound(roundId: number): Promise<LeaderboardEntryT[]> {
    const { data } = await axiosClient.get<RawLeaderboardEntryT[]>(
      `${FetchEndpointEnum.LEADERBOARD_ROUND}/${roundId}`,
    )
    return data.map(mapEntry)
  }
}
