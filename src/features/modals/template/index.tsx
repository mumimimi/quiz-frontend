import ModalsWrapper from 'src/features/modals/modal-wrapper'
import type { TemplateModalProps } from 'src/features/modals/template/types'

const TemplateModal = ({
  closeModal,
  description,
  title,
}: TemplateModalProps): React.JSX.Element => {
  return (
    <ModalsWrapper closeModal={closeModal} title={title} description={description}>
      TemplateModal
    </ModalsWrapper>
  )
}

export default TemplateModal
