window.addEventListener('online', () => {
  console.log('is online')
  window.clearInterval(checkNetworkInterval)
  window.location.reload()
})

async function checkNetwork() {
  try {
    const response = await fetch('./')
    console.log('check network')
    if (response.status >= 200 && response.status < 500) {
      console.log('check network - reload')
      window.clearInterval(checkNetworkInterval)
      window.location.reload()
    }
    // eslint-disable-next-line no-empty
  } catch (e) {
    //ignore erro
  }
}

const checkNetworkInterval = window.setInterval(checkNetwork, 2000)
