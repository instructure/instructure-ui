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

import { TruncateText } from '@instructure/ui-truncate-text'
import { Link } from '@instructure/ui-link'
import { omitProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { propTypes, defaultProps, allowedProps } from './props'
import type { BreadcrumbLinkProps } from './props'

/**
---
parent: Breadcrumb
id: Breadcrumb.Link
---
**/

@testable()
class BreadcrumbLink extends Component<BreadcrumbLinkProps> {
  static readonly componentId = 'Breadcrumb.Link'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = defaultProps

  render() {
    const { children, href, renderIcon, iconPlacement, onClick } = this.props

    const props = omitProps(this.props, BreadcrumbLink.propTypes)

    return (
      <Link
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Breadcr... Remove this comment to see the full error message
        as={this.element}
        {...props}
        href={href}
        renderIcon={renderIcon}
        iconPlacement={iconPlacement}
        onClick={onClick}
        isWithinText={false}
      >
        <TruncateText>{children}</TruncateText>
      </Link>
    )
  }
}

export default BreadcrumbLink
export { BreadcrumbLink }
