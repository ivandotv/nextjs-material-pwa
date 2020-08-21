import { useEffect, useState } from 'react'
import { NextApplicationPage } from '../../../pages/_app'
import { AppShellProvider } from '../AppShellProvider'
import { AppShellLayout } from './AppShellLayout'

export function AppDefaultLayout(Component: NextApplicationPage, props: any) {
  const [showApp, setShowApp] = useState(false)

  useEffect(() => {
    setShowApp(true)
  }, [setShowApp])

  return (
    <AppShellProvider show={showApp}>
      <AppShellLayout
        mobileSidebar={Component.mobileSidebar}
        desktopSidebar={Component.desktopSidebar}
      >
        <Component {...props} />
      </AppShellLayout>
    </AppShellProvider>
  )
}
