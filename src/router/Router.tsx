import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import theme from '@/services/theme'
import { Message } from '@/components'
import AppRoutes from '@/application/app'
import AuthRoutes from '@/application/auth'
import { RootState, connectStore } from '@/store'

interface RouterProps {
  store: RootState
}

class Router extends React.Component<RouterProps> {
  render () {
    return (
      <NavigationContainer>
        {this.props.store.layout.loading &&
          <ActivityIndicator style={styles.indicator} color={theme.colors.primary} size={80} />}
        {this.props.store.auth.isAuth ? <AppRoutes /> : AuthRoutes}
        <Message />
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  indicator: {
    height: '100%'
  }
})

export default connectStore(store => ({ store }))(Router)
