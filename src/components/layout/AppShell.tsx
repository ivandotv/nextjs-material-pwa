import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Hidden from '@mui/material/Hidden'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'
import {
  cookies,
  enablePWAInstallBanner,
  serviceWorker
} from 'lib/shared/config'
import {
  AppUpdatedNotification,
  DisplayModeNotification,
  MobileBottomNav,
  OfflineIndicator
} from 'components'
import { AppToolbar } from 'components/layout'
import { useAppShell } from 'components/providers/AppShellProvider'
import { InstallBanner, UpdateBanner } from 'components/pwa-prompt'
import { DesktopSidebar, MobileSidebar } from 'components/sidebars'
import {
  useDesktopDrawerPosition,
  usePWAInstall,
  useServiceWorker
} from 'lib/client/hooks'
import Head from 'next/head'
import { NextApplicationPage } from 'pages/_app'
import { ReactNode } from 'react'

// @ts-expect-error - MUI type error
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export function AppShell({
  desktopSidebar,
  mobileSidebar,
  children
}: {
  mobileSidebar?: NextApplicationPage['mobileSidebar']
  desktopSidebar?: NextApplicationPage['desktopSidebar']
  children: ReactNode
}) {
  const { state } = useAppShell()
  const theme = useTheme()

  useDesktopDrawerPosition(useAppShell)

  const [showPrompt, hideUpdatePrompt, update] = useServiceWorker({
    path: '/sw.js',
    scope: '/',
    enable: serviceWorker.enable,
    enableReload: serviceWorker.enableReload,
    updateCookieName: cookies.showAppUpdated.name
  })

  const [showInstallPrompt, installPWA, hideInstallPrompt] = usePWAInstall({
    enable: enablePWAInstallBanner,
    cookieName: cookies.pwaInstallDismissed.name
  })

  return (
    <>
      <Head>
        <title>Next.js PWA</title>
        {state.showApp ? (
          <meta
            name="theme-color"
            key="theme-color"
            content={
              theme.palette.mode === 'dark'
                ? theme.palette.grey[900]
                : theme.palette.primary.main
            }
          />
        ) : null}
      </Head>
      <CssBaseline />
      <UpdateBanner
        onCancel={hideUpdatePrompt}
        onOk={update}
        show={showPrompt}
      />
      <InstallBanner
        onCancel={() => hideInstallPrompt(false)}
        onOk={installPWA}
        show={showInstallPrompt}
      />
      <DisplayModeNotification />
      <AppUpdatedNotification cookieName={cookies.showAppUpdated.name} />
      <Box style={{ opacity: state.showApp ? 1 : 0 }} sx={{ display: 'flex' }}>
        <AppToolbar />
        <Box component="nav" sx={{ zIndex: theme.zIndex.appBar - 1 }}>
          <Hidden mdUp implementation="js">
            <MobileSidebar sidebar={mobileSidebar} />
          </Hidden>
          <Hidden mdDown implementation="css">
            <DesktopSidebar sidebar={desktopSidebar} />
          </Hidden>
        </Box>

        <Box
          component="main"
          sx={{
            width: '100%',
            p: {
              md: 2
            },
            pt: {
              md: 0
            }
          }}
        >
          <Offset />
          <Container maxWidth="md" disableGutters>
            {children}
          </Container>
          <Box
            sx={{
              position: 'fixed',
              width: '100%',
              bottom: 0,
              left: 0,
              zIndex: 1
            }}
          >
            <OfflineIndicator />
            <Hidden mdUp implementation="js">
              {state.showBottomNav ? <MobileBottomNav /> : null}
            </Hidden>
          </Box>
        </Box>
      </Box>
    </>
  )
}
