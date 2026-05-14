import { HTMLProps } from 'react'
import { RoutesEnum } from 'src/routes/routes'

export type NavbarButtonProps = {
  navbarButtonType: RoutesEnum
  isSelected: boolean
} & HTMLProps<HTMLButtonElement>
