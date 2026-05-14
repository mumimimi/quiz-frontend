import { useCallback, useMemo, useState } from 'react'
import { UserContext } from 'src/contexts'
import type {
  UserContextDataT,
  UserProviderProps,
} from 'src/contexts/user-provider/types'
import { UserT } from 'src/types'

const UserProvider = ({
  children,
  userData,
}: UserProviderProps): React.JSX.Element => {
  const [user, setUser] = useState<UserT | null>(userData)

  const updateUser = useCallback((patch: Partial<UserT>) => {
    setUser(prev => (prev ? { ...prev, ...patch } : prev))
  }, [])

  const providerValue: UserContextDataT = useMemo(() => {
    return { user, updateUser, setUser }
  }, [user, updateUser, setUser])

  return (
    <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>
  )
}

export default UserProvider
