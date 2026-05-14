import { JSX, useState } from 'react'
import ConfirmDialog from 'src/components/confirm-dialog'
import type { ConfirmDialogModalProps } from './types'

const ConfirmDialogModal = ({
  title = '',
  closeModal,
  data: { message, confirmLabel, onConfirm },
}: ConfirmDialogModalProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
    } finally {
      setIsLoading(false)
      closeModal?.()
    }
  }

  return (
    <ConfirmDialog
      title={title}
      message={message}
      confirmLabel={confirmLabel}
      onConfirm={handleConfirm}
      onCancel={() => closeModal?.()}
      isLoading={isLoading}
    />
  )
}

export default ConfirmDialogModal
