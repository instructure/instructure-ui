import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'
import classNames from 'classnames'

import styles from './styles.css'

@themeable({}, styles)
export default class MediaStreamMessage extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.string
  }
  /* eslint-enable react/require-default-props */

  render () {
    if (this.props.loaded) return null

    return (
      <div className={classNames(styles.message)}>
        <h2>{this.props.error || 'LOADING PLACEHOLDER...'}</h2>
      </div>
    )
  }
}
