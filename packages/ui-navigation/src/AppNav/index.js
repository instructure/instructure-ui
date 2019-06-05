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

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { testable } from '@instructure/ui-testable'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'

import { View } from '@instructure/ui-layout'

import { Item } from './Item'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
experimental: true
---
**/
@testable()
@themeable(theme, styles)
class AppNav extends Component {
  static propTypes = {
    /**
    * Screenreader label for the overall navigation
    */
    screenReaderLabel: PropTypes.string.isRequired,
    /**
     * Only accepts `AppNav.Item` as children
     */
    children: ChildrenPropTypes.oneOf([Item]),
    /**
    * Content to display after the navigation items, aligned to the far end
    * of the navigation
    */
    renderAfterItems: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    /**
    * provides a reference to the underlying nav element
    */
    elementRef: PropTypes.func
  }

  static defaultProps = {
    children: null,
    margin: '0',
    renderAfterItems: undefined,
    elementRef: undefined
  }

  static Item = Item

  renderChildren () {
    return Children.map(this.props.children, (child) => {
      return (
        <li className={styles.listItem}>
          {child}
        </li>
      )
    })
  }

  render () {
    const {
      screenReaderLabel,
      margin,
      elementRef
    } = this.props

    const renderAfterItems = callRenderProp(this.props.renderAfterItems)

    return (
      <View
        {...passthroughProps(this.props)}
        as="nav"
        className={classnames({
          [styles.root]: true,
          [styles['root--hasRenderAfterItems']]: renderAfterItems
        })}
        aria-label={screenReaderLabel}
        margin={margin}
        display={renderAfterItems ? 'flex' : 'block'}
        elementRef={elementRef}
      >
        <ul className={classnames({
          [styles.list]: true,
          [styles['list--hasRenderAfterItems']]: renderAfterItems
        })}>
          {this.renderChildren()}
        </ul>

        {
          renderAfterItems &&
          <span className={styles.renderAfter}>
            {renderAfterItems}
          </span>
        }
      </View>
    )
  }
}

export { AppNav }
export default AppNav
