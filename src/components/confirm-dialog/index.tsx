import { JSX } from 'react'
import type { ConfirmDialogProps } from './types'

const ConfirmDialog = ({
  title,
  message,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmDialogProps): JSX.Element => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-6 max-w-sm w-full mx-4 flex flex-col gap-4">
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          <p className="text-[#999] text-sm mt-1">{message}</p>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="text-xs text-[#666] border border-[#2a2a2a] px-4 py-2 rounded-lg hover:text-white hover:border-[#444] transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="text-xs bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Loading…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
