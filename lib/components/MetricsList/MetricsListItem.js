import React, { Component, PropTypes } from 'react'
import styles from './MetricsListItem.css'

export default class MetricsListItem extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }

  render () {
    return (
      <div role="row" className={styles.root}>
        <div role="gridcell" className={styles.value}>
          { this.props.value }
        </div>
        <div role="rowheader" className={styles.label}>
          { this.props.label }
        </div>
      </div>
    )
  }
}
