import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import Auth from 'src/services/auth'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

let isRefreshing = false
let waitQueue: Array<() => void> = []

axiosClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const earlyData = (error.response.data as any) || {}
      const earlyMessage: string = earlyData?.message || 'Something went wrong'

      // Auth endpoints return intentional 401s (wrong password etc.) — show the error, don't refresh
      if (originalRequest.url?.includes('/auth/')) {
        toast.error(earlyMessage)
        return Promise.reject({ ...earlyData, message: earlyMessage })
      }

      if (isRefreshing) {
        return new Promise<void>(resolve => {
          waitQueue.push(resolve)
        }).then(() => axiosClient(originalRequest))
      }

      isRefreshing = true

      try {
        await Auth.refreshToken()
        waitQueue.forEach(resolve => resolve())
        waitQueue = []
        return axiosClient(originalRequest)
      } catch (refreshError) {
        waitQueue = []
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    if (!error.response) {
      toast.error('Network error — check your connection')
      return Promise.reject(error)
    }

    const status = error.response.status
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (error.response.data as any) || {}
    const message: string = data?.message || 'Something went wrong'

    if (status !== 401) {
      toast.error(message)
    }

    return Promise.reject({ ...data, message })
  },
)

export default axiosClient
