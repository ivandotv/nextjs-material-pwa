import { NextApplicationPage } from 'pages/_app'
import { AppShellProvider } from 'components/providers/AppShellProvider'
import { AppShellLayout } from 'components/layout/AppShellLayout'

export function AppDefaultLayout(Component: NextApplicationPage, props: any) {
  return (
    <AppShellProvider>
      <AppShellLayout
        mobileSidebar={Component.mobileSidebar}
        desktopSidebar={Component.desktopSidebar}
      >
        <Component {...props} />
      </AppShellLayout>
    </AppShellProvider>
  )
}
