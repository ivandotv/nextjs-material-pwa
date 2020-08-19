import { useEffect } from 'react'
import { Actions, useAppShell } from '../components/app/AppShellProvider'

export function useDesktopDrawerPosition(
  context: typeof useAppShell,
  key = 'desktopDrawerState'
) {
  const { state, dispatch } = useAppShell()

  useEffect(() => {
    const isOpen = window.localStorage.getItem(key)

    dispatch({
      type: Actions.DESKTOP_DRAWER_IS_OPEN,
      payload: isOpen ? isOpen === 'open' : true
    })
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      key,
      state.desktopDrawerIsOpen ? 'open' : 'closed'
    )
  }, [state.desktopDrawerIsOpen])
}
