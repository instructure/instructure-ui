import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'
import classNames from 'classnames'

import styles from './styles.css'

@themeable({}, styles)
export default class Message extends Component {
  static propTypes = {
    msg: PropTypes.string.isRequired
  }

  render () {
    const ErrorMessageGuard = (error) => {
      if (error.length <= 0) return null

      return <h2>{error}</h2>
    }

    return (
      <div className={classNames(styles.message)}>
        { ErrorMessageGuard(this.props.msg) }
      </div>
    )
  }
}
