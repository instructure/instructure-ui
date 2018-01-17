import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: MetricsList
---
**/
@themeable(theme, styles)
export default class MetricsListItem extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }
  /* eslint-enable react/require-default-props */

  render () {
    const {
      textAlign
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[textAlign]]: textAlign
    }

    return (
      <div
        role="row"
        className={classnames(classes)}
      >
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
