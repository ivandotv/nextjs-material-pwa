export function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  if (document.referrer.startsWith('android-app://')) {
    return 'twa' // android trusted web activity
    // @ts-expect-error -iOS Safari only
  } else if (navigator.standalone || isStandalone) {
    return 'standalone'
  }

  return 'browser'
}
