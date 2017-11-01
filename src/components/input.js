import React from 'react'
import isFunction from 'lodash/isFunction'
import omit from 'lodash/omit'

import MUIInput from 'material-ui/Input'


const noop = () => {}


export default class Input extends React.Component {
  static defaultProps = {
    onChange: noop,
    onStopTyping: noop,
    onStopTypingThreshhold: 200,
  }

  handleChange = (event) => {
    const {
      onChange,
      onStopTyping,
      onStopTypingThreshhold,
    } = this.props
    clearTimeout(this.timeout)
    const value = event.target.value
    onChange(value)

    if (onStopTyping !== noop
        && isFunction(onStopTyping)) {
      this.timeout = setTimeout(() => {
        onStopTyping(value)
      }, onStopTypingThreshhold)
    }
  }

  render () {
    const props = omit(this.props, ['onStopTyping', 'onStopTypingThreshhold'])
    return <MUIInput {...props} onChange={this.handleChange} />
  }
}
