import { toast } from 'react-toastify'
import axiosClient from 'src/config/axios-client'
import { FetchEndpointEnum } from 'src/services/endpoints'
import { CreateTeamPayloadT, UpdateTeamPayloadT } from 'src/services/team/types'
import { TeamT } from 'src/types'

export default class Team {
  static async getById(id: number): Promise<TeamT> {
    const { data } = await axiosClient.get<TeamT>(`${FetchEndpointEnum.TEAM}`, {
      params: { id },
    })
    return data
  }

  static async getAllByTournament(tournamentId: number): Promise<TeamT[]> {
    const { data } = await axiosClient.get<TeamT[]>(FetchEndpointEnum.TEAM_ALL, {
      params: { tournamentId },
    })
    return data
  }

  static async create(payload: CreateTeamPayloadT): Promise<TeamT> {
    const { data } = await axiosClient.post<TeamT>(FetchEndpointEnum.TEAM, payload)
    toast.success('Team created')
    return data
  }

  static async update(payload: UpdateTeamPayloadT): Promise<TeamT> {
    const { data } = await axiosClient.patch<TeamT>(FetchEndpointEnum.TEAM, payload)
    toast.success('Team updated')
    return data
  }
}
