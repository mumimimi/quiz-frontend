import { ModalDialogProps } from 'src/features/modals/types'
import { DateRangeT } from 'src/types'

export type DarkDatePickerModalProps = ModalDialogProps & {
  data: {
    range: DateRangeT
    setRange: (value: DateRangeT) => void
  }
}

export type UseDarkDatePickerModalT = DarkDatePickerModalProps['data']
