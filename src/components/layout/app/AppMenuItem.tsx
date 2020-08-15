import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export type MenuItemProps = {
  href: string
  onClick?: (...args: any[]) => void
}
export function AppMenuItem({
  onClick,
  href,
  children
}: {
  href: string
  onClick?: (...args: any[]) => void
  children: ReactNode
}) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <Link href={href} passHref>
      <ListItem
        button
        component="a"
        onClick={handleClick}
        selected={router.asPath === href}
      >
        <ListItemText>{children}</ListItemText>
      </ListItem>
    </Link>
  )
}
