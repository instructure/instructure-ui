import React, {Component} from 'react'

import styles from './DocsHeader.css'

import config from 'config!'

export default class DocsHeader extends Component {
  render () {
    const { library } = config
    return (
      <div className={styles.root}>
        <div className={styles.banner} role="banner">
          <h1 className={styles.heading}>
            {library.name}
          </h1>
          <div className={styles.version}>
            v{library.version}
          </div>
        </div>
      </div>
    )
  }
}
