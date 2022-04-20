import { useDebugValue, useEffect, useRef, useState } from 'react'
import { Workbox } from 'workbox-window'
import Cookies from 'js-cookie'

/**
 * Handle registering and reloading website when service worker is updated
 * @param {
 *   path, - service worker path
 *   scope - service worker scope
 * }
 * @returns
 */
export function useServiceWorker({
  path,
  scope,
  enable,
  enableReload,
  updateCookieName
}: {
  path: string
  scope: string
  enable: boolean
  enableReload: boolean
  updateCookieName: string
}) {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const wb = useRef<Workbox>()
  const shouldReload = useRef(false)

  useDebugValue({ enable, enableReload })

  function hideUpdatePrompt() {
    setShowUpdatePrompt(false)
  }

  /* On user click: tell the service worker to skip waiting and activate itself */
  function update() {
    wb.current!.messageSkipWaiting()
    setShowUpdatePrompt(false)
    shouldReload.current = true
  }

  useEffect(() => {
    let worker: Workbox

    /**
     * service worker is waiting to be activated
     * show reload prompt if enabled
     *  */
    function swWaiting() {
      if (enableReload) {
        setShowUpdatePrompt(true)
      }
    }

    /**
     * Service worker has taken the control of the page
     * reload the window
     */
    function swControlling(_evt: any) {
      if (shouldReload.current) {
        Cookies.set(updateCookieName, '1')
        window.location.reload()
      }
    }

    if (enable && 'serviceWorker' in navigator) {
      worker = new Workbox(path, { scope })
      worker.addEventListener('waiting', swWaiting)
      worker.addEventListener('controlling', swControlling)
      worker.register()

      wb.current = worker
    }

    return () => {
      if (worker) {
        worker.removeEventListener('waiting', swWaiting)
        worker.addEventListener('controlling', swControlling)
      }
    }
  }, [path, scope, enable, enableReload, updateCookieName])

  //TODO - better naming
  return [showUpdatePrompt, hideUpdatePrompt, update] as const
}
