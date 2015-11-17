import React, { Component, PropTypes } from 'react'
import styles from './Foo.css'

/**
 * A Foo component
 *
 * ```jsx
 * <Foo />
 * ```
 */
export default class Foo extends Component {
  static propTypes = {
    /**
    * description of bar prop
    */
    bar: PropTypes.string
  }

  static defaultProps = {
    bar: 'hello world'
  }

  render () {
    return (
      <div className={styles.root}>

      </div>
    )
  }
}
