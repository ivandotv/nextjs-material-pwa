import { NextApplicationPage } from 'pages/_app'
import { AppShellProvider } from 'components/providers/AppShellProvider'
import { AppShell } from 'components/layout/AppShell'

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
