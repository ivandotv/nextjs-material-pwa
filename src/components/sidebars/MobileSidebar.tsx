import { Box, List, Typography, useMediaQuery, useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Actions, useAppShell } from 'components/providers/AppShellProvider'
import { DefaultMenuItems } from 'components/sidebars'
import { NextApplicationPage } from 'pages/_app'
import { memo, useCallback, useEffect } from 'react'

export const MobileSidebar = memo(function MobileSidebar({
  sidebar
}: {
  sidebar?: NextApplicationPage['mobileSidebar']
}) {
  const { state, dispatch } = useAppShell()
  const theme = useTheme()

  const closeDrawer = useCallback(() => {
    dispatch({ type: Actions.MOBILE_DRAWER_IS_OPEN, payload: false })
  }, [dispatch])

  const openDrawer = () => {
    dispatch({ type: Actions.MOBILE_DRAWER_IS_OPEN, payload: true })
  }

  const matches = useMediaQuery(theme.breakpoints.up('md'), {
    ssrMatchMedia: () => {
      return {
        matches: false
      }
    }
  })

  useEffect(() => {
    if (matches && state.mobileDrawerIsOpen) {
      closeDrawer()
    }
  }, [matches, state.mobileDrawerIsOpen, closeDrawer])

  const defaultItems = (
    <DefaultMenuItems onClick={closeDrawer}></DefaultMenuItems>
  )

  const menuItems = sidebar ? (
    sidebar(defaultItems)
  ) : (
    <List>{defaultItems}</List>
  )

  return (
    <Box
      sx={{
        width: { md: state.mobileDrawerWidth },
        flexShrink: { md: 0 }
      }}
    >
      <SwipeableDrawer
        disableBackdropTransition={!state.isIOS}
        disableDiscovery={state.isIOS}
        variant="temporary"
        anchor="left"
        transitionDuration={400}
        open={state.mobileDrawerIsOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
        sx={{
          '.MuiDrawer-paper': {
            width: state.mobileDrawerWidth,
            backgroundColor: (theme) => theme.palette.background.default,
            backgroundImage: 'none'
          }
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        <Card
          sx={{
            position: 'relative',
            height: '180px',
            borderRadius: '0'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(100deg, hsl(243deg 97% 46%) 0%, hsl(130deg 100% 50%) 100%)'
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              position: 'relative',
              height: '100%',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}
          >
            <Avatar
              sx={{
                width: 50,
                height: 50,
                ml: 1,
                mb: 1,
                mr: 2
              }}
              src="/app/profile.jpg"
            ></Avatar>
            <Box sx={{ mb: 1 }}>
              <Typography
                sx={{
                  color: '#fff'
                }}
                variant="h6"
                component="p"
              >
                Ivan Bambino
              </Typography>
              <Typography
                sx={{
                  color: '#fff'
                }}
              >
                hello@example.com
              </Typography>
            </Box>
          </Box>
        </Card>
        {menuItems}
      </SwipeableDrawer>
    </Box>
  )
})
