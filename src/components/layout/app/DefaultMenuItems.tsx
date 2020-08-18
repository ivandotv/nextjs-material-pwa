import { AppMenuItem } from './AppMenuItem'

export function DefaultMenuItems({
  onClick
}: {
  onClick?: (...args: any[]) => void
}) {
  return (
    <>
      <AppMenuItem link={{ href: '/' }} onClick={onClick}>
        Index
      </AppMenuItem>
      <AppMenuItem link={{ href: '/settings' }} onClick={onClick}>
        Settings
      </AppMenuItem>
    </>
  )
}
