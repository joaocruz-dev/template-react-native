import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import theme from '@/services/theme'
import AuthLogin from './login/AuthLogin'

const { Navigator, Screen } = createStackNavigator()

const AuthRoutes = (
  <Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: theme.colors.background
      }
    }}
  >
    <Screen name="auth/login" component={AuthLogin} />
  </Navigator>
)

export default AuthRoutes
