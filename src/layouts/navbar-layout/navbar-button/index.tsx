import { JSX } from 'react'
import { NavbarButtonProps } from './types'
import { cn } from 'src/utils/cn'
import { RoutesEnum } from 'src/routes/routes'
import { IoHomeOutline, IoShieldOutline, IoPersonOutline } from 'react-icons/io5'

const navbarButtonConfig: Partial<
  Record<RoutesEnum, { text: string; leftIcon?: JSX.Element }>
> = {
  [RoutesEnum.TOURNAMENTS]: {
    text: 'Tournaments',
    leftIcon: <IoHomeOutline size={20} />,
  },
  [RoutesEnum.ADMIN]: {
    text: 'Admin',
    leftIcon: <IoShieldOutline size={20} />,
  },
  [RoutesEnum.JURY]: {
    text: 'Jury',
    leftIcon: <IoPersonOutline size={20} />,
  },
}

const NavbarButton = ({
  navbarButtonType,
  className,
  isSelected,
  ...props
}: NavbarButtonProps): JSX.Element => {
  const params = navbarButtonConfig[navbarButtonType] ?? { text: navbarButtonType }

  return (
    <button
      className={cn(
        'flex gap-2 px-4 py-3 rounded-3xl cursor-pointer w-36 mb-2',
        className,
        isSelected
          ? 'text-white [&_path]:stroke-white bg-[#181818]'
          : 'hover:bg-[#232323]',
      )}
      {...props}
      type="button"
    >
      {params.leftIcon}
      <span className="text-sm">{params.text}</span>
    </button>
  )
}

export default NavbarButton
