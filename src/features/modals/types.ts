import { ComponentType, ReactNode } from 'react'
import { ModalsEnum } from 'src/enums'
import type modalsList from 'src/features/modals/modals-list'

type InferModalDataMap<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends readonly { name: ModalsEnum; component: ComponentType<any> }[],
> = {
  [K in T[number] as K['name']]: K['component'] extends ComponentType<infer P>
    ? 'data' extends keyof P
      ? P['data']
      : undefined
    : undefined
}

export type ModalPropsMap = InferModalDataMap<typeof modalsList>

export type ModalDialogProps = {
  name: ModalsEnum
  title?: string
  description?: ReactNode
  closeModal?: () => void
}

export type ModalsProps = {
  index: number
  onCloseByName: (name: ModalsEnum) => void
}
