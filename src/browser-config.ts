import { booleanEnv } from 'lib'

/**
 * Note: Configuration options that should be available in
 * the browser.
 * https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
 *  */

export const serviceWorker = {
  enable: booleanEnv(process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER, false),

  enableReload: booleanEnv(
    process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER_RELOAD,
    false
  )
}
export const enablePWAInstallBanner = booleanEnv(
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
