import { AppShell } from 'components/layout'
import { AppShellProvider } from 'components/providers/AppShellProvider'
import { NextApplicationPage } from 'pages/_app'

export function AppLayout(Component: NextApplicationPage, props: any) {
  return (
    <AppShellProvider>
      <AppShell
        mobileSidebar={Component.mobileSidebar}
        desktopSidebar={Component.desktopSidebar}
      >
        <Component {...props} />
      </AppShell>
    </AppShellProvider>
  )
}
