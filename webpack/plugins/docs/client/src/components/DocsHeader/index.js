import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

import { library } from '../DocsApp/propTypes'

export default class DocsHeader extends Component {
  static contextTypes = {
    library
  }
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.banner} role="banner">
          <a href="#index" className={styles.headingLink}>
            <h1 className={styles.heading}>
              {this.context.library.packageName}
            </h1>
          </a>
          <h2 className={styles.version}>
            v{this.context.library.version}
          </h2>
        </div>
      </div>
    )
  }
}
