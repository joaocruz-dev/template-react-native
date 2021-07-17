module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'standard-jsx',
    'standard-react'
  ],
  rules: {
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'react/no-direct-mutation-state': 'off',
    'jsx-quotes': ['error', 'prefer-double']
  }
}
