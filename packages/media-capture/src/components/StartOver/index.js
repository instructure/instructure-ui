import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@instructure/ui-core/lib/components/Button'
import IconResetSolid from 'instructure-icons/lib/Solid/IconResetSolid'

export default class StartOver extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      startoverClicked: PropTypes.func.isRequired
    }).isRequired
  }

  static defaultProps = {
    actions: {
      startoverClicked: () => {}
    }
  }

  render () {
    const { actions } = this.props

    // needs i18n
    return (
      <Button onClick={actions.startoverClicked} variant="light">
        <IconResetSolid />
        Start Over
      </Button>
    )
  }
}
