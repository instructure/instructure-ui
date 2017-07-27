import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import classnames from 'classnames'
import themeable from '../../themeable'
import { omitProps } from '../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
category: utilities
---
  The InlineSVG component renders an accessible inline SVG. See also [SVGIcon](#SVGIcon).

  ```jsx_example
  <InlineSVG src={iconExample} width="2em" height="2em" />
  ```
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

    this.titleId = shortid.generate()
    this.descId = shortid.generate()
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
        focusable={focusable}
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
