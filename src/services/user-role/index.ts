import axiosClient from 'src/config/axios-client'
import { FetchEndpointEnum } from 'src/services/endpoints'
import { UserRoleT } from 'src/types'

export default class UserRole {
  static async getAll(): Promise<UserRoleT[]> {
    const { data } = await axiosClient.get<UserRoleT[]>(FetchEndpointEnum.USER_ROLE)

    return data
  }
}
