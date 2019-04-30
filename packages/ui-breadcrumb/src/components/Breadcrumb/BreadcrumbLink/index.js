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
import Link from '@instructure/ui-elements/lib/components/Link'
import TruncateText from '@instructure/ui-elements/lib/components/TruncateText'
import { omitProps } from '@instructure/ui-react-utils/lib/omitProps'
import testable from '@instructure/ui-testable'

/**
---
parent: Breadcrumb
---
**/
@testable()
export default class BreadcrumbLink extends Component {
  static propTypes = {
    /**
    * Content to render as the crumb, generally should be text.
    */
    children: PropTypes.node.isRequired,
    /**
    * Link the crumb should direct to; if an href is provided, the crumb will render as a link
    */
    href: PropTypes.string,
    /**
    * If the BreadcrumbLink has an onClick prop (and no href), it will render as a button
    */
    onClick: PropTypes.func,
    /**
    * Sets the font-size of the breadcrumb text
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Add an icon to the BreadcrumbLink
    */
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    /**
    * Place the icon before or after the text in the BreadcrumbLink
    */
    iconPlacement: PropTypes.oneOf(['start', 'end'])
  }

  static defaultProps = {
    href: undefined,
    onClick: undefined,
    size: undefined,
    icon: undefined,
    iconPlacement: undefined
  }

  render () {
    const {
      children,
      href,
      icon,
      iconPlacement,
      onClick
    } = this.props

    const props = omitProps(this.props, BreadcrumbLink.propTypes)

    // Link will display a button by default, even if there is no action.
    // Force a span in this case.
    const as = href || onClick ? undefined : 'span'

    return (
      <Link
        as={as}
        {...props}
        href={href}
        icon={icon}
        iconPlacement={iconPlacement}
        onClick={onClick}
      >
        <TruncateText>{children}</TruncateText>
      </Link>
    )
  }
}
