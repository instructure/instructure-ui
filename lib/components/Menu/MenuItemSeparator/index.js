import React, { Component } from 'react'
import themeable from '../../../themeable'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
export default class MenuItemSeparator extends Component {
  render () {
    return (
      <div {...this.props} role="separator" className={styles.root} />
    )
  }
}
