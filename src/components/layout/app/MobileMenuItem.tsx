import { ReactNode } from 'react'
import { AppMenuItem } from './AppMenuItem'
import { Actions, useAppShell } from './AppShellProvider'

export function MobileMenuItem({
  onClick,
  href,
  children
}: {
  href: string
  onClick?: (...args: any[]) => void
  children: ReactNode
}) {
  const { dispatch } = useAppShell()

  const closeDrawer = () => {
    dispatch({ type: Actions.MOBILE_DRAWER_IS_OPEN, payload: false })
  }
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    closeDrawer()
  }

  return (
    <AppMenuItem href={href} onClick={handleClick}>
      {children}
    </AppMenuItem>
  )
}
