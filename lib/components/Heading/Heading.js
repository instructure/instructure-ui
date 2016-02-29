import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'

import styles from './Heading.css'
import themeVariables from './theme/Heading'
import themeStyles from './theme/Heading.css'

/**
  A Heading component [WIP]

  ```jsx_example
  <Heading>I'm a heading</Heading>
  ```
 **/
@themeable(themeVariables, themeStyles)
export default class Heading extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <h2 className={styles.root}>
        {this.props.children}
      </h2>
    )
  }
}
