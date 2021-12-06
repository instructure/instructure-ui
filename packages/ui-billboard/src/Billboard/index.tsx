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
import { Component, MouseEvent } from 'react'

import { Heading } from '@instructure/ui-heading'
import { View } from '@instructure/ui-view'
import {
  omitProps,
  callRenderProp,
  getElementType
} from '@instructure/ui-react-utils'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { BillboardProps, HeroIconSize } from './props'
import type { ViewProps } from '@instructure/ui-view'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
class Billboard extends Component<BillboardProps> {
  static readonly componentId = 'Billboard'

  static propTypes = propTypes
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

  get SVGIconSize(): HeroIconSize {
    const size = this.props.size

    // serve up appropriate SVGIcon size for each Billboard size
    if (size === 'small') {
      return 'medium'
    } else if (size === 'large') {
      return 'x-large'
    } else {
      return 'large'
    }
  }

  renderHero() {
    if (typeof this.props.hero === 'function') {
      return this.props.hero(this.SVGIconSize)
    } else {
      return this.props.hero
    }
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

  handleClick = (e: MouseEvent<ViewProps>): void => {
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
