import React, { Component, PropTypes } from 'react'
import { Button as BaseButton } from 'instructure-ui'

export default class Button extends Component {
  static propTypes = {
    theme: PropTypes.object
  };

  render () {
    const color = '#25a19f'
    const theme = {
      linkTextColor: color,
      linkFocusOutlineColor: color,
      ...this.props.theme
    }
    return (
      <BaseButton variant="link" theme={theme} {...this.props} />
    )
  }
}
