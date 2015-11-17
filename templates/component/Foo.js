import React, { Component, PropTypes } from 'react'
import styles from './Foo.css'

export default class Foo extends Component {
  static propTypes = {
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
