import React, {Component} from 'react'

/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/no-webpack-loader-syntax,
  import/extensions */
import config from 'config-loader!'
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved, import/no-webpack-loader-syntax,
  import/extensions */

import styles from './styles.css'

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
