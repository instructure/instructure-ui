import React, {Component} from 'react'

import styles from './DocsHeader.css'

import config from 'config!'

export default class DocsHeader extends Component {
  render () {
    const { library } = config
    return (
      <div className={styles.root}>
        <div className={styles.banner} role="banner">
          <a href="/" className={styles.headingLink}>
            <h1 className={styles.heading}>
              {library.name}
            </h1>
          </a>
          <h2 className={styles.version}>
            v{library.version}
          </h2>
        </div>
      </div>
    )
  }
}
