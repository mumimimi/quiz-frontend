import { ModalsEnum } from 'src/enums'
import TemplateModal from 'src/features/modals/template'
import DarkDatePickerModal from './dark-date-picker-modal'
import ConfirmDialogModal from './confirm-dialog-modal'

const modalsList = [
  { component: TemplateModal, name: ModalsEnum.TEMPLATE },
  { component: DarkDatePickerModal, name: ModalsEnum.DARK_DATE_PICKER_MODAL },
  { component: ConfirmDialogModal, name: ModalsEnum.CONFIRM_DIALOG },
] as const

export default modalsList
