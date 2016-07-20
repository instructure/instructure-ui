import React, { Component, PropTypes } from 'react'
import { Button as BaseButton } from 'instructure-ui'

export default class Button extends Component {
  static propTypes = {
    theme: PropTypes.object,
    variant: PropTypes.string
  }

  static defaultProps = {
    variant: 'icon'
  }

  render () {
    const color = '#25a19f'
    const theme = {
      icon: {
        color,
        focus: {
          boxShadow: 'inset 0 0 0 1px ' + color
        },
        hover: {
          color: color
        }
      }
    }
    return (
      <BaseButton variant={this.props.variant} theme={theme} {...this.props} />
    )
  }
}
