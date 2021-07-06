import { useEffect, useRef, useState } from 'react'
import { Workbox } from 'workbox-window'

export function useServiceWorker({
  path,
  scope
}: {
  path: string
  scope: string
}) {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const wb = useRef<Workbox>()

  function hideUpdatePrompt() {
    setShowUpdatePrompt(false)
  }

  // https://github.com/GoogleChrome/workbox/issues/2860
  function swWaiting(_evt: any) {
    console.log('waiting')
    setShowUpdatePrompt(true)
  }

  function swControlling(_evt: any) {
    console.log('controlling')
    window.location.reload()
  }

  // called on user click
  function update() {
    wb.current!.messageSkipWaiting()
    setShowUpdatePrompt(false)
  }

  useEffect(() => {
    let worker: Workbox
    if ('serviceWorker' in navigator) {
      console.log('register workbox')
      worker = new Workbox(path, { scope })
      worker.addEventListener('waiting', swWaiting)
      worker.addEventListener('controlling', swControlling)
      worker.register()
      wb.current = worker
    }

    return () => {
      if (worker) {
        worker.removeEventListener('waiting', swWaiting)
        worker.removeEventListener('controlling', swControlling)
      }
    }
  }, [path, scope])

  //TODO - better naming
  return [showUpdatePrompt, hideUpdatePrompt, update] as const
}
