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

import { XInstUIIcon } from '@instructure/ui-icons-lucide'
import { View } from '@instructure/ui-view'
import type { ViewProps } from '@instructure/ui-view'
import { omitProps } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import type { TagProps } from './props'
import { allowedProps } from './props'

/**
---
category: components
---
**/

@withStyle(generateStyle)
class Tag extends Component<TagProps> {
  static readonly componentId = 'Tag'

  static allowedProps = allowedProps
  static defaultProps = {
    size: 'medium',
    dismissible: false,
    variant: 'default',
    disabled: false,
    readOnly: false
  }

  state = {
    iconHovered: false
  }

  ref: Element | null = null

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get focused() {
    return isActiveElement(this.ref)
  }

  focus = () => {
    this.ref && (this.ref as HTMLElement).focus()
  }

  handleIconMouseEnter = () => {
    this.setState({ iconHovered: true })
  }

  handleIconMouseLeave = () => {
    this.setState({ iconHovered: false })
  }

  handleClick = (e: React.MouseEvent<ViewProps & Element>) => {
    const { disabled, readOnly, onClick } = this.props

    if (disabled || readOnly) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  handleRef = (element: Element | null) => {
    this.ref = element

    if (typeof this.props.elementRef === 'function') {
      this.props.elementRef(element)
    }
  }

  getIconSize = () => {
    const { size, variant } = this.props

    if (variant === 'inline') {
      return 'xs'
    }

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
      title,
      onClick,
      margin,
      styles,
      variant
    } = this.props

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Tag.allowedProps),
      Tag
    )

    const getIconColor = () => {
      if (disabled) {
        return 'mutedColor'
      }
      if (variant === 'inline') {
        return 'inverseColor'
      }
      return this.state.iconHovered ? 'actionSecondaryHoverColor' : 'baseColor'
    }

    return (
      <View
        {...passthroughProps}
        elementRef={this.handleRef}
        css={styles?.tag}
        className={className}
        as={onClick ? 'button' : 'span'}
        margin={margin}
        type={onClick ? 'button' : undefined}
        {...(onClick && { onClick: this.handleClick })}
        disabled={disabled || readOnly}
        display={undefined}
        title={title || (typeof text === 'string' ? text : undefined)}
        data-cid="Tag"
        onMouseEnter={this.handleIconMouseEnter}
        onMouseLeave={this.handleIconMouseLeave}
      >
        <span css={styles?.text}>{text}</span>
        {onClick && dismissible ? (
          <span css={styles?.icon}>
            <XInstUIIcon size={this.getIconSize()} color={getIconColor()} />
          </span>
        ) : null}
      </View>
    )
  }
}

export default Tag
export { Tag }
