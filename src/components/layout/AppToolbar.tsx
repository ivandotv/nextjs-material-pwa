import MenuCloseIcon from '@mui/icons-material/ArrowBack'
import DarkIcon from '@mui/icons-material/Brightness6'
import LightIcon from '@mui/icons-material/Brightness7'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Hidden from '@mui/material/Hidden'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { Actions, useAppShell } from 'components/providers/AppShellProvider'
import { useState } from 'react'

export function AppToolbar() {
  const theme = useTheme()

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
      color={theme.palette.mode === 'light' ? 'primary' : 'default'}
      position="fixed"
      elevation={0}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={openMobileDrawer}
            sx={{
              mr: 2,
              display: {
                md: 'none'
              }
            }}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDesktopDrawer}
            sx={{
              mr: 2,
              display: {
                xs: 'none',
                md: 'flex'
              }
            }}
            size="large"
          >
            {state.desktopDrawerIsOpen ? <MenuCloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap sx={{ mr: 'auto' }}>
            {state.title}
          </Typography>
          <Hidden mdUp implementation="js">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-end',
                height: '50px',
                marginLeft: 'auto'
              }}
            >
              <Typography component="p" noWrap>
                Bottom Nav
              </Typography>
              <Switch
                checked={state.showBottomNav}
                onChange={toggleBottomNav}
                name="checkedB"
                color="secondary"
              />
            </Box>
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
              onClick={toggleTheme}
              edge="end"
              size="large"
            >
              <Badge badgeContent={counter} color="error" showZero>
                {state.theme === 'dark' ? <LightIcon /> : <DarkIcon />}
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
