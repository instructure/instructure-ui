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

import { Component, MouseEvent } from 'react'

import { Heading } from '@instructure/ui-heading/latest'
import { View } from '@instructure/ui-view/latest'
import {
  omitProps,
  callRenderProp,
  getElementType
} from '@instructure/ui-react-utils'
import { renderIconWithProps } from '@instructure/ui-icons'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'

import { allowedProps } from './props'
import type { BillboardProps } from './props'
import type { ViewProps } from '@instructure/ui-view/latest'

// Map Billboard sizes to icon sizes
const billboardSizeToIconSize = {
  small: 'illu-sm',
  medium: 'illu-md',
  large: 'illu-lg'
} as const

/**
---
category: components
---
**/
@withStyle(generateStyle)
class Billboard extends Component<
  BillboardProps,
  { isHovered: boolean; isActive: boolean }
> {
  static readonly componentId = 'Billboard'

  static allowedProps = allowedProps
  static defaultProps = {
    disabled: false,
    readOnly: false,
    size: 'medium',
    headingAs: 'span',
    headingLevel: 'h1',
    as: 'span',
    elementRef: () => {}
  } as const

  state = {
    isHovered: false,
    isActive: false
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  renderHeading() {
    const { headingLevel, headingAs, heading, styles } = this.props

    return (
      <span css={styles?.heading}>
        <Heading level={headingLevel} as={headingAs} color="primary">
          {heading}
        </Heading>
      </span>
    )
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false, isActive: false })
  }

  handleMouseDown = () => {
    this.setState({ isActive: true })
  }

  handleMouseUp = () => {
    this.setState({ isActive: false })
  }

  renderHero() {
    const { hero, size } = this.props
    const { isHovered, isActive } = this.state

    if (!hero) return null

    const iconSize = billboardSizeToIconSize[size!]
    // Priority: active > hover > default
    const iconColor = isActive
      ? 'onColor'
      : isHovered
      ? 'infoColor'
      : 'baseColor'

    return renderIconWithProps(hero, iconSize, iconColor)
  }

  renderContent() {
    const { heading, message, hero, styles } = this.props

    return (
      <span css={styles?.content}>
        {hero && <span css={styles?.hero}>{this.renderHero()}</span>}
        {heading && this.renderHeading()}
        {message && (
          <span css={styles?.message}>{callRenderProp(message)}</span>
        )}
      </span>
    )
  }

  handleClick = (e: MouseEvent<ViewProps & Element>): void => {
    const { readOnly, onClick } = this.props

    if (readOnly) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  render() {
    const { href, disabled, readOnly, margin, styles } = this.props

    const Element = getElementType(Billboard, this.props)

    return (
      <View as="div" margin={margin}>
        <View
          {...omitProps(this.props, [
            ...Billboard.allowedProps,
            ...View.allowedProps
          ])}
          type={Element === 'button' ? 'button' : undefined}
          as={Element}
          elementRef={this.handleRef}
          css={styles?.billboard}
          href={href}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          disabled={disabled}
          aria-disabled={disabled || readOnly ? 'true' : undefined}
        >
          {this.renderContent()}
        </View>
      </View>
    )
  }
}

export default Billboard
export { Billboard }
