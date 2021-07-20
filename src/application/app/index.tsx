import React from 'react'
import { BottomNavigation } from 'react-native-paper'

import AppSettings from './settings/AppSettings'
import AppDashboard from './dashboard/AppDashboard'

export default class AppRoutes extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'dashboard', title: 'Home', icon: 'home' },
      { key: 'settings', title: 'Configurações', icon: 'cog' }
    ]
  }

  handleIndex = (index: number) => {
    this.setState({ index })
  }

  render () {
    const renderScene = BottomNavigation.SceneMap({
      settings: () => <AppSettings />,
      dashboard: () => <AppDashboard />
    })

    return (
      <BottomNavigation
        navigationState={{ index: this.state.index, routes: this.state.routes }}
        onIndexChange={this.handleIndex}
        renderScene={renderScene}
      />
    )
  }
}
