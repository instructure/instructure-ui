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

import { uid } from '@instructure/uid'
import { omitProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  src?: string
  title?: string
  description?: string
  focusable?: boolean
  width?: string | number
  height?: string | number
  inline?: boolean
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'primary-inverse'
    | 'secondary-inverse'
    | 'success'
    | 'error'
    | 'alert'
    | 'warning'
    | 'brand'
    | 'auto'
}

/**
---
category: components/utilities
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class InlineSVG extends Component<Props> {
  static componentId = 'InlineSVG'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    children: PropTypes.node,
    src: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    focusable: PropTypes.bool,
    /**
     * To let the SVG expand to fill its container, use `auto`
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * To let the SVG expand to fill its container, use `auto`
     */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inline: PropTypes.bool,
    color: PropTypes.oneOf([
      'inherit',
      'primary',
      'secondary',
      'primary-inverse',
      'secondary-inverse',
      'success',
      'error',
      'alert',
      'warning',
      'brand',
      'auto'
    ])
  }

  static defaultProps = {
    focusable: false,
    src: '',
    title: '',
    description: '',
    inline: true,
    children: null,
    width: '1em',
    height: '1em',
    color: 'inherit'
  }

  constructor() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'titleId' does not exist on type 'InlineS... Remove this comment to see the full error message
    this.titleId = uid('InlineSVG-title')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'descId' does not exist on type 'InlineSV... Remove this comment to see the full error message
    this.descId = uid('InlineSVG-desc')
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'src' implicitly has an 'any' type.
  static prepareSrc = (src) => {
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'titleId' does not exist on type 'InlineS... Remove this comment to see the full error message
    return title ? <title id={this.titleId}>{title}</title> : null
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'desc' implicitly has an 'any' type.
  renderDesc(desc) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'descId' does not exist on type 'InlineSV... Remove this comment to see the full error message
    return desc ? <desc id={this.descId}>{desc}</desc> : null
  }

  get labelledBy() {
    const ids = []

    if (this.props.title) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'titleId' does not exist on type 'InlineS... Remove this comment to see the full error message
      ids.push(this.titleId)
    }

    if (this.props.description) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'descId' does not exist on type 'InlineSV... Remove this comment to see the full error message
      ids.push(this.descId)
    }

    return ids.length > 0 ? ids.join(' ') : null
  }

  renderContent() {
    if (this.props.src) {
      const src = InlineSVG.prepareSrc(this.props.src)
      return (
        <g
          role="presentation"
          dangerouslySetInnerHTML={{ __html: src }} // eslint-disable-line react/no-danger
        />
      )
    } else {
      return <g role="presentation">{this.props.children}</g>
    }
  }

  render() {
    const {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Readonly<... Remove this comment to see the full error message
      style, // eslint-disable-line react/prop-types
      title,
      description,
      focusable,
      children,
      src,
      styles,
      ...props
    } = this.props

    // if width or height are 'auto', don't supply anything to the SVG
    const width = this.props.width === 'auto' ? null : this.props.width
    const height = this.props.height === 'auto' ? null : this.props.height

    return (
      <svg
        {...parseAttributes(this.props.src)}
        {...omitProps(this.props, InlineSVG.propTypes, ['inline'])}
        style={{
          ...style,
          width,
          height
        }}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | number | null | undefined' is not a... Remove this comment to see the full error message
        width={width}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | number | null | undefined' is not a... Remove this comment to see the full error message
        height={height}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '"true" | null' is not assignable to type 'bo... Remove this comment to see the full error message
        aria-hidden={title ? null : 'true'}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
        aria-labelledby={this.labelledBy}
        role={this.role}
        focusable={focusable ? 'true' : 'false'}
        css={styles.inlineSVG}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ mak... Remove this comment to see the full error message
        className={props.className}
      >
        {this.renderTitle()}
        {this.renderDesc(description)}
        {this.renderContent()}
      </svg>
    )
  }
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'src' implicitly has an 'any' type.
function parseAttributes(src) {
  const attributes = {}
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
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
