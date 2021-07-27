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
import { Component } from 'react'
import PropTypes from 'prop-types'

import { logError as error } from '@instructure/console'
import {
  callRenderProp,
  getElementType,
  matchComponentTypes,
  passthroughProps
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { View } from '@instructure/ui-view'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  renderLabel: React.ReactNode | ((...args: any[]) => any)
  renderAfter?: React.ReactNode | ((...args: any[]) => any)
  renderIcon?: React.ReactNode | ((...args: any[]) => any)
  href?: string
  onClick?: (...args: any[]) => any
  isSelected?: boolean
  elementRef?: (...args: any[]) => any
  as?: React.ReactElement
  cursor?: string
  isDisabled?: boolean
}

/**
---
parent: AppNav
id: AppNav.Item
---
@module Item
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Item extends Component<Props> {
  static readonly componentId = 'AppNav.Item'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * The text to display. If the `icon` prop is used, label text must be wrapped
     * in `ScreenReaderContent`.
     */
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
      .isRequired,
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
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
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

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleClick = (e) => {
    const { isDisabled, onClick } = this.props

    if (isDisabled) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  render() {
    const ElementType = getElementType(Item, this.props)

    const {
      renderIcon,
      renderLabel,
      href,
      elementRef,
      renderAfter,
      cursor,
      isDisabled
    } = this.props

    const icon = callRenderProp(renderIcon)
    const label = callRenderProp(renderLabel)

    const labelIsForScreenReaders = matchComponentTypes(label, [
      ScreenReaderContent
    ])

    if (icon) {
      error(
        labelIsForScreenReaders,
        '[AppNav] If an icon is used, the label text should be wrapped in <ScreenReaderContent />.'
      )
    }

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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleFocus' does not exist on type 'Ite... Remove this comment to see the full error message
        onFocus={this.handleFocus}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleBlur' does not exist on type 'Item... Remove this comment to see the full error message
        onBlur={this.handleBlur}
        cursor={isDisabled ? 'not-allowed' : cursor}
        css={this.props.styles.item}
      >
        {icon}
        {labelIsForScreenReaders ? (
          label
        ) : (
          <span css={this.props.styles.label}>{label}</span>
        )}
        {renderAfter && callRenderProp(renderAfter)}
      </View>
    )
  }
}

export default Item
export { Item }
