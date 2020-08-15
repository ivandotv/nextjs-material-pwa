import { ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode
} from 'react'
import { DarkTheme, LightTheme } from '../../../lib/theme'

const Actions = {
  SET_THEME: 'SET_THEME',
  DESKTOP_DRAWER_IS_OPEN: 'DESKTOP_DRAWER_IS_OPEN',
  MOBILE_DRAWER_IS_OPEN: 'MOBILE_DRAWER_IS_OPEN'
} as const

type Payload = {
  [Actions.SET_THEME]: 'light' | 'dark'
  [Actions.MOBILE_DRAWER_IS_OPEN]: boolean
  [Actions.DESKTOP_DRAWER_IS_OPEN]: boolean
}

const initialState = {
  mobileDrawerIsOpen: false,
  mobileDrawerWidth: 300,
  desktopDrawerWidth: 270,
  desktopDrawerIsOpen: true,
  isIOS: process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent),
  theme: 'light'
}

export type ProductActions = ActionMap<Payload>[keyof ActionMap<Payload>]

const reducer = (state: typeof initialState, action: ProductActions) => {
  switch (action.type) {
    case Actions.SET_THEME:
      return {
        ...state,
        theme: action.payload
      }
    case Actions.DESKTOP_DRAWER_IS_OPEN:
      return {
        ...state,
        desktopDrawerIsOpen: action.payload
      }
    case Actions.MOBILE_DRAWER_IS_OPEN:
      return {
        ...state,
        mobileDrawerIsOpen: action.payload
      }

    default:
      throw assertUnrecognizedAction(action)
  }
}

function assertUnrecognizedAction(action: never) {
  return new Error(`Unrecognized action: ${(action as ProductActions).type}`)
}

const AppShellContext = createContext<
  | {
      state: typeof initialState
      dispatch: React.Dispatch<ProductActions>
    }
  | undefined
>(undefined)

function useAppShell() {
  const context = useContext(AppShellContext)
  if (context === undefined) {
    throw new Error('useAppShell must be used within AppShellProvider')
  }

  return context
}

const { Provider, Consumer } = AppShellContext

function AppShellProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const storageKey = 'theme'

  // monitor for system / browser changes to the theme
  useEffect(() => {
    const theme = window.localStorage.getItem(storageKey)
    if (typeof theme === 'string') {
      // we have explicitly set theme
      dispatch({
        type: 'SET_THEME',
        payload: theme === 'dark' ? 'dark' : 'light'
      })
    } else {
      // system or browser set theme
      dispatch({
        type: 'SET_THEME',
        payload: prefersDarkMode ? 'dark' : 'light'
      })
    }
  }, [prefersDarkMode])

  // write currently chosen theme to local storage
  useEffect(() => {
    console.log('test use effect >>', state.theme)
    window.localStorage.setItem(storageKey, state.theme)
  }, [state.theme])

  const currentTheme = state.theme === 'dark' ? DarkTheme : LightTheme

  // remove serverside stylesheets
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <Provider value={{ state, dispatch }}>{children}</Provider>
    </ThemeProvider>
  )
}

export { AppShellProvider, Consumer, useAppShell, Actions }

type ActionMap<Payload> = {
  [Action in keyof Payload]: Payload[Action] extends undefined
    ? {
        type: Action
      }
    : {
        type: Action
        payload: Payload[Action]
      }
}
