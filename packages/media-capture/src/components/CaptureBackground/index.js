import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'
import classNames from 'classnames'

import styles from './styles.css'

@themeable({}, styles)
export default class CaptureBackground extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: []
  }

  render () {
    const style = {
      backgroundColor: 'rgba(94, 94, 94, .5) !important',
      width: '97vw',
      height: '94vh'
    }

    return (
      <div className={classNames(styles.background)}>
        {this.props.children}
      </div>
    )
  }
}
