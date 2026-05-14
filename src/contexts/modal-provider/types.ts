import type { ModalPropsMap } from 'src/features/modals/types'

export type ModalContextT = {
  modals: ModalDataT[]
  onClose: () => void
  onOpen: (modal: ModalDataT) => void
  onCloseLastModal: () => void
}

export type ModalDataT = {
  [K in keyof ModalPropsMap]: undefined extends ModalPropsMap[K]
    ? {
        name: K
        data?: ModalPropsMap[K]
        title?: string
        description?: React.ReactNode
      }
    : {
        name: K
        data: ModalPropsMap[K]
        title?: string
        description?: React.ReactNode
      }
}[keyof ModalPropsMap]
