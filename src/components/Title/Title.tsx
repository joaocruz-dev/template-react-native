import React from 'react'
import PropTypes from 'prop-types'
import { Text, TextProps, StyleSheet } from 'react-native'

import theme from '@/services/theme'

interface TitleProps extends TextProps {
  color?: string,
  children: string
}

export default class Title extends React.Component<TitleProps> {
  static propTypes = {
    color: PropTypes.string,
    children: PropTypes.string.isRequired
  }

  static defaultProps = {
    color: theme.colors.text
  }

  render () {
    return (
      <Text
        {...this}
        style={[styles.title, { color: this.props.color }]}
      >
        {this.props.children}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: '700'
  }
})
