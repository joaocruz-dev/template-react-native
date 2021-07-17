module.exports = {
  presets: ['babel-preset-expo'],
  env: {
    production: {
      plugins: ['react-native-paper/babel']
    }
  },
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        alias: { '@': './src' }
      }
    ]
  ]
}
