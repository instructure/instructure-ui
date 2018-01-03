import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'
import classNames from 'classnames'
import Spinner from '@instructure/ui-core/lib/components/Spinner'

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

    const ErrorMessageGuard = (error) => {
      if (!this.props.error) return null

      return <h2>{this.props.error}</h2>
    }

    const LoadingGuard = () => {
      return (
        <div className={classNames(styles.loading)}>
          <Spinner title="Loading" size="large" margin="0 0 0 0" />
        </div>
      )
    }

    return (
      <div className={classNames(styles.message)}>
        {
          ErrorMessageGuard(this.props.error) ||
          LoadingGuard()
        }
      </div>
    )
  }
}
