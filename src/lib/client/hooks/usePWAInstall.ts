import Cookies from 'js-cookie'
import { useDebugValue, useEffect, useRef, useState } from 'react'

/**
 * Handle installing website as a PWA
 */
export function usePWAInstall({
  enable,
  cookieName
}: {
  enable: boolean
  cookieName: string
}) {
  const beforeInstallPromptEvent = useRef<
    BeforeInstallPromptEvent | undefined
  >()
  const userChoice = useRef<'dismissed' | 'accepted' | undefined>()
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const mounted = useRef(false)

  useDebugValue({ enable })

  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  async function installPWA() {
    if (!beforeInstallPromptEvent.current) {
      throw new Error('must wait for before install prompt event')
    }

    beforeInstallPromptEvent.current.prompt()
    const { outcome } = await beforeInstallPromptEvent.current.userChoice

    if (!mounted.current) return

    hideInstallPrompt(outcome === 'accepted' ? true : false)

    beforeInstallPromptEvent.current = undefined
  }

  function hideInstallPrompt(accepted: boolean) {
    setShowInstallPrompt(false)
    beforeInstallPromptEvent.current = undefined
    if (!accepted) {
      Cookies.set(cookieName, '1', { expires: 1 })
    } else {
      Cookies.remove(cookieName)
    }
  }

  useEffect(() => {
    if (!enable) return
    function onAppInstalled() {
      //TODO - send to analytics
    }

    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      beforeInstallPromptEvent.current = e as BeforeInstallPromptEvent

      //guard: sometimes this event fires when user clicks "cancel" in chrome ui (linux)
      if (!userChoice.current) {
        if (!Cookies.get(cookieName)) {
          setShowInstallPrompt(true)
        }
      }
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [enable, cookieName])

  return [showInstallPrompt, installPWA, hideInstallPrompt] as const
}
