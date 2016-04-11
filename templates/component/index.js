import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'

import styles from './${COMPONENT}.css'
import themeVariables from './theme/${COMPONENT}'
import themeStyles from './theme/${COMPONENT}.css'

/**
  A ${COMPONENT} component [WIP]

  ```jsx_example
  <${COMPONENT} />
  ```
**/
@themeable(themeVariables, themeStyles)
export default class ${COMPONENT} extends Component {
  static propTypes = {
    /**
    * description of replaceMe prop
    */
    replaceMe: PropTypes.string
  };

  static defaultProps = {
    replaceMe: 'hello world'
  };

  render () {
    return (
      <div className={styles.root}>
        Hello World
      </div>
    )
  }
}
