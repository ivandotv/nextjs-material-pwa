// @ts-check
const withPlugins = require('next-compose-plugins')
const withWorkbox = require('./workbox.webpack.config')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next/dist/server/config').NextConfig}*/
const nextConfig = {
  // reactStricMode: true,
  workbox: {
    disable: process.env.NODE_ENV !== 'production',
    swSrc: 'src/service-worker/sw.ts',
    swDest: 'sw.js' // inside public dir path
  }
}

module.exports = withPlugins([withBundleAnalyzer, withWorkbox], nextConfig)
