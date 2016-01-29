import React, { Component } from 'react'
import { Tab as ReactTab } from 'react-tabs'
import styles from './Tab.css'

export default class Tab extends Component {
  render () {
    return <ReactTab className={styles.root} {...this.props} />
  }
}
