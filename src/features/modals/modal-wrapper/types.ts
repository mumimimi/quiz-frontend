import { type HTMLProps } from 'react'
import type { ModalDialogProps } from 'src/features/modals/types'

export type ModalsWrapperProps = HTMLProps<HTMLDivElement> &
  Pick<ModalDialogProps, 'closeModal' | 'title' | 'description'> & {
    classNameModal?: HTMLProps<HTMLDivElement>['className']
  }
