import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'

const pwaInstallDismissedCookie = 'pwa_install_dismissed'

/**
 * Handle installing website as a PWA
 */
export function usePWAInstall({ enable }: { enable: boolean }) {
  const beforeInstallPromptEvent = useRef<
    BeforeInstallPromptEvent | undefined
  >()
  const userChoice = useRef<'dismissed' | 'accepted' | undefined>()
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const mounted = useRef(false)
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
    // TODO - track outcome in analytics

    console.log('user choice: ', outcome)

    hideInstallPrompt(outcome === 'accepted' ? true : false)

    beforeInstallPromptEvent.current = undefined
  }

  function hideInstallPrompt(accepted: boolean) {
    setShowInstallPrompt(false)
    beforeInstallPromptEvent.current = undefined
    if (!accepted) {
      Cookies.set(pwaInstallDismissedCookie, '1', { expires: 1 })
    } else {
      Cookies.remove(pwaInstallDismissedCookie)
    }
  }

  useEffect(() => {
    if (!enable) return
    function onAppInstalled() {
      //TODO - send to analytics
      console.log('app install')
    }

    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault()
      console.log('before install prompt')
      // Stash the event so it can be triggered later.
      beforeInstallPromptEvent.current = e as BeforeInstallPromptEvent

      //guard: sometimes this event fires when user clicks "cancel" in chrome ui (linux)
      if (!userChoice.current) {
        console.log(
          'before install cookie ',
          Cookies.get(pwaInstallDismissedCookie)
        )
        if (!Cookies.get(pwaInstallDismissedCookie)) {
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
  }, [])

  return [showInstallPrompt, installPWA, hideInstallPrompt] as const
}
