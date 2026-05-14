import { ComponentType, ReactPortal } from 'react'
import { createPortal } from 'react-dom'
import { useModals } from 'src/contexts/modal-provider/use-modals'
import modalsList from 'src/features/modals/modals-list'
import type { ModalsProps } from 'src/features/modals/types'

const Modals = ({ index, onCloseByName }: ModalsProps): ReactPortal | null => {
  const { modals } = useModals()
  const modal = modals[index]

  const entry = modalsList.find(({ name }) => name === modal.name)

  if (!entry) return null

  const Component = entry.component

  type ComponentProps = typeof entry extends { component: ComponentType<infer P> }
    ? P
    : never

  return createPortal(
    <Component
      title={modal.title}
      description={modal.description}
      name={modal.name}
      closeModal={() => onCloseByName(modal.name)}
      data={modal.data as ComponentProps['data']}
    />,
    document.querySelector('#modal-root') as HTMLElement,
  )
}

export default Modals
