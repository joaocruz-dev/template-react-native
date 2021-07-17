import { DefaultTheme } from 'react-native-paper'

const theme = <typeof DefaultTheme>{
  ...DefaultTheme,

  dark: false,
  mode: 'exact',

  colors: {
    ...DefaultTheme.colors,

    primary: '#1976D2',

    text: '#000000',
    background: '#FFFFFF'
  }
}

export default theme
