import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import theme from '@/services/theme'
import AppRoutes from '@/application/app'
import AuthRoutes from '@/application/auth'
import { RootState, connectStore } from '@/store'

interface RouterProps {
  store: RootState
}

class Router extends React.Component<RouterProps> {
  render () {
    if (this.props.store.layout.loading) return <ActivityIndicator style={styles.indicator} color={theme.colors.primary} size={80} />

    return (
      <NavigationContainer>
        {this.props.store.auth.isAuth ? AppRoutes : AuthRoutes}
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1
  }
})

export default connectStore(store => ({ store }))(Router)
