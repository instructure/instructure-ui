import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '../../../themeable'
import { omitProps, pickProps } from '../../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class ModalContent extends Component {
  static propTypes = {
    children: PropTypes.node, // eslint-disable-line react/require-default-props
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen'])
  }

  static defaultProps = {
    size: 'auto'
  }

  render () {
    const {
      size,
      children,
      ...props
    } = this.props

    return (
      <span
        {...omitProps(this.props, ModalContent.propTypes)}
        className={classnames({
          [styles.content]: true,
          [styles[size]]: true,
          [this.props.className]: this.props.className
        })}
      >
        {this.props.children}
      </span>
    )
  }
}
