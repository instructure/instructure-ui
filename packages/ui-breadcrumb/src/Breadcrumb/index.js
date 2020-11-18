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
import React from 'react'
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { IconArrowOpenEndSolid } from '@instructure/ui-icons'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { Children } from '@instructure/ui-prop-types'
import { withTestable } from '@instructure/ui-testable'

import { BreadcrumbLink } from './BreadcrumbLink'

import { useStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import { omitProps } from '@instructure/ui-react-utils'

/**
---
category: components
---
**/

const Breadcrumb = (props) => {
  const styles = useStyle(Breadcrumb.name, generateStyle, props, {})

  const renderChildren = () => {
    const numChildren = props.children ? props.children.length : 0
    const style = {
      maxWidth: `${Math.floor(100 / numChildren)}%`
    }
    return React.Children.map(props.children, (child, index) => {
      return (
        <li css={styles.crumb} style={style}>
          {child}
          {index < numChildren - 1 && (
            <IconArrowOpenEndSolid color="auto" css={styles.separator} />
          )}
        </li>
      )
    })
  }

  const restProps = omitProps(props, Breadcrumb.propTypes)

  return (
    <View
      {...restProps}
      role="navigation"
      as="div"
      margin={props.margin}
      aria-label={props.label}
    >
      <ol css={styles.root}>{renderChildren()}</ol>
    </View>
  )
}

Breadcrumb.propTypes = {
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

Breadcrumb.defaultProps = {
  size: 'medium',
  children: null,
  margin: undefined
}

Breadcrumb.Link = BreadcrumbLink

const Breadcrumb__Testable = withTestable(Breadcrumb)

export default Breadcrumb__Testable
export { Breadcrumb__Testable as Breadcrumb, BreadcrumbLink }
