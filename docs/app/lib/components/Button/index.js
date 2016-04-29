import React, { Component, PropTypes } from 'react'
import { Button as BaseButton } from 'instructure-ui'

export default class Button extends Component {
  static propTypes = {
    theme: PropTypes.object
  };

  render () {
    const color = '#239EBD'
    const theme = {
      linkTextColor: color,
      linkFocusOutlineColor: color,
      ...this.props.theme
    }
    return (
      <BaseButton style="link" theme={theme} {...this.props} />
    )
  }
}
