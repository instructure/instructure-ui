import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class ModalFooter extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: PropTypes.node
  }
  /* eslint-enable react/require-default-props */
  render () {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    )
  }
}
