import { Dispatch, ReactNode } from 'react'
import { UserT } from 'src/types'

export type UserContextDataT = {
  user: UserT | null
  updateUser: (newState: Partial<UserT>) => void
  setUser: Dispatch<React.SetStateAction<UserT | null>>
}

export type UserProviderProps = {
  userData: UserT | null
  children: ReactNode
}
