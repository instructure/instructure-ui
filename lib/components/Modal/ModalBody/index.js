import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styleable from '../../../util/styleable'

import styles from './styles.css'

@styleable(styles)
export default class ModalBody extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static contextTypes = {
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen'])
  }

  render () {
    return (
      <div className={classnames({
        [styles.root]: true,
        [styles[this.context.size]]: true
      })}>
        {this.props.children}
      </div>
    )
  }
}
