import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'
import { useAppShell } from 'components/providers/AppShellProvider'
import { DefaultMenuItems } from 'components/sidebars'
import { NextApplicationPage } from 'pages/_app'
import { memo } from 'react'

// @ts-expect-error - MUI type error
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export const DesktopSidebar = memo(function DesktopSidebar({
  sidebar
}: {
  sidebar?: NextApplicationPage['desktopSidebar']
}) {
  const { state } = useAppShell()
  const theme = useTheme()

  const defaultItems = <DefaultMenuItems></DefaultMenuItems>
  const menuItems = sidebar ? (
    sidebar(defaultItems)
  ) : (
    <List>{defaultItems}</List>
  )

  return (
    <Box
      sx={{
        width: {
          md: state.desktopDrawerWidth
        },
        flexShrink: {
          md: 0
        },
        ml: !state.desktopDrawerIsOpen ? state.desktopDrawerWidth * -1 : 0,
        transition: state.showApp
          ? !state.desktopDrawerIsOpen
            ? (theme) =>
                theme.transitions.create(['margin-left'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen
                })
            : (theme) =>
                theme.transitions.create(['margin-left'], {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen
                })
          : undefined,
        height: state.desktopDrawerIsOpen ? '100vh' : undefined
      }}
    >
      <Drawer
        anchor="left"
        variant="persistent"
        open={state.desktopDrawerIsOpen}
        transitionDuration={
          state.showApp
            ? {
                appear: 0,
                enter: theme.transitions.duration.enteringScreen,
                exit: theme.transitions.duration.leavingScreen
              }
            : 0
        }
        sx={{
          '.MuiDrawer-paper': {
            width: state.desktopDrawerWidth
          }
        }}
      >
        <Offset />
        {menuItems}
      </Drawer>
    </Box>
  )
})
