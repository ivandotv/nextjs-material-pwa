/// <reference lib="es2017" />
/// <reference lib="WebWorker" />
import { ExpirationPlugin } from 'workbox-expiration'
import {
  cleanupOutdatedCaches,
  precacheAndRoute,
  PrecacheFallbackPlugin
} from 'workbox-precaching'
import {
  googleFontsCache,
  imageCache,
  staticResourceCache
} from 'workbox-recipes'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'

// export {}

declare const self: ServiceWorkerGlobalScope

//optionally disable debug logging
// @ts-expect-error - type missing
self.__WB_DISABLE_DEV_LOGS = false

//optionally disable debug logging
// @ts-expect-error - type missing
self.__WB_DISABLE_DEV_LOGS = false

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

staticResourceCache()

imageCache()

googleFontsCache()
/**
 * Next.js dynamic data (json)
 *  */
registerRoute(
  /\/_next\/data\/.+\/.+\.json$/i,
  new StaleWhileRevalidate({
    cacheName: 'next-data',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 120,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
        purgeOnQuotaError: true
      })
    ]
  })
)

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    plugins: [
      new PrecacheFallbackPlugin({ fallbackURL: 'offline/offline.html' })
    ]
  })
)

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
