import { ThemeProvider } from '@mui/material/styles'
import { ThemeQueryComponent } from 'components'
import { DarkTheme, LightTheme } from 'lib/client/theme'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'

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

const Actions = {
  SET_THEME: 'SET_THEME',
  DESKTOP_DRAWER_IS_OPEN: 'DESKTOP_DRAWER_IS_OPEN',
  MOBILE_DRAWER_IS_OPEN: 'MOBILE_DRAWER_IS_OPEN',
  READY_TO_SHOW: 'READY_TO_SHOW',
  SHOW_BOTTOM_NAV: 'SHOW_BOTTOM_NAV',
  SET_TITLE: 'SET_TITLE'
} as const

type Payload = {
  [Actions.SET_THEME]: 'light' | 'dark'
  [Actions.MOBILE_DRAWER_IS_OPEN]: boolean
  [Actions.DESKTOP_DRAWER_IS_OPEN]: boolean
  [Actions.READY_TO_SHOW]: boolean
  [Actions.SHOW_BOTTOM_NAV]: boolean
  [Actions.SET_TITLE]: string
}

const initialState = {
  mobileDrawerIsOpen: false,
  mobileDrawerWidth: 300,
  desktopDrawerWidth: 270,
  desktopDrawerIsOpen: true,
  isIOS:
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent),
  theme: 'light',
  showApp: false,
  showBottomNav: true,
  title: ''
}

// todo - omit ready toshow
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

    case Actions.READY_TO_SHOW:
      return {
        ...state,
        showApp: action.payload
      }
    case Actions.SHOW_BOTTOM_NAV:
      return {
        ...state,
        showBottomNav: action.payload
      }
    case Actions.SET_TITLE:
      return {
        ...state,
        title: action.payload
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

  const [showQueryTheme, setShowQueryTheme] = useState(false)

  const currentTheme = state.theme === 'dark' ? DarkTheme : LightTheme

  useEffect(() => {
    setShowQueryTheme(true)
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <Provider value={{ state, dispatch }}>
        {showQueryTheme ? <ThemeQueryComponent /> : null}
        {children}
      </Provider>
    </ThemeProvider>
  )
}

export { AppShellProvider, Consumer, useAppShell, Actions }
