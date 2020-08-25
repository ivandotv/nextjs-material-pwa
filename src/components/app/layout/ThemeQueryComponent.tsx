import { useAppShell, Actions } from '../AppShellProvider'
import { useRef, useEffect, useLayoutEffect } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'

// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
export function ThemeQueryComponent() {
  const { state, dispatch } = useAppShell()

  const storageKey = 'theme'
  const isInitialMount = useRef(true)

  // write currently chosen theme to local storage
  useEffect(() => {
    // do not run on mount
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      window.localStorage.setItem(storageKey, state.theme)
    }
  }, [state.theme])

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  // monitor for system / browser changes to the theme
  // todo - split in to two effects
  useLayoutEffect(() => {
    const theme = window.localStorage.getItem(storageKey)

    if (typeof theme === 'string') {
      // we have explicitly set theme
      dispatch({
        type: Actions.SET_THEME,
        payload: theme === 'dark' ? 'dark' : 'light'
      })
    } else {
      // system or browser set theme
      dispatch({
        type: Actions.SET_THEME,
        payload: prefersDarkMode ? 'dark' : 'light'
      })
    }
    // setShowApp(true)
    dispatch({ type: Actions.READY_TO_SHOW, payload: true })
  }, [prefersDarkMode, dispatch])

  return null
}
