/**
 *  Modified webpack + workbox script
 *  from: https://github.com/cansin/next-with-workbox
 * */
const path = require('path')
const crypto = require('crypto')

const glob = require('glob')
const WorkboxPlugin = require('workbox-webpack-plugin')

const getRevision = (file) =>
  crypto.createHash('md5').update(Buffer.from(file)).digest('hex')

function withWorkbox(nextConfig = {}) {
  return {
    ...nextConfig,
    webpack(config, options) {
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options)
      }

      const {
        dev,
        isServer,
        config: {
          workbox: {
            additionalManifestEntries = [],
            dest = 'public',
            dontCacheBustURLsMatching = false,
            exclude = [],
            disable = false,
            modifyURLPrefix = {},
            swDest = 'sw.js',
            swSrc = false,
            ...workboxOptions
          } = {}
        }
      } = options

      if (!swSrc) {
        throw new Error('service worker path missing')
      }
      if (isServer) {
        return config
      }

      if (disable) {
        console.log('> Progressive web app  is disabled')

        return config
      }

      const swDestPath = path.join(options.dir, dest, swDest)

      console.log('> Compiling progressive web app')
      console.log(`> Service worker destination path: "${swDestPath}"`)

      const defaultDontCacheBustURLsMatching = /^\/_next\/static\/.*/iu
      const defaultWorkboxOptions = {
        swDest: swDestPath,
        dontCacheBustURLsMatching: dontCacheBustURLsMatching
          ? new RegExp(
              `${dontCacheBustURLsMatching.source}|${defaultDontCacheBustURLsMatching.source}`,
              'iu'
            )
          : defaultDontCacheBustURLsMatching,
        additionalManifestEntries: glob
          .sync('**/*', {
            cwd: dest,
            nodir: true
          })
          .filter((f) => f.indexOf(swDest) !== 0)
          .map((f) => ({
            url: `/${f}`,
            revision: getRevision(`public/${f}`)
          }))
          .concat(additionalManifestEntries),
        exclude: [
          /^build-manifest\.json$/i,
          /^react-loadable-manifest\.json$/i,
          /\/_error\.js$/i,
          /\.js\.map$/i,
          ...exclude
        ],
        modifyURLPrefix: {
          [`${config.output.publicPath || ''}static/`]: '/_next/static/',
          ...modifyURLPrefix
        }
      }

      const swSrcPath = path.join(options.dir, swSrc)
      console.log(`> Service worker source path: "${swSrcPath}"`)
      console.log('> Using "WorkboxPlugin.InjectManifest"')
      config.plugins.push(
        new WorkboxPlugin.InjectManifest({
          swSrc: swSrcPath,
          ...defaultWorkboxOptions,
          ...workboxOptions
        })
      )

      return config
    }
  }
}

module.exports = withWorkbox
