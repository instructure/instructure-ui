import React, { Component } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import MetricsListItem from './MetricsListItem'

import styles from './MetricsList.css'

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
