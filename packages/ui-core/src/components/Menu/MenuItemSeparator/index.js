import React, { Component } from 'react'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Menu
---
@module MenuItemSeparator
**/
@themeable(theme, styles)
class MenuItemSeparator extends Component {
  render () {
    return (
      <div {...this.props} role="presentation" className={styles.root} />
    )
  }
}

export default MenuItemSeparator
