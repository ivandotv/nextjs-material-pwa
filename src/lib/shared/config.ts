import { toBoolean } from 'lib/shared/utils'

/**
 * Note: Configuration options that can be used both on the client and on the server
 * https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
 *  */

export const serviceWorker = {
  enable: toBoolean(process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER, false),

  enableReload: toBoolean(
    process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER_RELOAD,
    false
  )
}
export const enablePWAInstallBanner = toBoolean(
  process.env.NEXT_PUBLIC_ENABLE_PWA_INSTALL,
  false
)

export const cookies = {
  pwaInstallDismissed: {
    name: 'pwa_install_dissmissed'
  },
  showAppUpdated: {
    name: 'show_app_updated'
  },
  slideshowShown: {
    name: 'slideshow_shown'
  }
}

export const themeStorageKey = 'theme'
