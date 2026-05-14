import { ModalDialogProps } from 'src/features/modals/types'

export type ConfirmDialogModalData = {
  message: string
  confirmLabel?: string
  onConfirm: () => Promise<void> | void
}

export type ConfirmDialogModalProps = ModalDialogProps & { data: ConfirmDialogModalData }
