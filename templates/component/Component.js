import React, { Component, PropTypes } from 'react'
import styles from './${COMPONENT}.css'

/**
 * A ${COMPONENT} component
 *
 * ```jsx_example
 * <${COMPONENT} />
 * ```
 */
export default class ${COMPONENT} extends Component {
  static propTypes = {
    /**
    * description of replaceMe prop
    */
    replaceMe: PropTypes.string
  }

  static defaultProps = {
    replaceMe: 'hello world'
  }

  render () {
    return (
      <div className={styles.root}>

      </div>
    )
  }
}
