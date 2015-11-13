import React, { Component, PropTypes } from 'react'
import styles from './Heading.css'

/**
  A Heading component [WIP]

  ```jsx_example
  <Heading>I'm a heading</Heading>
  ```
 **/
export default class Heading extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    return (
      <h2 className={styles.root}>
        {this.props.children}
      </h2>
    )
  }
}
