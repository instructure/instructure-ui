import React, { Component } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import themeable from '../../util/themeable'

import MetricsListItem from './MetricsListItem'

import styles from './styles.css'
import theme from './theme.js'

/**
  The MetricsList component displays metrics (value + label) in rows of at most three.

  ```jsx_example
  <MetricsList>
    <MetricsListItem label="Grade" value="80%" />
    <MetricsListItem label="Late" value="4" />
    <MetricsListItem label="Missing" value="2" />
  </MetricsList>
  ```
 **/
@themeable(theme, styles)
export default class MetricsList extends Component {
  static propTypes = {
    /**
    * children of type `MetricsListItem`
    */
    children: CustomPropTypes.validChildren([MetricsListItem])
  };
  render () {
    return (
      <div className={styles.root} role="grid" aria-readonly="true">
        {this.props.children}
      </div>
    )
  }
}

export { default as MetricsListItem } from './MetricsListItem'
