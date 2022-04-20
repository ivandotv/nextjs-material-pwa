import { useAppShell, Actions } from 'components/providers/AppShellProvider'
import { useRef, useEffect, useLayoutEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import { themeStorageKey } from 'lib/shared/config'

//https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
export function ThemeQueryComponent() {
  const { state, dispatch } = useAppShell()

  const isInitialMount = useRef(true)

  // write currently chosen theme to local storage
  useEffect(() => {
    // do not run on mount
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      window.localStorage.setItem(themeStorageKey, state.theme)
    }
  }, [state.theme])

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  // monitor for system / browser changes to the theme
  // TODO - split in to two effects
  useLayoutEffect(() => {
    const theme = window.localStorage.getItem(themeStorageKey)

    if (typeof theme === 'string') {
      // we have explicitly set the theme
      dispatch({
        type: Actions.SET_THEME,
        payload: theme === 'dark' ? 'dark' : 'light'
      })
    } else {
      // system theme
      dispatch({
        type: Actions.SET_THEME,
        payload: prefersDarkMode ? 'dark' : 'light'
      })
    }
    setTimeout(() => {
      // ready to show the application
      dispatch({ type: Actions.READY_TO_SHOW, payload: true })
    }, 0)
  }, [prefersDarkMode, dispatch])

  return null
}
