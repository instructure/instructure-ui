import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class MetricsListItem extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  render () {
    return (
      <div role="row" className={styles.root}>
        <div role="rowheader" className={styles.label}>
          {this.props.label}
        </div>
        <div role="gridcell" className={styles.value}>
          {this.props.value}
        </div>
      </div>
    )
  }
}
