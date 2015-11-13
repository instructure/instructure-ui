import React, { Component, PropTypes } from 'react'

import styles from './MetricsList.css'

/**
  The MetricsList component displays metrics (value + label) in rows of at most three.

  ```jsx_example
  <MetricsList>
    <MetricsList.MetricsListItem label="Grade" value="80%" />
    <MetricsList.MetricsListItem label="Late" value="4" />
    <MetricsList.MetricsListItem label="Missing" value="2" />
  </MetricsList>
  ```
 **/
export default class MetricsList extends Component {
  static propTypes = {
    /**
    * MetricsListItem components
    */
    children: PropTypes.node.isRequired
  }
  // TODO: only allow MetricListItem children
  render () {
    return (
      <div className={styles.root} role="grid" aria-readonly="true">
        {this.props.children}
      </div>
    )
  }
}
