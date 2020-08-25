import { AppMenuItem } from './AppMenuItem'

export function DefaultMenuItems({
  onClick
}: {
  onClick?: (...args: any[]) => void
}) {
  return (
    <>
      <AppMenuItem link={{ href: '/app' }} onClick={onClick}>
        Home
      </AppMenuItem>
      <AppMenuItem link={{ href: '/app/settings' }} onClick={onClick}>
        Settings
      </AppMenuItem>
    </>
  )
}
