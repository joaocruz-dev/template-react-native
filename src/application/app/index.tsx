import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import theme from '@/services/theme'
import AppDashboard from './dashboard/AppDashboard'

const { Navigator, Screen } = createStackNavigator()

const AppRoutes = (
  <Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: theme.colors.background
      }
    }}
  >
    <Screen name="app/dashboard" component={AppDashboard} />
  </Navigator>
)

export default AppRoutes
