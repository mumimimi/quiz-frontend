import { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import { IoLogOutOutline } from 'react-icons/io5'
import NavbarButton from 'src/layouts/navbar-layout/navbar-button'
import { useNavbarLayout } from 'src/layouts/navbar-layout/use-navbar-layout'
import { cn } from 'src/utils/cn'
import { IoSettingsOutline } from 'react-icons/io5'

const NavbarLayout = (): JSX.Element => {
  const { handleLogout, handleOpenProfile, selectedButton, displayRole, navLinks, navigate, user } =
    useNavbarLayout()

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col px-6 py-6 border-r border-[#1d1d1d]">
        <div className="flex flex-col h-full">
          {navLinks.map(route => (
            <NavbarButton
              key={route}
              isSelected={selectedButton === route}
              navbarButtonType={route}
              onClick={() => navigate(route)}
            />
          ))}

          <button
            className={cn(
              'mt-auto flex gap-2 px-4 py-3 rounded-3xl cursor-pointer w-36 bg-[#181818] hover:bg-[#232323]',
            )}
            onClick={handleLogout}
          >
            <IoLogOutOutline size={20} />
            <span className="text-sm">{'Logout'}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col h-screen w-full">
        <div className="py-2 px-6 w-full flex relative border-b border-[#1d1d1d]">
          <div className="py-2 pl-5 pr-3 gap-2 ml-auto bg-[#181818] rounded-3xl flex items-center">
            <div className="flex flex-col">
              <span className="text-white text-sm">
                {user?.firstName} {user?.lastName}
              </span>

              <span className="text-xs">{displayRole()}</span>
            </div>

            <div className="ml-1 cursor-pointer" onClick={handleOpenProfile}>
              <IoSettingsOutline size={26} />
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default NavbarLayout
