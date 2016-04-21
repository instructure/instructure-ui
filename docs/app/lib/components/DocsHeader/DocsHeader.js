import React, {Component} from 'react'

import styles from './DocsHeader.css'

export default class DocsHeader extends Component {
  render () {
    return (
      <h1 className={styles.root} role="banner">
        InstUI
      </h1>
    )
  }
}
