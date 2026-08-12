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

import { Component } from 'react'

import { XInstUIIcon, renderIconWithProps } from '@instructure/ui-icons'
import { View } from '@instructure/ui-view/latest'
import type { ViewProps } from '@instructure/ui-view/latest'
import { omitProps } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { withStyleNew } from '@instructure/emotion'

import generateStyle from './styles.js'
import type { TagProps } from './props'
import { allowedProps } from './props.js'

/**
---
category: components
---
**/

@withStyleNew(generateStyle)
class Tag extends Component<TagProps> {
  static displayName = 'Tag'
  static readonly componentId = 'Tag'

  static allowedProps = allowedProps
  static defaultProps = {
    size: 'medium',
    dismissible: false,
    disabled: false,
    readOnly: false
  }

  state = {
    iconHovered: false
  }

  ref: Element | null = null
  bodyRef: HTMLElement | null = null
  closeRef: HTMLElement | null = null

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get interactive() {
    return !!this.props.href || typeof this.props.onClick === 'function'
  }

  get focused() {
    return isActiveElement(this.bodyRef) || isActiveElement(this.closeRef)
  }

  focus = () => {
    const target =
      this.interactive && this.bodyRef ? this.bodyRef : this.closeRef
    target?.focus()
  }

  handleIconMouseEnter = () => {
    this.setState({ iconHovered: true })
  }

  handleIconMouseLeave = () => {
    this.setState({ iconHovered: false })
  }

  handleClick = (e: React.MouseEvent<Element>) => {
    const { disabled, readOnly, onClick } = this.props

    if (disabled || readOnly) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e as React.MouseEvent<ViewProps & Element>)
    }
  }

  handleDismiss = (e: React.MouseEvent<Element>) => {
    const { disabled, readOnly, onDismiss } = this.props

    if (disabled || readOnly) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onDismiss === 'function') {
      onDismiss(e as React.MouseEvent<ViewProps & Element>)
    }
  }

  handleRef = (element: Element | null) => {
    this.ref = element

    if (typeof this.props.elementRef === 'function') {
      this.props.elementRef(element)
    }
  }

  handleBodyRef = (element: HTMLElement | null) => {
    this.bodyRef = element
  }

  handleCloseRef = (element: HTMLElement | null) => {
    this.closeRef = element
  }

  getIconSize = () => {
    const { size } = this.props

    const sizeMap = {
      small: 'xs',
      medium: 'sm',
      large: 'md'
    } as const

    return sizeMap[size!]
  }

  render() {
    const {
      className,
      dismissible,
      disabled,
      readOnly,
      text,
      href,
      renderIcon,
      margin,
      styles
    } = this.props

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Tag.allowedProps),
      Tag
    )

    const getIconColor = () => {
      if (disabled) {
        return 'mutedColor'
      }
      return this.state.iconHovered ? 'actionSecondaryHoverColor' : 'baseColor'
    }

    const isInteractive = this.interactive
    const isDisabled = disabled || readOnly
    const BodyElement: React.ElementType = href
      ? 'a'
      : this.props.onClick
      ? 'button'
      : 'span'

    const bodyProps: Record<string, unknown> = {}
    if (BodyElement === 'a') {
      bodyProps.href = isDisabled ? undefined : href
    } else if (BodyElement === 'button') {
      bodyProps.type = 'button'
      bodyProps.disabled = isDisabled
    }
    if (isInteractive) {
      bodyProps.onClick = this.handleClick
      bodyProps['aria-disabled'] = isDisabled ? 'true' : undefined
    }

    return (
      <View
        {...passthroughProps}
        elementRef={this.handleRef}
        css={styles?.tag}
        className={className}
        as="span"
        margin={margin}
        display={undefined}
        title={typeof text === 'string' ? text : undefined}
        data-cid="Tag"
      >
        <BodyElement css={styles?.body} ref={this.handleBodyRef} {...bodyProps}>
          {renderIcon ? (
            <span css={styles?.leadIcon}>
              {renderIconWithProps(renderIcon, this.getIconSize(), undefined)}
            </span>
          ) : null}
          <span css={styles?.text}>{text}</span>
        </BodyElement>
        {dismissible ? (
          <button
            type="button"
            css={styles?.closeButton}
            ref={this.handleCloseRef}
            onClick={this.handleDismiss}
            onMouseEnter={this.handleIconMouseEnter}
            onMouseLeave={this.handleIconMouseLeave}
            disabled={isDisabled}
          >
            <span css={styles?.closeIcon}>
              <XInstUIIcon size={this.getIconSize()} color={getIconColor()} />
            </span>
          </button>
        ) : null}
      </View>
    )
  }
}

export default Tag
export { Tag }
