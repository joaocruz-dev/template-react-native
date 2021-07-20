import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, Appbar } from 'react-native-paper'
import { TextInput as TextInputNative, TextInputProps, View, Text, StyleSheet } from 'react-native'

import theme from '@/services/theme'

interface InputProps extends TextInputProps {
  type?: 'text' | 'email' | 'password',
  label: string,
  value: string,
  error?: string | boolean,
  disabled?: boolean,
  selectionColor?: string
}

export default class Input extends React.Component<InputProps> {
  static propTypes = {
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    disabled: PropTypes.bool
  }

  static defaultProps = {
    type: 'text',
    error: false,
    disabled: false
  }

  state = {
    isVisible: false
  }

  get keyboardType (): InputProps['keyboardType'] {
    if (this.props.type === 'email') return 'email-address'
    return 'default'
  }

  get textContentType (): InputProps['textContentType'] {
    if (this.props.type === 'email') return 'emailAddress'
    if (this.props.type === 'password') return 'password'
    return 'none'
  }

  get secureTextEntry (): InputProps['secureTextEntry'] {
    if (this.props.type === 'password' && !this.state.isVisible) return true
    return false
  }

  get autoCompleteType (): InputProps['autoCompleteType'] {
    if (this.props.type === 'email') return 'email'
    if (this.props.type === 'password') return 'password'
    return 'off'
  }

  renderInput = (props: any) => {
    return (
      <View style={styles.inputContainer}>
        <TextInputNative {...props} />
        {this.props.type === 'password' &&
          <Appbar.Action icon={this.state.isVisible ? 'eye' : 'eye-off'} onPress={this.handleVisible} />}
      </View>
    )
  }

  handleVisible = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          keyboardType={this.keyboardType}
          textContentType={this.textContentType}
          secureTextEntry={this.secureTextEntry}
          autoCompleteType={this.autoCompleteType}
          {...this.props}
          error={typeof this.props.error === 'string'}
          style={[styles.input, this.props.style]}
          render={this.renderInput}
        />
        {this.props.error &&
          <Text style={styles.error}>{this.props.error}</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    width: '100%',
    paddingHorizontal: '8%'
  },
  input: {
    width: '100%'
  },
  error: {
    marginTop: 4,
    marginLeft: 4,
    color: theme.colors.error
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})
