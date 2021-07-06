const withPlugins = require('next-compose-plugins')
const withWorkbox = require('./workbox.webpack.config')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {
  workbox: {
    // disable: process.env.NODE_ENV !== 'production',
    disable: false,
    swSrc: 'src/service-worker/sw.ts',
    swDest: 'sw.js' // inside public dir path
  }
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'Service-Worker-Allowed',
  //           value: '/'
  //         }
  //       ]
  //     }
  //   ]
  // }
}

module.exports = withPlugins([withBundleAnalyzer, withWorkbox], nextConfig)
