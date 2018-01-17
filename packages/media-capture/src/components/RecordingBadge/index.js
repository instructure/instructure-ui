import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'

import Timer from '../Timer'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class RecordingBadge extends Component {
  render () {
    return (
      <div className={styles.badge}>
        <div className={styles.signal} />
        <Timer />
      </div>
    )
  }
}
