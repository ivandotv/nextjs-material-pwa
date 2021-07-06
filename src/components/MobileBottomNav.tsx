import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
      '&$selected, &$selected:hover': {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.selected
      }
    },
    selected: {} // fix icon color
  })
)

function getSelected(path: string, paths: string[]) {
  //get for first item in menuPaths
  if (
    path === '/app' ||
    path.startsWith('/app/by-') ||
    path.startsWith('/app/custom')
  ) {
    return 0
  }

  //skip first item
  for (let i = 1; i < paths.length; i++) {
    if (path.startsWith(paths[i])) {
      return i
    }
  }

  return -1
}

export function MobileBottomNav({ className }: { className: string }) {
  const classes = useStyles()
  const router = useRouter()
  const [selected, setSelected] = useState(-1)

  const menuItems = useMemo(
    () => [
      {
        label: `Home`,
        icon: <SearchIcon />,
        path: '/app'
      },
      { label: `Settings`, icon: <SettingsIcon />, path: '/app/settings' }
    ],
    []
  )

  useEffect(() => {
    const currSelected = getSelected(
      router.asPath,
      menuItems.map((item) => item.path)
    )

    if (currSelected !== -1) {
      setSelected(currSelected)
    }
  }, [router.asPath, menuItems])

  return (
    <BottomNavigation
      value={selected}
      onChange={(_event, newValue) => {
        //navigate
        setSelected(newValue)
        router.push(menuItems[newValue].path)
      }}
      showLabels
      className={className}
    >
      {menuItems.map((item) => (
        <BottomNavigationAction
          key={item.path}
          classes={classes}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </BottomNavigation>
  )
}
