import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseButton from '@instructure/ui-core/lib/components/Button'

export default class Button extends Component {
  static propTypes = {
    theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    variant: PropTypes.string
  }

  static defaultProps = {
    variant: 'icon',
    theme: {}
  }

  focus () {
    this._button.focus()
  }

  render () {
    const color = '#008ee2'
    return (
      <BaseButton
        {...this.props}
        ref={(c) => { this._button = c }}
        variant={this.props.variant}
        theme={{
          iconColor: color,
          iconFocusBoxShadow: `inset 0 0 0 1px ${color}`,
          iconHoverColor: color
        }}
      />
    )
  }
}
