import React, { Component, PropTypes } from 'react'
import { default as BaseButton } from 'instructure-ui/lib/components/Button'

export default class Button extends Component {
  static propTypes = {
    theme: PropTypes.object,
    variant: PropTypes.string
  }

  static defaultProps = {
    variant: 'icon'
  }

  render () {
    const color = '#008ee2'
    const theme = {
      iconColor: color,
      iconFocusBoxShadow: 'inset 0 0 0 1px ' + color,
      iconHoverColor: color
    }
    return (
      <BaseButton variant={this.props.variant} theme={theme} {...this.props} />
    )
  }
}
