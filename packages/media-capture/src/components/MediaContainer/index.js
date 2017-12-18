import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'

@themeable({}, styles)
export default class MediaContainer extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: []
  }

  render () {
    return (
      <div className={styles.media}>
        { this.props.children }
      </div>
    )
  }
}
