import { LogOut } from 'lucide-react'

import useLogout from '@/features/authentication/hooks/useLogout'

import ButtonIcon from '@/components/ButtonIcon'
import SpinnerMini from '@/components/SpinnerMini'

function Logout() {
  const { logout, isLogingOut } = useLogout()

  return (
    <ButtonIcon disabled={isLogingOut} onClick={() => logout()}>
      {isLogingOut ? <SpinnerMini /> : <LogOut />}
    </ButtonIcon>
  )
}

export default Logout
