import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'
import classNames from 'classnames'

import Heading from '@instructure/ui-core/lib/components/Heading'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class Message extends Component {
  static propTypes = {
    msg: PropTypes.string.isRequired
  }

  render () {
    const ErrorMessageGuard = (error) => {
      if (error.length <= 0) return null

      return <Heading>{error}</Heading>
    }

    return (
      <div className={classNames(styles.message)}>
        { ErrorMessageGuard(this.props.msg) }
      </div>
    )
  }
}
