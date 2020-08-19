import Drawer from '@material-ui/core/Drawer'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useAppShell } from '../AppShellProvider'
import Box from '@material-ui/core/Box'
import clsx from 'clsx'
import { NextApplicationPage } from '../../../pages/_app'
import { DefaultMenuItems } from './DefaultMenuItems'
import List from '@material-ui/core/List'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: (props: { drawerWidth: number }) => props.drawerWidth,
        flexShrink: 0
      }
    },
    drawerPaper: {
      width: (props: { drawerWidth: number }) => props.drawerWidth
    },
    appBarSpacer: {
      ...theme.mixins.toolbar
    },
    box: {
      marginLeft: ({ drawerWidth }: { drawerWidth: number }) => {
        return drawerWidth * -1
      }
    },
    boxShift: {
      height: '100vh',
      marginLeft: 0,

      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  })
)

export function DesktopSidebar({
  sidebar
}: {
  sidebar?: NextApplicationPage['desktopSidebar']
}) {
  const { state } = useAppShell()
  const classes = useStyles({ drawerWidth: state.desktopDrawerWidth })

  const defaultItems = <DefaultMenuItems></DefaultMenuItems>
  const menuItems = sidebar ? (
    sidebar(defaultItems)
  ) : (
    <List>{defaultItems}</List>
  )

  return (
    <Box
      className={clsx(classes.drawer, {
        [classes.box]: !state.desktopDrawerIsOpen,
        [classes.boxShift]: state.desktopDrawerIsOpen
      })}
    >
      <Drawer
        anchor="left"
        variant="persistent"
        open={state.desktopDrawerIsOpen}
        transitionDuration={0}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.appBarSpacer}></div>
        {menuItems}
      </Drawer>
    </Box>
  )
}
