const pkg = require('./package.json')

const pkgVersion = process.env.PKG_VERSION || pkg.version

module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['inline-react-svg'],
    [
      'transform-define',
      {
        __VERSION__: pkgVersion,
        __DEV__: process.env.NODE_ENV !== 'production'
      }
    ]
  ]
}
