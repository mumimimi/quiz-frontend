import axios from 'axios'
import axiosClient from 'src/config/axios-client'
import { FetchEndpointEnum } from 'src/services/endpoints'
import { LoginPayloadT, RegisterPayloadT } from 'src/services/auth/types'
import { UserT } from 'src/types'

export default class Auth {
  static async refreshToken(): Promise<UserT> {
    const { data } = await axios.get<UserT>(FetchEndpointEnum.AUTH_REFRESH_TOKEN, {
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true,
    })

    return data
  }

  static async login(payload: LoginPayloadT): Promise<UserT> {
    const { data } = await axiosClient.post<UserT>(FetchEndpointEnum.AUTH_LOGIN, payload)

    return data
  }

  static async register(payload: RegisterPayloadT): Promise<UserT> {
    const { data } = await axiosClient.post<UserT>(FetchEndpointEnum.AUTH_REGISTER, payload)

    return data
  }

  static async logout(): Promise<void> {
    await axiosClient.post(FetchEndpointEnum.AUTH_LOGOUT)
  }
}
