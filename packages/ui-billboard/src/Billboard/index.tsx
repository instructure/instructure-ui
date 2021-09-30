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
import type { BillboardProps } from './props'

/**
---
category: components
---
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
    this.ref = el
    this.props.elementRef?.(el)
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

  get heroIsFunction() {
    return typeof this.props.hero === 'function'
  }

  get SVGIconSize() {
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
    if (this.heroIsFunction) {
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleClick = (e) => {
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
