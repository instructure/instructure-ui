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

import { omitProps, withSSR } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps, propTypes } from './props'
import type { InlineSVGProps } from './props'

import { hashInstance } from '@instructure/ui-utils'

/**
---
category: components/utilities
---
@tsProps
**/
@withSSR()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class InlineSVG extends Component<InlineSVGProps> {
  static readonly componentId = 'InlineSVG'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    focusable: false,
    src: '',
    title: '',
    description: '',
    inline: true,
    width: '1em',
    height: '1em',
    color: 'inherit'
  }

  titleId?: string
  descId?: string

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: InlineSVGProps) {
    super(props)

    //@ts-expect-error props.ssr
    this.titleId = hashInstance('InlineSVG-title', this.props.ssr)
    //@ts-expect-error props.ssr
    this.descId = hashInstance('InlineSVG-desc', this.props.ssr)
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  static prepareSrc = (src: string) => {
    const pattern = /<svg[^>]*>((.|[\n\r])*)<\/svg>/
    const matches = pattern.exec(src)

    return matches ? matches[1] : src
  }

  get role() {
    if (this.props.title) {
      return 'img'
    } else {
      return 'presentation'
    }
  }

  renderTitle() {
    const { title } = this.props
    return title ? <title id={this.titleId}>{title}</title> : null
  }

  renderDesc(desc: InlineSVGProps['description']) {
    return desc ? <desc id={this.descId}>{desc}</desc> : null
  }

  get labelledBy() {
    const ids = []

    if (this.props.title) {
      ids.push(this.titleId)
    }

    if (this.props.description) {
      ids.push(this.descId)
    }

    return ids.length > 0 ? ids.join(' ') : undefined
  }

  renderContent() {
    if (this.props.src) {
      const src = InlineSVG.prepareSrc(this.props.src)
      return (
        <g
          role="presentation"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: src }}
        />
      )
    } else {
      return <g role="presentation">{this.props.children}</g>
    }
  }

  render() {
    const {
      style,
      title,
      description,
      focusable,
      children,
      src,
      styles,
      ...props
    } = this.props

    // if width or height are 'auto', don't supply anything to the SVG
    const width = this.props.width === 'auto' ? undefined : this.props.width
    const height = this.props.height === 'auto' ? undefined : this.props.height

    return (
      <svg
        {...parseAttributes(src)}
        {...omitProps(this.props, InlineSVG.allowedProps, ['inline'])}
        style={{
          ...style,
          width,
          height
        }}
        width={width}
        height={height}
        aria-hidden={title ? undefined : 'true'}
        aria-labelledby={this.labelledBy}
        role={this.role}
        focusable={focusable ? 'true' : 'false'}
        css={styles?.inlineSVG}
        className={props.className}
        ref={this.handleRef}
      >
        {this.renderTitle()}
        {this.renderDesc(description)}
        {this.renderContent()}
      </svg>
    )
  }
}

function parseAttributes(src: InlineSVGProps['src']) {
  const attributes: Record<string, string> = {}
  const SVGAttributesRegExp = /<svg\s+([^>]*)\s*>/
  const namesAndValuesRegExp =
    /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g

  if (typeof src === 'string') {
    const attributesMatches = SVGAttributesRegExp.exec(src)
    const attributesString = attributesMatches ? attributesMatches[1] : ''
    const excludes = ['xmlns', 'xmlns:xlink', 'version']

    let match = namesAndValuesRegExp.exec(attributesString)

    while (match != null) {
      if (excludes.indexOf(match[1]) === -1) {
        attributes[match[1]] =
          match[2] ||
          (match[3] ? match[3] : match[4] ? match[4] : match[5]) ||
          match[1] // eslint-disable-line no-nested-ternary, max-len
      }
      match = namesAndValuesRegExp.exec(attributesString)
    }
  }

  return attributes
}

export default InlineSVG
export { InlineSVG }
