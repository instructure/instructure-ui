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

// TODO: remove delimeter comment description once the deprecated values are removed

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { View } from '@instructure/ui-view'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import { passthroughProps, deprecated } from '@instructure/ui-react-utils'
import { error } from '@instructure/console/macro'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: List
id: List.Item
---
**/
@testable()
@themeable(theme, styles)
class ListItem extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    /**
     * Inherits delimiter from the parent List component.
     */
    delimiter: deprecated.deprecatePropValues(
      PropTypes.oneOf(['none', 'dashed', 'solid', 'pipe', 'slash', 'arrow']),
      ['pipe', 'slash', 'arrow'],
      ({ propValue }) =>
        `with 'delimiter' set to ${propValue} will only be available when using [InlineList.Item] as of version 8.0.0.`
    ),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
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
    /**
     * Inherits itemSpacing from the parent List component
     */
    spacing: PropTypes.oneOf([
      'none',
      'xxx-small',
      'xx-small',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large'
    ]),
    elementRef: PropTypes.func,
    /**
     * __deprecated:__ inline will be InlineList
     */
    variant: PropTypes.oneOf(['default', 'unstyled', 'inline'])
  }

  static defaultProps = {
    padding: 'none',
    margin: undefined,
    spacing: 'none',
    delimiter: 'none',
    size: 'medium',
    elementRef: (el) => {},
    variant: undefined
  }

  render() {
    const {
      delimiter,
      spacing,
      size,
      margin,
      padding,
      elementRef,
      children,
      variant,
      ...rest
    } = this.props

    const withDelimiter = delimiter !== 'none'
    const withSpacing = spacing !== 'none'

    error(
      !(withDelimiter && withSpacing),
      `[List] \`itemSpacing\` has no effect inside Lists with the \`delimiter\` prop set to anything other than \`none\`.`
    )

    const classes = {
      [styles.root]: true,
      [styles[size]]: size,
      [styles[`delimiter--${delimiter}`]]: delimiter !== 'none' ? true : null,
      [styles[`spacing--${spacing}`]]: withSpacing && !withDelimiter
    }
    return (
      <View
        {...passthroughProps(rest)}
        className={classnames(classes)}
        as="li"
        margin={margin}
        padding={padding}
        maxWidth="100%"
        elementRef={elementRef}
      >
        {children}

        {variant === 'inline' && (
          <span className={styles.delimiter} aria-hidden="true" />
        )}
      </View>
    )
  }
}

export default ListItem
export { ListItem }
