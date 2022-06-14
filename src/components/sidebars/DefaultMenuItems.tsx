import { AppMenuItem } from 'components/sidebars'

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
      <AppMenuItem link={{ href: '/onboarding' }} onClick={onClick}>
        Onboarding
      </AppMenuItem>
    </>
  )
}
