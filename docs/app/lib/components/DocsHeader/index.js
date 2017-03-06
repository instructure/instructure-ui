import React, {Component} from 'react'

import styles from './styles.css'

import config from 'config-loader!'

export default class DocsHeader extends Component {
  render () {
    const { pkg } = config
    return (
      <div className={styles.root}>
        <div className={styles.banner} role="banner">
          <a href="#index" className={styles.headingLink}>
            <h1 className={styles.heading}>
              {pkg.name}
            </h1>
          </a>
          <h2 className={styles.version}>
            v{pkg.version}
          </h2>
        </div>
      </div>
    )
  }
}
