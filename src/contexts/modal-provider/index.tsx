import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { ModalContext } from 'src/contexts'
import type { ModalContextT, ModalDataT } from 'src/contexts/modal-provider/types'
import Modals from 'src/features/modals'

const ModalProvider = ({ children }: PropsWithChildren): React.JSX.Element => {
  const [modals, setModalData] = useState<ModalDataT[]>([])

  const onClose = useCallback((): void => {
    setModalData(() => [])
  }, [])

  const onCloseByName = useCallback((name: string): void => {
    setModalData(prevState => prevState.filter(modal => modal.name !== name))
  }, [])

  const onCloseLastModal = useCallback((): void => {
    setModalData(prev => (prev.length ? prev.slice(0, -1) : prev))
  }, [])

  const onOpen = useCallback((modal: ModalDataT): void => {
    setModalData(prevState => [...prevState, modal])
  }, [])

  const providerValue: ModalContextT = useMemo(
    () => ({ modals: modals, onClose, onOpen, onCloseLastModal }),
    [modals, onClose, onOpen, onCloseLastModal],
  )

  return (
    <ModalContext.Provider value={providerValue}>
      {children}

      {modals.map((_, i) => (
        <Modals key={i} index={i} onCloseByName={onCloseByName} />
      ))}
    </ModalContext.Provider>
  )
}

export default ModalProvider
