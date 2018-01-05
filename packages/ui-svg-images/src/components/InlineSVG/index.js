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

import themeable from '@instructure/ui-themeable'
import uid from '@instructure/ui-utils/lib/uid'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
---
**/
@themeable(theme, styles)
export default class InlineSVG extends Component {
  static propTypes = {
    children: PropTypes.node, // eslint-disable-line
    src: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    focusable: PropTypes.bool
  }

  static defaultProps = {
    focusable: false,
    src: '',
    title: '',
    description: ''
  }

  static prepareSrc = src => {
    const pattern = /<svg[^>]*>((.|[\n\r])*)<\/svg>/
    const matches = pattern.exec(src)

    return matches ? matches[1] : src
  }

  constructor (props) {
    super()

    this.titleId = uid()
    this.descId = uid()
  }

  get role () {
    if (this.props.title) {
      return 'img'
    } else {
      return 'presentation'
    }
  }

  renderTitle () {
    const { title } = this.props
    return title
      ? <title id={this.titleId}>
        {title}
      </title>
      : null
  }

  renderDesc (desc) {
    return desc
      ? <desc id={this.descId}>
        {desc}
      </desc>
      : null
  }

  get labelledBy () {
    const ids = []

    if (this.props.title) {
      ids.push(this.titleId)
    }

    if (this.props.description) {
      ids.push(this.descId)
    }

    return ids.length > 0 ? ids.join(' ') : null
  }

  renderContent () {
    if (this.props.src) {
      const src = InlineSVG.prepareSrc(this.props.src)
      return (
        <g
          role="presentation"
          dangerouslySetInnerHTML={{ __html: src }} // eslint-disable-line react/no-danger
        />
      )
    } else {
      return (
        <g role="presentation">
          {this.props.children}
        </g>
      )
    }
  }

  render () {
    const { title, description, focusable, children, src, ...props } = this.props

    return (
      <svg
        {...parseAttributes(this.props.src)}
        {...props}
        aria-hidden={title ? null : 'true'}
        aria-labelledby={this.labelledBy}
        role={this.role}
        focusable={focusable ? 'true' : 'false'}
        className={classnames({
          [styles.root]: true,
          [props.className]: props.className
        })}
      >
        {this.renderTitle()}
        {this.renderDesc(description)}
        {this.renderContent()}
      </svg>
    )
  }
}

function parseAttributes (src) {
  const attributes = {}
  const SVGAttributesRegExp = /<svg\s+([^>]*)\s*>/
  const namesAndValuesRegExp = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g

  if (typeof src === 'string') {
    const attributesMatches = SVGAttributesRegExp.exec(src)
    const attributesString = attributesMatches ? attributesMatches[1] : ''
    const excludes = ['xmlns', 'xmlns:xlink', 'version']

    let match = namesAndValuesRegExp.exec(attributesString)

    while (match != null) {
      if (excludes.indexOf(match[1]) === -1) {
        attributes[match[1]] = match[2] || (match[3] ? match[3] : match[4] ? match[4] : match[5]) || match[1] // eslint-disable-line no-nested-ternary, max-len
      }
      match = namesAndValuesRegExp.exec(attributesString)
    }
  }

  return attributes
}
