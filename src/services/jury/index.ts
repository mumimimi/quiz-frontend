import { toast } from 'react-toastify'
import axiosClient from 'src/config/axios-client'
import { FetchEndpointEnum } from 'src/services/endpoints'
import { CreateEvaluationPayloadT, UpdateEvaluationPayloadT } from 'src/services/jury/types'
import { EvaluationT, JuryAssignmentT } from 'src/types'

export default class Jury {
  static async assign(roundId: number): Promise<{ created: number }> {
    const { data } = await axiosClient.post<{ created: number }>(FetchEndpointEnum.JURY_ASSIGN, {
      roundId,
    })
    toast.success('Jury assigned')
    return data
  }

  static async getMyAssignments(roundId?: number): Promise<JuryAssignmentT[]> {
    const { data } = await axiosClient.get<JuryAssignmentT[]>(FetchEndpointEnum.JURY_MY_ASSIGNMENTS, {
      params: roundId ? { roundId } : undefined,
    })
    return data
  }

  static async getEvaluationsBySubmission(submissionId: number): Promise<EvaluationT[]> {
    const { data } = await axiosClient.get<EvaluationT[]>(FetchEndpointEnum.EVALUATION, {
      params: { submissionId },
    })
    return data
  }

  static async createEvaluation(payload: CreateEvaluationPayloadT): Promise<EvaluationT> {
    const { data } = await axiosClient.post<EvaluationT>(FetchEndpointEnum.EVALUATION, payload)
    toast.success('Evaluation submitted')
    return data
  }

  static async updateEvaluation(payload: UpdateEvaluationPayloadT): Promise<EvaluationT> {
    const { data } = await axiosClient.patch<EvaluationT>(FetchEndpointEnum.EVALUATION, payload)
    toast.success('Evaluation updated')
    return data
  }
}
