import React, { Component } from 'react'

import themeable from '../../util/themeable'

import styles from './MenuItemSeparator.css'
import themeVariables from './theme/MenuItemSeparator'
import themeStyles from './theme/MenuItemSeparator.css'

@themeable(themeVariables, themeStyles)
export default class MenuItemSeparator extends Component {
  render () {
    return (
      <li {...this.props} role="separator" className={styles.root}></li>
    )
  }
}
