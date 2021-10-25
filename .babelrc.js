const pkg = require('./package.json')
const { execSync } = require('child_process')
const pkgVersion = `${process.env.PKG_VERSION || pkg.version}`

const buildDate = execSync('git show -s --format=%ci HEAD')
  .toString()
  .replace(/[\r\n]+$/, '')

const commitSha =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  execSync('git rev-parse --short HEAD')
    .toString()
    .replace(/[\r\n]+$/, '')

const branch =
  process.env.VERCEL_GIT_COMMIT_REF ||
  execSync(`git rev-parse --abbrev-ref HEAD`).toString()

const commitMessage =
  process.env.VERCEL_GIT_COMMIT_MESSAGE ||
  execSync(`git log -1 --pretty=%B`).toString()

const plugins = [
  [
    'transform-define',
    {
      __VERSION__: pkgVersion,
      __DEV__: process.env.NODE_ENV !== 'production',
      __BUILD_DATE__: buildDate,
      __COMMIT_SHA__: commitSha,
      __BRANCH__: branch,
      __COMMIT_MESSAGE__: commitMessage
    },
    '@motion/babel-plugin'
  ]
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }])
}

module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': { runtime: 'automatic', importSource: '@emotion/react' }
      }
    ]
  ],
  plugins
}
