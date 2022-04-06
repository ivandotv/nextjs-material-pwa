import { AppMenuItem } from 'components/sidebars'
import { Actions, useAppShell } from 'components/providers/AppShellProvider'
import { LinkProps } from 'next/link'
import { ReactNode } from 'react'

export function MobileMenuItem({
  onClick,
  link,
  children,
  icon
}: {
  link: LinkProps
  onClick?: (...args: any[]) => void
  children: ReactNode
  icon?: ReactNode
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
    <AppMenuItem icon={icon} link={link} onClick={handleClick}>
      {children}
    </AppMenuItem>
  )
}
