import React from 'react'
import { View, StyleSheet } from 'react-native'

import { loginFn } from '@/store/auth'
import { Login, User } from '@/domain'
import { Input, Button } from '@/components'
import { setLoadingFn } from '@/store/layout'
import LogoSvg from '@/assets/earthtechnollogy.svg'
import { RootState, RootDispatch, connectStore } from '@/store'

interface AuthLoginProps {
  dispatch: RootDispatch,
  auth: RootState['auth']
}

class AuthLogin extends React.Component<AuthLoginProps> {
  state = {
    login: new Login()
  }

  handleLogin = () => {
    this.props.dispatch(setLoadingFn(true))

    setTimeout(() => {
      const user = new User(null, 'Convidado', this.state.login.email)

      this.props.dispatch(loginFn({ user: JSON.parse(JSON.stringify(user)) }))
      this.props.dispatch(setLoadingFn(false))
    }, 750)
  }

  handleChangeLogin = (name: keyof Login, value: string) => {
    this.state.login[name] = value
    this.setState({ login: this.state.login })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <LogoSvg width="100%" />
        </View>
        <Input
          label="Email"
          value={this.state.login.email}
          onChangeText={value => this.handleChangeLogin('email', value)}
        />
        <Input
          label="Senha"
          value={this.state.login.password}
          onChangeText={value => this.handleChangeLogin('password', value)}
        />
        <Button title="Entrar" onPress={this.handleLogin} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    margin: 16,
    width: '60%'
  }
})

export default connectStore(state => ({ auth: state.auth }))(AuthLogin)
