import { useEffect, useState } from 'react'

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export default function useAddToHomescreenPrompt(): [
  IBeforeInstallPromptEvent | null,
  () => void,
  boolean
] {
  const [promptable, setPromptable] =
    useState<IBeforeInstallPromptEvent | null>(null)

  const [isInstalled, setIsInstalled] = useState(false)

  const promptToInstall = () => {
    if (promptable) {
      return promptable.prompt()
    }
  }

  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault()
      setPromptable(e)
      console.log('allowed to install')
    }

    window.addEventListener('beforeinstallprompt', ready as any)

    return () => {
      window.removeEventListener('beforeinstallprompt', ready as any)
    }
  }, [])

  useEffect(() => {
    const onInstall = () => {
      setIsInstalled(true)
      console.log('app installed')
    }

    window.addEventListener('appinstalled', onInstall as any)

    return () => {
      window.removeEventListener('appinstalled', onInstall as any)
    }
  }, [])

  return [promptable, promptToInstall, isInstalled]
}
