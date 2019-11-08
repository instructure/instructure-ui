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

import { error } from '@instructure/console/macro'
import {
  callRenderProp,
  getElementType,
  matchComponentTypes,
  passthroughProps
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { themeable } from '@instructure/ui-themeable'

import { View } from '@instructure/ui-view'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: AppNav
id: AppNav.Item
---
@module Item
**/
@testable()
@themeable(theme, styles)
class Item extends Component {
  static propTypes = {
    /**
    * The text to display. If the `icon` prop is used, label text must be wrapped
    * in `ScreenReaderContent`.
    */
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    /**
    * Content to display after the renderLabel text, such as a badge
    */
    renderAfter: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * The visual to display (ex. an Image, Logo, Avatar, or Icon)
    */
    renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * If the item goes to a new page, pass an href
    */
    href: PropTypes.string,
    /**
    * If the item does not go to a new page, pass an onClick
    */
    onClick: PropTypes.func,
    /**
    * Denotes which item is currently selected
    */
    isSelected: PropTypes.bool,
    /**
    * provides a reference to the underlying focusable (`button` or `a`) element
    */
    elementRef: PropTypes.func,
    /**
    * The element type to render as (will default to `<a>` if href is provided)
    */
    as: PropTypes.elementType,
    /**
     * Specify the mouse cursor to use on :hover.
     * The `pointer` cursor is used by default.
     */
    cursor: PropTypes.string,
    /**
    * Disables the link or button visually and functionally
    */
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    children: null,
    onClick: function (event) {},
    isSelected: false,
    href: undefined,
    elementRef: undefined,
    renderIcon: undefined,
    renderAfter: undefined,
    as: undefined,
    cursor: 'pointer',
    isDisabled: false
  }

  handleClick = (e) => {
    const {
      isDisabled,
      onClick
    } = this.props

    if (isDisabled) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  render () {
    const ElementType = getElementType(Item, this.props)

    const {
      renderIcon,
      renderLabel,
      href,
      isSelected,
      elementRef,
      renderAfter,
      cursor,
      isDisabled
    } = this.props

    const icon = callRenderProp(renderIcon)
    const label = callRenderProp(renderLabel)

    const labelIsForScreenReaders = matchComponentTypes(
      label, [ScreenReaderContent]
    )

    if (icon) {
      error(
        labelIsForScreenReaders,
        '[AppNav] If an icon is used, the label text should be wrapped in <ScreenReaderContent />.'
      )
    }

    const classes = classnames ({
      [styles.root]: true,
      [styles.isSelected]: isSelected,
      [styles.disabled]: isDisabled
    })

    return (
      <View
        {...passthroughProps(this.props)}
        as={ElementType}
        href={href}
        onClick={this.handleClick}
        disabled={isDisabled}
        elementRef={elementRef}
        display="flex"
        position="relative"
        borderRadius="medium"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        cursor={isDisabled ? 'not-allowed' : cursor}
        className={classes}
      >
        {icon}
        {labelIsForScreenReaders ? label : <span className={styles.label}>{label}</span>}
        {renderAfter && callRenderProp(renderAfter)}
      </View>
    )
  }
}

export default Item
export { Item }
