import { booleanEnv } from 'lib/utils'

/**
 * Note: Configuration options that should be available in
 * the browser.
 * https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
 *  */

export const enableServiceWorker = booleanEnv(
  process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER,
  false
)

export const enableServiceWorkerReload = booleanEnv(
  process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER_RELOAD,
  false
)

export const enablePWAInstallBanner = booleanEnv(
  process.env.NEXT_PUBLIC_ENABLE_PWA_INSTALL,
  false
)

export const pwaInstallDismissedCookie = 'pwa_install_dissmissed'

export const showAppUpdatedCookie = 'show_app_updated'
