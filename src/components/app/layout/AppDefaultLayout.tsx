import { NextApplicationPage } from '../../../pages/_app'
import { AppShellProvider } from '../AppShellProvider'
import { AppShellLayout } from './AppShellLayout'

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
