import axiosClient from 'src/config/axios-client'
import { FetchEndpointEnum } from 'src/services/endpoints'
import { UserT } from 'src/types'
import { UpdateMePayloadT } from './types'

export default class User {
  static async getMe(): Promise<UserT> {
    const { data } = await axiosClient.get<UserT>(FetchEndpointEnum.USER_ME)

    return data
  }

  static async updateMe(payload: UpdateMePayloadT): Promise<UserT> {
    const { data } = await axiosClient.patch<UserT>(
      FetchEndpointEnum.USER_ME,
      payload,
    )

    return data
  }
}
