import React, { Component } from 'react'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class MenuItemSeparator extends Component {
  render () {
    return (
      <li {...this.props} role="separator" className={styles.root} />
    )
  }
}
