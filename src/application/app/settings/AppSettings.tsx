import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button as ButtonPaper, Paragraph, Dialog, Portal } from 'react-native-paper'

import theme from '@/services/theme'
import { Button } from '@/components'
import { RootState, connectStore } from '@/store'
import AuthProvider from '@/provider/AuthProvider'

interface AppSettingsState {
  showModal: false
}

interface AppSettingsProps {
  auth: RootState['auth'],
}

class AppSettings extends React.Component<AppSettingsProps> {
  state: AppSettingsState = {
    showModal: false
  }

  authProvider = new AuthProvider()

  handleLogout = () => {
    this.authProvider.logout()
  }

  handleChangeModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    return (
      <View style={styles.container}>
        <Button
          color={theme.colors.error}
          label="Encerrar sessão do usuário"
          onPress={this.handleChangeModal}
        />
        <Portal>
          <Dialog visible={this.state.showModal} onDismiss={this.handleChangeModal}>
            <Dialog.Title>Logout</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Encerrar sessão do usuário e voltar para o login!</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <ButtonPaper color="#000" onPress={this.handleChangeModal}>Cancelar</ButtonPaper>
              <ButtonPaper color={theme.colors.error} onPress={this.handleLogout}>Logout</ButtonPaper>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '20%',
    alignItems: 'center'
  }
})

export default connectStore(state => ({ auth: state.auth }))(AppSettings)
