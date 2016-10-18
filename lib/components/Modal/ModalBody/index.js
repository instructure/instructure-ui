import React, { Component, PropTypes } from 'react'
import styleable from '../../../util/styleable'

import styles from './styles.css'

@styleable(styles)
export default class ModalBody extends Component {
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
