import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from 'src/services/auth'
import { UserT } from 'src/types'

export const useUserLayout = () => {
  const [user, setUser] = useState<UserT | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    Auth.refreshToken()
      .then(data => {
        setUser(data)
      })
      .catch(() => {
        navigate('/auth/login', { replace: true })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [navigate])

  return { data: user, isLoading }
}
