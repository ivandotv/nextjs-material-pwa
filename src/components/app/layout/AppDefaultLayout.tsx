import { useEffect, useState } from 'react'
import { NextApplicationPage } from '../../../pages/_app'
import { AppShellProvider } from '../AppShellProvider'
import { AppShellLayout } from './AppShellLayout'
import { ThemeQueryComponent } from './ThemeQueryComponent'

export function AppDefaultLayout(Component: NextApplicationPage, props: any) {
  const [showApp, setShowApp] = useState(false)
  const [showQueryTheme, setShowQueryTheme] = useState(false)

  // https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
  useEffect(() => {
    setShowQueryTheme(true)
  }, [])

  return (
    <div style={{ opacity: showApp ? 1 : 0 }}>
      <AppShellProvider>
        {showQueryTheme ? (
          <ThemeQueryComponent setShowApp={setShowApp} />
        ) : null}
        <AppShellLayout
          mobileSidebar={Component.mobileSidebar}
          desktopSidebar={Component.desktopSidebar}
        >
          <Component {...props} />
        </AppShellLayout>
      </AppShellProvider>
    </div>
  )
}
