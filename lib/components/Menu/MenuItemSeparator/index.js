import React, { Component } from 'react'

import themeable from '../../../util/themeable'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
export default class MenuItemSeparator extends Component {
  render () {
    return (
      <li {...this.props} role="separator" className={styles.root} />
    )
  }
}
