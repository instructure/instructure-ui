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

import { Link } from '@instructure/ui-link/latest'
import { omitProps } from '@instructure/ui-react-utils'
import { Tooltip } from '@instructure/ui-tooltip/latest'
import { withStyleNew } from '@instructure/emotion'

import generateStyle from './styles.js'

import { allowedProps } from './props.js'
import type { BreadcrumbLinkProps, BreadcrumbLinkState } from './props'

/**
---
parent: Breadcrumb
id: Breadcrumb.Link
---
**/

@withStyleNew(generateStyle)
class BreadcrumbLink extends Component<
  BreadcrumbLinkProps,
  BreadcrumbLinkState
> {
  static displayName = 'BreadcrumbLink'
  static readonly componentId = 'Breadcrumb.Link'

  static allowedProps = allowedProps
  static defaultProps = {}

  ref: Element | null = null
  private _textRef: HTMLSpanElement | null = null
  private _resizeObserver?: ResizeObserver

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  handleTextRef = (el: HTMLSpanElement | null) => {
    this._textRef = el
  }

  constructor(props: BreadcrumbLinkProps) {
    super(props)

    this.state = {
      isTruncated: false
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()

    if (this._textRef && typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(this.checkTruncation)
      this._resizeObserver.observe(this._textRef)
    }
    this.checkTruncation()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
    this.checkTruncation()
  }

  componentWillUnmount() {
    this._resizeObserver?.disconnect()
  }

  checkTruncation = () => {
    if (!this._textRef) {
      return
    }
    const isTruncated = this._textRef.scrollWidth > this._textRef.clientWidth

    if (isTruncated !== this.state.isTruncated) {
      this.setState({ isTruncated })
    }
  }

  render() {
    const {
      children,
      href,
      renderIcon,
      iconPlacement,
      onClick,
      onMouseEnter,
      isCurrentPage,
      size,
      styles
    } = this.props
    const { isTruncated } = this.state
    const props = omitProps(this.props, BreadcrumbLink.allowedProps)

    const isInteractive = onClick || href
    return (
      <Tooltip
        renderTip={children}
        preventTooltip={!isTruncated}
        // this wraps the achor/button tag in a span and puts the aria-describedby on that instead of the anchor/button tag
        // to avoid SRs reading the text twice
        {...(isInteractive && { as: 'span' })}
      >
        <Link
          {...props}
          href={href}
          renderIcon={renderIcon}
          iconPlacement={iconPlacement}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          variant="standalone"
          elementRef={this.handleRef}
          forceButtonRole={false}
          size={size}
          // needed so the focus ring shows up
          {...(!renderIcon && { display: 'block' })}
          {...(isCurrentPage && { 'aria-current': 'page' })}
          data-cid="BreadcrumbLink"
        >
          <span css={styles?.text} ref={this.handleTextRef}>
            {children}
          </span>
        </Link>
      </Tooltip>
    )
  }
}

export default BreadcrumbLink
export { BreadcrumbLink }
