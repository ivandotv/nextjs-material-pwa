import { ReactNode } from 'react'
import { AppMenuItem } from './AppMenuItem'
import { Actions, useAppShell } from './AppShellProvider'
import { LinkProps } from 'next/link'

export function MobileMenuItem({
  onClick,
  link,
  children
}: {
  link: LinkProps
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
    <AppMenuItem link={link} onClick={handleClick}>
      {children}
    </AppMenuItem>
  )
}
