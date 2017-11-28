import React, { Component } from 'react'

import PropTypes from 'prop-types'

import Media from '../Media'
import Controller from '../Controller'

export default class MediaCapture extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * Callback fired when a file has been generated.
     */
    onCompleted: PropTypes.func.isRequired,
    /**
     * Callback fired when the component is closed for a reason
     * other than generating a file. Includes the last
     * emitted state when the action was taken.
     */
    onCancel: PropTypes.func,
    /**
     * Callback fired when the component is closed. Includes
     * the last emitted state when the action was taken.
     */
    onClose: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  render () {
    return (
      <div>
        <Media />
        <Controller />
      </div>
    )
  }
}
