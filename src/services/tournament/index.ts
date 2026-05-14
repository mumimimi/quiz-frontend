import { toast } from 'react-toastify'
import axiosClient from 'src/config/axios-client'
import { FetchEndpointEnum } from 'src/services/endpoints'
import {
  CreateTournamentPayloadT,
  DeleteTournamentPayloadT,
  UpdateTournamentPayloadT,
  UpdateTournamentStatusPayloadT,
} from 'src/services/tournament/types'
import { TournamentT } from 'src/types'

export default class Tournament {
  static async getById(id: number): Promise<TournamentT> {
    const { data } = await axiosClient.get<TournamentT>(
      FetchEndpointEnum.TOURNAMENT,
      { params: { id } },
    )
    return data
  }

  static async getAll(): Promise<TournamentT[]> {
    const { data } = await axiosClient.get<TournamentT[]>(
      FetchEndpointEnum.TOURNAMENT_ALL,
    )
    return data
  }

  static async create(payload: CreateTournamentPayloadT): Promise<TournamentT> {
    const { data } = await axiosClient.post<TournamentT>(
      FetchEndpointEnum.TOURNAMENT,
      payload,
    )
    toast.success('Tournament created')
    return data
  }

  static async update(payload: UpdateTournamentPayloadT): Promise<TournamentT> {
    const { data } = await axiosClient.patch<TournamentT>(
      FetchEndpointEnum.TOURNAMENT,
      payload,
    )
    toast.success('Tournament updated')
    return data
  }

  static async updateStatus(
    payload: UpdateTournamentStatusPayloadT,
  ): Promise<TournamentT> {
    const { data } = await axiosClient.patch<TournamentT>(
      `${FetchEndpointEnum.TOURNAMENT}/status`,
      payload,
    )
    toast.success('Tournament status updated')
    return data
  }

  static async delete(payload: DeleteTournamentPayloadT): Promise<TournamentT> {
    const { data } = await axiosClient.delete(
      `${FetchEndpointEnum.TOURNAMENT}/${payload.id}`,
    )
    toast.success('Tournament deleted')
    return data
  }
}
