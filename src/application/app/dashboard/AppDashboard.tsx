import React from 'react'
import { Title } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'

import { RootState, connectStore } from '@/store'

interface AppDashboardProps {
  auth: RootState['auth']
}

class AppDashboard extends React.Component<AppDashboardProps> {
  render () {
    return (
      <View style={styles.container}>
        <Title>{'Olá ' + this.props.auth.user?.name}</Title>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default connectStore(state => ({ auth: state.auth }))(AppDashboard)
