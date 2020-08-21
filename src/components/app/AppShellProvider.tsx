import { ThemeProvider } from '@material-ui/core/styles'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { DarkTheme, LightTheme } from '../../lib/theme'
import { ThemeQueryComponent } from './layout/ThemeQueryComponent'

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
  isIOS:
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent),
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

function AppShellProvider({
  children,
  show
}: {
  children: ReactNode
  show: boolean
}) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const currentTheme = state.theme === 'dark' ? DarkTheme : LightTheme

  // remove serverside stylesheets
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  // https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
  const [showThemeComponent, setShowThemeComponent] = useState(false)
  useEffect(() => {
    setShowThemeComponent(true)
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <Provider value={{ state, dispatch }}>
        <div id="opacity-wrapper" style={{ opacity: show ? 1 : 0 }}>
          {showThemeComponent ? <ThemeQueryComponent /> : null}
          {children}
        </div>
      </Provider>
    </ThemeProvider>
  )
}

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

export { AppShellProvider, Consumer, useAppShell, Actions }
