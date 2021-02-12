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

// TODO: remove delimiter comment description once the deprecated values are removed

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { View } from '@instructure/ui-view'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import {
  passthroughProps,
  safeCloneElement,
  deprecated
} from '@instructure/ui-react-utils'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { testable } from '@instructure/ui-testable'

import { InlineList } from '../InlineList'
import { ListItem } from './ListItem'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@deprecated('8.0.0', {
  variant: 'List with the isUnstyled boolean or InlineList',
  delimiter:
    'with delimiter set to [pipe, slash, arrow] will only be available when using [InlineList] as of version 8.0.0.'
})
@testable()
@themeable(theme, styles)
class List extends Component {
  static propTypes = {
    /**
     * Only accepts `<List.Item>` as a child
     */
    children: ChildrenPropTypes.oneOf([ListItem]),
    as: PropTypes.oneOf(['ul', 'ol']),
    /**
     * One of: none, dashed, solid
     */
    delimiter: PropTypes.oneOf([
      'none',
      'dashed',
      'solid',
      'pipe',
      'slash',
      'arrow'
    ]),
    /**
     * When set, renders the List Items without a list style type.
     */
    isUnstyled: PropTypes.bool,
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Sets the margin separating each ListItem.
     */
    itemSpacing: PropTypes.oneOf([
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
     * __deprecated__ Option will be to use the isUnstyled prop or the InlineList component
     */
    variant: PropTypes.oneOf(['default', 'unstyled', 'inline'])
  }

  static defaultProps = {
    children: null,
    as: 'ul',
    delimiter: 'none',
    isUnstyled: false,
    margin: undefined,
    size: 'medium',
    itemSpacing: 'none',
    elementRef: (el) => {},
    variant: undefined
  }

  static Item = ListItem

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      if (!child) return // ignore null, falsy children

      return safeCloneElement(child, {
        isUnstyled: this.props.isUnstyled,
        delimiter: this.props.delimiter,
        size: this.props.size,
        spacing: this.props.itemSpacing
      })
    })
  }

  renderInlineChild() {
    return Children.map(this.props.children, (child) => {
      if (!child) return
      return <InlineList.Item {...child.props} />
    })
  }

  render() {
    const { as, margin, isUnstyled, elementRef, variant, ...rest } = this.props

    const classes = {
      [styles.root]: true,
      [styles.unstyled]: isUnstyled === true || variant === 'unstyled',
      [styles.ordered]: as === 'ol',
      [styles.inline]: variant === 'inline'
    }

    if (!variant || variant === 'default' || variant === 'unstyled') {
      return (
        <View
          {...passthroughProps(rest)}
          className={classnames(classes)}
          as={as}
          margin={margin}
          elementRef={elementRef}
          display="block"
        >
          {this.renderChildren()}
        </View>
      )
    } else {
      return <InlineList {...this.props}>{this.renderInlineChild()}</InlineList>
    }
  }
}

export default List
export { List, ListItem }
