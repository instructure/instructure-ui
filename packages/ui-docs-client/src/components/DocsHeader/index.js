import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-core/lib/themeable'

import Button from '../Button'

import { library } from '../DocsApp/propTypes'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class DocsHeader extends Component {
  static contextTypes = {
    library
  }
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.banner} role="banner">
          <Button href="#index">
            <h1 className={styles.heading}>
              {this.context.library.name}
            </h1>
          </Button>
          <h2 className={styles.version}>
            v{this.context.library.version}
          </h2>
        </div>
      </div>
    )
  }
}
