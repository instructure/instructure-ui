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

/** @jsx jsx */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { IconArrowOpenEndSolid } from '@instructure/ui-icons'
import { Children } from '@instructure/ui-prop-types'
import { testable } from '@instructure/ui-testable'

import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  ThemeablePropValues
} from '@instructure/emotion'
import { BreadcrumbLink } from './BreadcrumbLink'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  label: string
  size?: 'small' | 'medium' | 'large'
  margin?: keyof typeof ThemeablePropValues.SPACING
}

/**
---
category: components
---
**/

@withStyle(generateStyle, generateComponentTheme)
@testable()
class Breadcrumb extends Component<Props> {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * children of type Breadcrumb.Link
     */
    children: Children.oneOf([BreadcrumbLink]),
    /**
     * An accessible label for the navigation
     */
    label: PropTypes.string.isRequired,
    /**
     * Sets the font-size of the breadcrumb text
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing
  }

  static defaultProps = {
    size: 'medium',
    children: null,
    margin: undefined
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  static Link = BreadcrumbLink

  renderChildren() {
    const { styles, children } = this.props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'length' does not exist on type 'string |... Remove this comment to see the full error message
    const numChildren = children ? children.length : 0
    const inlineStyle = {
      maxWidth: `${Math.floor(100 / numChildren)}%`
    }
    return React.Children.map(children, (child, index) => {
      return (
        <li css={styles.crumb} style={inlineStyle}>
          {child}
          {index < numChildren - 1 && (
            <IconArrowOpenEndSolid color="auto" css={styles.separator} />
          )}
        </li>
      )
    })
  }

  render() {
    const { styles } = this.props

    return (
      <View
        role="navigation"
        as="div"
        // @ts-expect-error ts-migrate(2322) FIXME:
        margin={this.props.margin}
        aria-label={this.props.label}
      >
        <ol css={styles.breadcrumb}>{this.renderChildren()}</ol>
      </View>
    )
  }
}

export default Breadcrumb
export { Breadcrumb, BreadcrumbLink }
