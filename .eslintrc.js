module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true
  },
  globals: {
    __DEV__: true,
    __VERSION__: true,
    __COMMIT_SHA__: true,
    __BUILD_DATE__: true,
    __BRANCH__: true,
    __COMMIT_MESSAGE__: true,
    ServiceWorkerGlobalScope: true,
    BeforeInstallPromptEvent: true,
    JSX: true
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: ['eslint:recommended', 'next/core-web-vitals', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    'generator-star-spacing': ['error', { before: false, after: true }],
    'space-before-function-paren': 'off',
    'no-dupe-class-members': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    'prettier/prettier': ['error'],
    'lines-between-class-members': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' }
    ],
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
    ]
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ]
}
