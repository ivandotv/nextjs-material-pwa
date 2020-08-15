import { AppMenuItem } from './AppMenuItem'

export function DefaultMenuItems({
  onClick
}: {
  onClick?: (...args: any[]) => void
}) {
  return (
    <>
      <AppMenuItem href="/" onClick={onClick}>
        Index
      </AppMenuItem>
      <AppMenuItem href="/about" onClick={onClick}>
        About
      </AppMenuItem>
    </>
  )
}
