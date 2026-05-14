import { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import ModalProvider from 'src/contexts/modal-provider'

const ModalLayout = (): JSX.Element => {
  return (
    <ModalProvider>
      <Outlet />
    </ModalProvider>
  )
}

export default ModalLayout
