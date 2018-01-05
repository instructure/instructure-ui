import React, { Component } from 'react'
import themeable from '@instructure/ui-themeable'
import classNames from 'classnames'
import Spinner from '@instructure/ui-core/lib/components/Spinner'

import styles from './styles.css'

@themeable({}, styles)
export default class Loading extends Component {
  render () {
    return (
      <div className={classNames(styles.loading)}>
        <Spinner title="Loading" size="large" margin="0 0 0 0" />
      </div>
    )
  }
}
