import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import MenuCloseIcon from '@material-ui/icons/ArrowBack'
import DarkIcon from '@material-ui/icons/Brightness6'
import LightIcon from '@material-ui/icons/Brightness7'
import MenuIcon from '@material-ui/icons/Menu'
import { Actions, useAppShell } from 'components/providers/AppShellProvider'
import { useAppTitle } from 'lib/utils'
import { useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionTitle: {
      marginRight: 'auto'
    },
    switchThemeButton: {},
    bottomNav: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'flex-end',
      height: '50px',
      marginLeft: 'auto'
    },
    menuButtonMobile: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    menuButtonDesktop: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    toolbarUiWrap: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }
  })
)

export function AppToolbar() {
  const theme = useTheme()
  const classes = useStyles()
  const appTitle = useAppTitle(' / ', 'Home')

  const { state, dispatch } = useAppShell()

  const [counter, setCounter] = useState(0)

  const openMobileDrawer = () => {
    dispatch({ type: Actions.MOBILE_DRAWER_IS_OPEN, payload: true })
  }

  const toggleDesktopDrawer = () => {
    dispatch({
      type: Actions.DESKTOP_DRAWER_IS_OPEN,
      payload: !state.desktopDrawerIsOpen
    })
  }

  const toggleBottomNav = () => {
    dispatch({
      type: Actions.SHOW_BOTTOM_NAV,
      payload: !state.showBottomNav
    })
  }
  const toggleTheme = () => {
    dispatch({
      type: Actions.SET_THEME,
      payload: state.theme === 'dark' ? 'light' : 'dark'
    })
    setCounter((counter) => {
      return counter + 1
    })
  }

  return (
    <AppBar
      color={theme.palette.type === 'light' ? 'primary' : 'default'}
      position="fixed"
      elevation={0}
    >
      <Toolbar>
        <div className={classes.toolbarUiWrap}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={openMobileDrawer}
            className={classes.menuButtonMobile}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDesktopDrawer}
            className={classes.menuButtonDesktop}
          >
            {state.desktopDrawerIsOpen ? <MenuCloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap className={classes.sectionTitle}>
            {appTitle}
          </Typography>
          <Hidden mdUp implementation="js">
            <div className={classes.bottomNav}>
              <Switch
                checked={state.showBottomNav}
                onChange={toggleBottomNav}
                name="checkedB"
                color="secondary"
              />
              <Typography component="p" noWrap>
                Bottom Nav
              </Typography>
            </div>
          </Hidden>
          <Tooltip
            title={
              state.theme === 'dark'
                ? 'Switch to Light Theme'
                : 'Switch to Dark Theme'
            }
            aria-label="toggle dark/light theme"
          >
            <IconButton
              color="inherit"
              className={classes.switchThemeButton}
              onClick={toggleTheme}
              edge="end"
            >
              <Badge badgeContent={counter} color="secondary" showZero>
                {state.theme === 'dark' ? <LightIcon /> : <DarkIcon />}
              </Badge>
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  )
}
