import { toast } from 'react-toastify'
import axiosClient from 'src/config/axios-client'
import { FetchEndpointEnum } from 'src/services/endpoints'
import { UpsertSubmissionPayloadT } from 'src/services/submission/types'
import { SubmissionT } from 'src/types'

export default class Submission {
  static async upsert(payload: UpsertSubmissionPayloadT): Promise<SubmissionT> {
    const { data } = await axiosClient.post<SubmissionT>(
      FetchEndpointEnum.SUBMISSION,
      payload,
    )
    toast.success('Submission saved')
    return data
  }

  static async getAllByRound(roundId: number): Promise<SubmissionT[]> {
    const { data } = await axiosClient.get<SubmissionT[]>(
      FetchEndpointEnum.SUBMISSION_ALL,
      {
        params: { roundId },
      },
    )
    return data
  }

  static async getById(id: number): Promise<SubmissionT> {
    const { data } = await axiosClient.get<SubmissionT>(
      `${FetchEndpointEnum.SUBMISSION}`,
      { params: { id } },
    )
    return data
  }
}
