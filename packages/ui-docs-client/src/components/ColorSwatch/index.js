import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { isValid } from '@instructure/ui-core/lib/util/color'
import themeable from '@instructure/ui-core/lib/themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class ColorSwatch extends Component {
  static propTypes = {
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }

  render () {
    const { color } = this.props
    return (
      isValid(color) ? <div className={styles.root} style={{ background: color }} /> : null
    )
  }
}
