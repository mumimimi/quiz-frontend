import { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import UserProvider from 'src/contexts/user-provider'
import { useUserLayout } from 'src/layouts/user-layout/use-user-layout'
import LoadingPage from 'src/pages/loading'

const UserLayout = (): JSX.Element => {
  const { data, isLoading } = useUserLayout()

  if (isLoading) return <LoadingPage />

  return (
    <UserProvider userData={data}>
      <Outlet />
    </UserProvider>
  )
}

export default UserLayout
