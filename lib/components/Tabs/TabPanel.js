import React, { Component } from 'react'
import { TabPanel as ReactTabPanel } from 'react-tabs'
import styles from './TabPanel.css'

export default class TabPanel extends Component {
  render () {
    return <ReactTabPanel className={styles.root} {...this.props} />
  }
}
