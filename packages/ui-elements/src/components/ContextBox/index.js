/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Container from '@instructure/ui-container/lib/components/Container'

import themeable from '@instructure/ui-themeable'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import LayoutPropTypes from '@instructure/ui-layout/lib/utils/LayoutPropTypes'
import deprecated, { changedPackageWarning } from '@instructure/ui-utils/lib/react/deprecated'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
 **/
@themeable(theme, styles)
class ContextBox extends Component {
  static propTypes = {
    children:  PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'inverse']),
    withArrow: PropTypes.bool,
    /**
     * Should the `<ContextBox />` have a border
     */
    withBorder: PropTypes.bool,
    /**
     * Should the `<ContextBox />` have a box shadow
     */
    withShadow: PropTypes.bool,
    arrowOffsetStart: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    arrowOffsetTop: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    placement: LayoutPropTypes.placement,
    positionStart: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    positionTop: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    /**
    * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
    */
    padding: ThemeablePropTypes.spacing,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
    * Component will expand to fit the width of its contents by default,
    * unless size is specified
    */
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    variant: 'default',
    placement: 'center end',
    withArrow: true,
    withBorder: true,
    withShadow: true,
    size: undefined,
    padding: undefined,
    margin: undefined,
    textAlign: undefined,
    positionTop: undefined,
    positionStart: undefined,
    arrowOffsetTop: undefined,
    arrowOffsetStart: undefined
  }

  render () {
    const {
      style, // eslint-disable-line react/prop-types
      className, // eslint-disable-line react/prop-types
      padding,
      margin,
      size,
      textAlign,
      variant,
      children,
      withArrow,
      withBorder,
      withShadow,
      positionStart,
      positionTop,
      arrowOffsetTop,
      arrowOffsetStart,
      placement
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: true,
      [styles['with-arrow']]: withArrow,
      [styles['with-border']]: withBorder,
      [className]: className,
      [styles[`positioned--${placement.replace(' ', '-')}`]]: true
    }

    const containerStyle = {
      position: (positionTop || positionStart) ? 'absolute' : (style && style.position),
      left: positionStart || (style && style.left),
      top: positionTop || (style && style.top),
      ...style
    }

    const arrowStyle = {
      left: arrowOffsetStart,
      top: arrowOffsetTop
    }

    return (
      <Container
        {...omitProps(this.props, ContextBox.propTypes)}
        style={containerStyle}
        className={classnames(classes)}
        margin={margin}
        size={size}
      >
        <Container
          className={styles.content}
          padding={padding}
          textAlign={textAlign}
          withBorder={withBorder}
          withShadow={withShadow}
        >
          {withArrow && <span className={styles.arrow} style={arrowStyle} />}
          {children}
        </Container>
      </Container>
    )
  }
}

export default deprecated('5.4.0', null, `${changedPackageWarning(
  'ui-elements',
  'ui-layout'
)} It has also been renamed from [ContextBox] to [ContextView].`)(ContextBox)
