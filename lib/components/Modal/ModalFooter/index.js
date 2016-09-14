import React, { Component, PropTypes } from 'react'
import themeable from '../../../util/themeable'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
export default class ModalFooter extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  render () {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    )
  }
}
