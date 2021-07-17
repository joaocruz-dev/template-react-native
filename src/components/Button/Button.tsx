import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import theme from '@/services/theme'

interface ButtonProps extends RectButtonProps {
  title: string,
  color?: string,
  textColor?: string
}

export default class Button extends React.Component<ButtonProps> {
  static propTypes = {
    color: PropTypes.string,
    textColor: PropTypes.string,
    title: PropTypes.string.isRequired
  }

  static defaultProps = {
    textColor: 'white',
    color: theme.colors.primary
  }

  render () {
    return (
      <View style={styles.container}>
        <RectButton
          {...this.props}
          style={[styles.button, { backgroundColor: this.props.color }, this.props.style || {}]}
        >
          <Text style={[styles.title, { color: this.props.textColor }]}>
            {this.props.title}
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
  title: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center'
  }
})
