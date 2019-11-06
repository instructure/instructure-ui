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

import { View } from '@instructure/ui-view'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { childrenOrValue } from '@instructure/ui-prop-types'
import { deprecated, getElementType, passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@deprecated('8.0.0', {
  ellipsis: '<TruncateText />'
})
@testable()
@themeable(theme, styles)
class Heading extends Component {
  static propTypes = {
    /**
    * Add a top- or bottom-border to the Heading
    */
    border: PropTypes.oneOf(['none', 'top', 'bottom']),
    /**
    * The text content of the Heading
    */
    children: childrenOrValue,
    /**
    * The font color to render
    */
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'primary-inverse',
      'secondary-inverse',
      'inherit'
    ]),
    /**
    * The *visual* appearance of the Heading: h1 is largest; h5 is smallest.
    */
    level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'reset']),
    /**
    * Choose the element Heading should render as. Will default to the `level` prop
    * if not specified.
    */
    as: PropTypes.elementType, // eslint-disable-line react/require-default-props
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    /**
    * Provides a ref to the underlying HTML element
    */
    elementRef: PropTypes.func,

    /* eslint-disable react/require-default-props */
    /**
    * __Deprecated - use `<TruncateText /> instead`__
    */
    ellipsis: PropTypes.bool
    /* eslint-enable react/require-default-props */
   }

   static defaultProps = {
     children: null,
     margin: undefined,
     elementRef: undefined,
     border: 'none',
     color: 'inherit',
     level: 'h2'
   }

   render () {
     const {
      border,
      children,
      color,
      level,
      margin,
      elementRef,
      ellipsis,
      ...props
    } = this.props

    const ElementType = getElementType(Heading, this.props, () => {
      if (level === 'reset') {
       return 'span'
      } else {
       return level
      }
    })

    return (
      <View
        {...passthroughProps(props)}
        className={classnames({
          [styles.root]: true,
          [styles[`level--${level}`]]: true,
          [styles[`color--${color}`]]: color,
          [styles[`border--${border}`]]: border !== 'none',
          [styles.ellipsis]: ellipsis
        })}
        as={ElementType}
        margin={margin}
        elementRef={elementRef}
      >
        {children}
      </View>
    )
  }
}

export default Heading
export { Heading }
