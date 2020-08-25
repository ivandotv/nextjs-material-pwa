import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'
import clsx from 'clsx'
import { memo } from 'react'
import { NextApplicationPage } from '../../../pages/_app'
import { useAppShell } from '../AppShellProvider'
import { DefaultMenuItems } from './DefaultMenuItems'

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
    boxAnim: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    boxShift: {
      height: '100vh',
      marginLeft: 0
    },
    boxShiftAnim: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  })
)

export const DesktopSidebar = memo(function DesktopSidebar({
  sidebar
}: {
  sidebar?: NextApplicationPage['desktopSidebar']
}) {
  const { state } = useAppShell()
  const classes = useStyles({ drawerWidth: state.desktopDrawerWidth })
  const theme = useTheme()

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
        [classes.boxAnim]: !state.desktopDrawerIsOpen && state.showApp,
        [classes.boxShift]: state.desktopDrawerIsOpen,
        [classes.boxShiftAnim]: state.desktopDrawerIsOpen && state.showApp
      })}
    >
      <Drawer
        anchor="left"
        variant="persistent"
        open={state.desktopDrawerIsOpen}
        /* eslint-disable */
        transitionDuration={
          state.showApp
            ? {
                appear: 0,
                enter: theme.transitions.duration.enteringScreen,
                exit: theme.transitions.duration.leavingScreen
              }
            : 0
        }
        /* eslint-enable */
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.appBarSpacer}></div>
        {menuItems}
      </Drawer>
    </Box>
  )
})
