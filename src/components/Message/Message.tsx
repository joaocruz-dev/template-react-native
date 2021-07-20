import React from 'react'
import { Snackbar } from 'react-native-paper'

import { hideMessageFn } from '@/store/layout'
import { RootState, RootDispatch, connectStore } from '@/store'

interface MessageProps {
  dispatch: RootDispatch,
  layout: RootState['layout']
}

class Message extends React.Component<MessageProps> {
  handleDismiss = () => {
    this.props.dispatch(hideMessageFn())
  }

  render () {
    return (
      <Snackbar
        visible={this.props.layout.message.show}
        duration={this.props.layout.message.duration || 7000}
        onDismiss={this.handleDismiss}
        action={{ label: 'Fechar', onPress: this.handleDismiss }}
      >
        {this.props.layout.message.text}
      </Snackbar>
    )
  }
}

export default connectStore(state => ({ layout: state.layout }))(Message)
