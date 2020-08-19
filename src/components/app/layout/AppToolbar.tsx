import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import MenuCloseIcon from '@material-ui/icons/ArrowBack'
import DarkIcon from '@material-ui/icons/Brightness6'
import LightIcon from '@material-ui/icons/Brightness7'
import MenuIcon from '@material-ui/icons/Menu'
import { Actions, useAppShell } from '../AppShellProvider'
import { useState } from 'react'
import Badge from '@material-ui/core/Badge'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    switchThemeButton: {
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
    }
  })
)

export function AppToolbar() {
  const theme = useTheme()
  const classes = useStyles()

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
        <Typography variant="h6" noWrap>
          App Name
        </Typography>
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
      </Toolbar>
    </AppBar>
  )
}
