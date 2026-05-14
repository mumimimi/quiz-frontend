import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { NavbarButtonProps } from './types'
import { cn } from 'src/utils/cn'
import { RoutesEnum } from 'src/routes/routes'
import { IoHomeOutline, IoShieldOutline, IoPersonOutline } from 'react-icons/io5'

const navbarButtonIcons: Partial<Record<RoutesEnum, JSX.Element>> = {
  [RoutesEnum.TOURNAMENTS]: <IoHomeOutline size={20} />,
  [RoutesEnum.ADMIN]: <IoShieldOutline size={20} />,
  [RoutesEnum.JURY]: <IoPersonOutline size={20} />,
}

const navbarButtonKeys: Partial<Record<RoutesEnum, string>> = {
  [RoutesEnum.TOURNAMENTS]: 'nav.tournaments',
  [RoutesEnum.ADMIN]: 'nav.admin',
  [RoutesEnum.JURY]: 'nav.jury',
}

const NavbarButton = ({
  navbarButtonType,
  className,
  isSelected,
  ...props
}: NavbarButtonProps): JSX.Element => {
  const { t } = useTranslation()

  const icon = navbarButtonIcons[navbarButtonType]
  const textKey = navbarButtonKeys[navbarButtonType]
  const text = textKey ? t(textKey) : navbarButtonType

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
      {icon}
      <span className="text-sm">{text}</span>
    </button>
  )
}

export default NavbarButton
