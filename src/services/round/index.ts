import { toast } from 'react-toastify'
import axiosClient from 'src/config/axios-client'
import { FetchEndpointEnum } from 'src/services/endpoints'
import {
  CreateRoundPayloadT,
  DeleteRoundPayloadT,
  UpdateRoundPayloadT,
  UpdateRoundStatusPayloadT,
} from 'src/services/round/types'
import { RoundT } from 'src/types'

export default class Round {
  static async getById(id: number): Promise<RoundT> {
    const { data } = await axiosClient.get<RoundT>(`${FetchEndpointEnum.ROUND}`, {
      params: { id },
    })
    return data
  }

  static async getAllByTournament(tournamentId: number): Promise<RoundT[]> {
    const { data } = await axiosClient.get<RoundT[]>(FetchEndpointEnum.ROUND_ALL, {
      params: { tournamentId },
    })
    return data
  }

  static async create(payload: CreateRoundPayloadT): Promise<RoundT> {
    const { data } = await axiosClient.post<RoundT>(FetchEndpointEnum.ROUND, payload)
    toast.success('Round created')
    return data
  }

  static async update(payload: UpdateRoundPayloadT): Promise<RoundT> {
    const { data } = await axiosClient.patch<RoundT>(
      FetchEndpointEnum.ROUND,
      payload,
    )
    toast.success('Round updated')
    return data
  }

  static async updateStatus(payload: UpdateRoundStatusPayloadT): Promise<RoundT> {
    const { data } = await axiosClient.patch<RoundT>(
      FetchEndpointEnum.ROUND_STATUS,
      payload,
    )
    toast.success('Round status updated')
    return data
  }

  static async finalize(roundId: number): Promise<RoundT> {
    const { data } = await axiosClient.post<RoundT>(
      FetchEndpointEnum.ROUND_FINALIZE,
      { roundId },
    )

    toast.success('Round finalized')
    return data
  }

  static async delete(payload: DeleteRoundPayloadT) {
    const { data } = await axiosClient.delete(
      `${FetchEndpointEnum.ROUND}/${payload.id}`,
    )

    toast.success('Round deleted')
    return data
  }
}
