import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { useEffect } from 'react'
import { NextApplicationPage } from '../../../pages/_app'
import { Actions, useAppShell } from './AppShellProvider'
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
    card: {
      position: 'relative',
      height: '180px',
      borderRadius: '0'
    },
    cardMedia: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    },
    cardMediaGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background:
        'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,212,255,0) 100%)'
    },
    avatarWrapper: {
      display: 'flex',
      position: 'relative',
      height: '100%',
      alignItems: 'flex-end',
      justifyContent: 'flex-start'
    },
    avatarInfoWrap: {
      marginBottom: theme.spacing(1)
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2)
    },
    avatarName: {
      color: '#ffffff'
    },
    avatarEmail: {
      color: '#ffffff'
    }
  })
)

export function MobileSidebar({
  sidebar
}: {
  sidebar?: NextApplicationPage['mobileSidebar']
}) {
  const { state, dispatch } = useAppShell()
  const theme = useTheme()
  const classes = useStyles({ drawerWidth: state.mobileDrawerWidth })

  const closeDrawer = () => {
    dispatch({ type: Actions.MOBILE_DRAWER_IS_OPEN, payload: false })
  }

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
  }, [matches])

  const defaultItems = (
    <DefaultMenuItems onClick={closeDrawer}></DefaultMenuItems>
  )

  const menuItems = sidebar ? sidebar(defaultItems) : defaultItems

  return (
    <Box className={classes.drawer}>
      <SwipeableDrawer
        disableBackdropTransition={!state.isIOS}
        disableDiscovery={state.isIOS}
        variant="temporary"
        anchor="left"
        open={state.mobileDrawerIsOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image="/mobile-drawer-hero.png"
            title="Live from space album cover"
          />
          <div className={classes.cardMediaGradient}></div>
          <Box className={classes.avatarWrapper}>
            <Avatar className={classes.avatar} src="profile.jpg"></Avatar>
            <Box className={classes.avatarInfoWrap}>
              <Typography
                className={classes.avatarName}
                variant="h6"
                component="p"
              >
                Ivan Bambino
              </Typography>
              <Typography className={classes.avatarEmail}>
                hello@example.com
              </Typography>
            </Box>
          </Box>
        </Card>
        {menuItems}
      </SwipeableDrawer>
    </Box>
  )
}
