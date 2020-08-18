module.exports = {
  env: {
    // commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  globals: {
    __DEV__: true,
    __VERSION__: true
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'standard'],
  extends: [
    'prettier/standard',
    'standard',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: './tsconfig.eslint.json',
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
    // '@typescript-eslint/explicit-function-return-type': [
    //   'error',
    //   {
    //     allowExpressions: true,
    //     allowTypedFunctionExpressions: true
    //   }
    // ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public'
      }
    ],
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
