import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import bowser from 'bowser'

import themeable from '../../../themeable'
import { omitProps, pickProps } from '../../../util/passthroughProps'

import Mask from '../../Mask'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class ModalContent extends Component {
  static propTypes = {
    children: PropTypes.node, // eslint-disable-line react/require-default-props
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),
    contentRef: PropTypes.func
  }

  static defaultProps = {
    contentRef: function (el) {},
    size: 'auto',
    children: null
  }

  render () {
    const { size, children, ...props } = this.props

    const ie11 = bowser.msie && bowser.version > 10

    return (
      <Mask placement={ie11 ? 'top' : 'center'} fullScreen>
        <span
          {...omitProps(this.props, ModalContent.propTypes)}
          className={classnames({
            [styles.content]: true,
            [styles[size]]: true,
            [this.props.className]: this.props.className,
            [styles.ie11]: ie11
          })}
          ref={this.props.contentRef}
        >
          {this.props.children}
        </span>
      </Mask>
    )
  }
}
