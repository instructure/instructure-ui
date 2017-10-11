import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'

import Button from '../Button'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class Header extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired
  }
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.banner} role="banner">
          <Button href="#index" variant="link">
            <h1 className={styles.heading}>
              {this.props.name}
            </h1>
          </Button>
          <div className={styles.version}>
            v{this.props.version}
          </div>
        </div>
      </div>
    )
  }
}
