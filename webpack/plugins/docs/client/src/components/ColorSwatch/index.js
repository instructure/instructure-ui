import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Color from 'tinycolor2'

import styles from './styles.css'

export default class ColorSwatch extends Component {
  static propTypes = {
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }

  render () {
    const { color } = this.props
    return (
      Color(color).isValid() ? <div className={styles.root} style={{ background: color }} /> : null
    )
  }
}
