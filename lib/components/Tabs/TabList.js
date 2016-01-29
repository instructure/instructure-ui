import React, { Component } from 'react'
import { TabList as ReactTabList } from 'react-tabs'
import styles from './TabList.css'

export default class TabList extends Component {
  render () {
    return <ReactTabList className={styles.root} {...this.props} />
  }
}
