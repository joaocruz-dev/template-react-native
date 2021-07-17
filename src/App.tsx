import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import { StatusBar } from 'react-native'
// import AppLoading from 'expo-app-loading'

import { store } from '@/store'
import theme from '@/services/theme'
import Router from '@/router/Router'

export default class App extends React.Component {
  render () {
    return (
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Router />
        </PaperProvider>
      </ReduxProvider>
    )
  }
}
