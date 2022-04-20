import { useDebugValue, useEffect, useState } from 'react'

/**
 * Notify when the browser is offline
 */
export function useOfflineNotification() {
  const [isOnline, setIsOnline] = useState(true)

  useDebugValue({ isOnline })

  useEffect(() => {
    function setOnline() {
      setIsOnline(true)
    }

    function setOffline() {
      setIsOnline(false)
    }

    if ('onLine' in window.navigator) {
      setIsOnline(window.navigator.onLine)

      window.addEventListener('offline', setOffline)
      window.addEventListener('online', setOnline)
    }

    return () => {
      if ('onLine' in window.navigator) {
        window.removeEventListener('offline', setOffline)
        window.removeEventListener('online', setOnline)
      }
    }
  }, [])

  return [isOnline] as const
}
