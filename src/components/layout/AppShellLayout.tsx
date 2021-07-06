import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'
import { DisplayModeNotification } from 'components/DisplayModeNotification'
import { AppToolbar } from 'components/layout/AppToolbar'
import { MobileBottomNav } from 'components/MobileBottomNav'
import { OfflineIndicator } from 'components/OfflineIndicator'
import { useAppShell } from 'components/providers/AppShellProvider'
import { InstallBanner } from 'components/pwa-prompt/InstallBanner'
import { UpdateBanner } from 'components/pwa-prompt/UpdateBanner'
import { DesktopSidebar } from 'components/sidebars/DesktopSidebar'
import { MobileSidebar } from 'components/sidebars/MobileSidebar'
import { usePWAInstall } from 'lib/usePWAInstall'
import { useServiceWorker } from 'lib/useServiceWorker'
import { useDesktopDrawerPosition } from 'lib/utils'
import Head from 'next/head'
import { NextApplicationPage } from 'pages/_app'
import React, { ReactNode } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    navWrapper: {
      zIndex: theme.zIndex.appBar - 1
    },
    appBarSpacer: {
      ...theme.mixins.toolbar
    },
    contentSpacer: {
      ...theme.mixins.toolbar
    },
    content: {
      width: '100%',
      [theme.breakpoints.down('md')]: {
        padding: 0
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2),
        paddingTop: 0
      }
    },
    bottomWrap: {
      position: 'fixed',
      width: '100%',
      bottom: 0,
      left: 0,
      zIndex: 1
    },
    offlineIndicator: {
      width: '100%'
    },
    bottomNav: {
      borderTop: `1px solid ${theme.palette.divider}`,
      width: '100%'
    }
  })
)

export function AppShellLayout({
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
  const classes = useStyles({ drawerWidth: state.desktopDrawerWidth })

  useDesktopDrawerPosition(useAppShell)

  const [showPrompt, hideUpdatePrompt, update] = useServiceWorker({
    path: '/sw.js',
    scope: '/'
  })

  const [showInstallPrompt, installPWA, hideInstallPrompt] = usePWAInstall()

  return (
    <>
      <Head>
        <title>Next.js PWA</title>
        {state.showApp ? (
          <meta
            name="theme-color"
            key="theme-color"
            content={
              theme.palette.type === 'dark'
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
      <div style={{ opacity: state.showApp ? 1 : 0 }} className={classes.root}>
        <AppToolbar />
        <nav className={classes.navWrapper}>
          <Hidden mdUp implementation="js">
            <MobileSidebar sidebar={mobileSidebar} />
          </Hidden>
          <Hidden smDown implementation="css">
            <DesktopSidebar sidebar={desktopSidebar} />
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.contentSpacer} />
          <Container maxWidth="md" disableGutters>
            {/* https://github.com/mui-org/material-ui/issues/21711 */}
            {children as JSX.Element}
          </Container>
          <div className={classes.bottomWrap}>
            <OfflineIndicator className={classes.offlineIndicator} />
            <Hidden mdUp implementation="js">
              {state.showBottomNav ? (
                <MobileBottomNav className={classes.bottomNav} />
              ) : null}
            </Hidden>
          </div>
        </main>
      </div>
    </>
  )
}
