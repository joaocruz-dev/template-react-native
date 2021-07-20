import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import theme from '@/services/theme'

interface ButtonProps extends RectButtonProps {
  label: string,
  color?: string,
  textColor?: string
}

export default class Button extends React.Component<ButtonProps> {
  static propTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
    textColor: PropTypes.string
  }

  static defaultProps = {
    color: theme.colors.primary,
    textColor: 'white'
  }

  render () {
    return (
      <View style={styles.container}>
        <RectButton
          {...this.props}
          style={[styles.button, { backgroundColor: this.props.color }, this.props.style]}
        >
          <Text style={[styles.label, { color: this.props.textColor }]}>
            {this.props.label}
          </Text>
        </RectButton>
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
  button: {
    padding: 16,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row'
  },
  label: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center'
  }
})
