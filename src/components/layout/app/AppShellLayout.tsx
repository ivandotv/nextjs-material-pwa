import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'
import Head from 'next/head'
import React, { ReactNode } from 'react'
import { useDesktopDrawerPosition } from '../../../lib/utils'
import { NextApplicationPage } from '../../../pages/_app'
import { AppContent } from './AppContent'
import { useAppShell } from './AppShellProvider'
import { AppToolbar } from './AppToolbar'
import { DesktopSidebar } from './sidebars/DesktopSidebar'
import { MobileSidebar } from './sidebars/MobileSidebar'

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
    }
  })
)

export const AppShellLayout = ({
  desktopSidebar,
  mobileSidebar,
  children
}: {
  mobileSidebar?: NextApplicationPage['mobileSidebar']
  desktopSidebar?: NextApplicationPage['desktopSidebar']
  children: ReactNode
}) => {
  const { state } = useAppShell()
  const theme = useTheme()
  const classes = useStyles({ drawerWidth: state.desktopDrawerWidth })

  useDesktopDrawerPosition(useAppShell)

  return (
    <>
      <Head>
        <title>App Name</title>
        <meta
          name="theme-color"
          key="theme-color"
          content={
            theme.palette.type === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.primary.main
          }
        />
      </Head>
      <CssBaseline />
      <div className={classes.root}>
        <AppToolbar />
        <nav className={classes.navWrapper}>
          <Hidden mdUp implementation="js">
            <MobileSidebar sidebar={mobileSidebar} />
          </Hidden>
          <Hidden smDown implementation="css">
            <DesktopSidebar sidebar={desktopSidebar} />
          </Hidden>
        </nav>
        <AppContent>{children}</AppContent>
      </div>
    </>
  )
}
