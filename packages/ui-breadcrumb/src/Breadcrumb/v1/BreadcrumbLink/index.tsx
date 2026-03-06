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

import { TruncateText } from '@instructure/ui-truncate-text/v11_6'
import { Link } from '@instructure/ui-link/v11_6'
import { omitProps } from '@instructure/ui-react-utils'
import { Tooltip } from '@instructure/ui-tooltip/v11_6'

import { allowedProps } from './props'
import type { BreadcrumbLinkProps, BreadcrumbLinkState } from './props'

/**
---
parent: Breadcrumb
id: Breadcrumb.Link
---
**/

class BreadcrumbLink extends Component<
  BreadcrumbLinkProps,
  BreadcrumbLinkState
> {
  static readonly componentId = 'Breadcrumb.Link'

  static allowedProps = allowedProps
  static defaultProps = {}

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }
  constructor(props: BreadcrumbLinkProps) {
    super(props)

    this.state = {
      isTruncated: false
    }
  }
  handleTruncation(isTruncated: boolean) {
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
      isCurrentPage
    } = this.props

    const { isTruncated } = this.state
    const props = omitProps(this.props, BreadcrumbLink.allowedProps)

    const isInteractive = onClick || href
    return (
      <Tooltip
        renderTip={children}
        preventTooltip={!isTruncated}
        // this wraps the achor/button tag in a span and puts the aria-describedby on that instead of the anchor/button tag
        // to avoid SRs reading the text twice when there is already an aria-label
        {...(isInteractive && { as: 'span' })}
      >
        <Link
          {...props}
          href={href}
          renderIcon={renderIcon}
          iconPlacement={iconPlacement}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          isWithinText={false}
          elementRef={this.handleRef}
          forceButtonRole={false}
          {...(isCurrentPage && { 'aria-current': 'page' })}
          {...(isTruncated && {
            ...(typeof children === 'string' && { 'aria-label': children }),
            ...(!isInteractive && { role: 'text' })
          })}
          data-cid="BreadcrumbLink"
        >
          <TruncateText
            onUpdate={(isTruncated) => this.handleTruncation(isTruncated)}
          >
            <span aria-hidden={isTruncated}>{children}</span>
          </TruncateText>
        </Link>
      </Tooltip>
    )
  }
}

export default BreadcrumbLink
export { BreadcrumbLink }
