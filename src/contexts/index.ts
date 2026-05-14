import { createContext } from 'react'
import { ModalContextT } from 'src/contexts/modal-provider/types'
import { UserContextDataT } from 'src/contexts/user-provider/types'

export const ModalContext = createContext<ModalContextT | null>(null)
export const UserContext = createContext<UserContextDataT | null>(null)
