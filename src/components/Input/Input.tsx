import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native-paper'
import { View, TextInputProps, StyleSheet } from 'react-native'

interface InputProps extends TextInputProps {
  label: string
  disabled?: boolean
}

export default class Input extends React.Component<InputProps> {
  static propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    disabled: false
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          {...this}
          label={this.props.label}
          disabled={this.props.disabled}
          style={[styles.input, this.props.style || {}]}
        />
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
  }
})
