import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { View, StyleSheet } from 'react-native'

import { Login } from '@/domain'
import LogoSvg from '@/assets/logo.svg'
import { Input, Button } from '@/components'
import AuthProvider from '@/provider/AuthProvider'
import { setLoadingFn, showMessageFn } from '@/store/layout'
import { RootState, RootDispatch, connectStore } from '@/store'

const loginSchema = Yup.object().shape({
  login: Yup.string().required('Campo obrigatório.').email('Email inválido.'),
  password: Yup.string().required('Campo obrigatório.').min(8, 'Senha deve conter 8 ou mais caracteres.')
})

interface AuthLoginProps {
  dispatch: RootDispatch,
  auth: RootState['auth']
}

class AuthLogin extends React.Component<AuthLoginProps> {
  state = {
    isNewUser: true,
    login: new Login()
  }

  authProvider = new AuthProvider()

  async componentDidMount () {
    this.props.dispatch(setLoadingFn(true))
    try {
      const login = await this.authProvider.getUser()
      if (login) {
        this.state.login.login = login
        this.setState({ login: this.state.login, isNewUser: false })
      }
    } finally {
      this.props.dispatch(setLoadingFn(false))
    }
  }

  handleLogin = async (login: Login) => {
    this.props.dispatch(setLoadingFn(true))
    try {
      const message = await this.authProvider.login(login)
      this.props.dispatch(showMessageFn({ text: message }))
    } catch (error) {
      this.props.dispatch(showMessageFn({ text: error.message }))
    } finally {
      this.props.dispatch(setLoadingFn(false))
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <LogoSvg width="100%" />
        </View>
        <Formik
          validationSchema={loginSchema}
          initialValues={this.state.login}
          onSubmit={this.handleLogin}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <>
              <Input
                label="Email"
                type="email"
                value={values.login}
                disabled={!this.state.isNewUser}
                error={touched.login && errors.login}
                onBlur={handleBlur('login')}
                onChangeText={handleChange('login')}
              />
              <Input
                label="Senha"
                type="password"
                value={values.password}
                error={touched.password && errors.password}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
              />
              <Button label="Entrar" onPress={() => handleSubmit()} />
            </>
          )}
        </Formik>
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
    width: '60%'
  }
})

export default connectStore(state => ({ auth: state.auth }))(AuthLogin)
