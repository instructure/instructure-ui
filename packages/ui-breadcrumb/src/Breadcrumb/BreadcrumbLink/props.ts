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

import React from 'react'
import PropTypes from 'prop-types'

import type {
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { ViewOwnProps } from '@instructure/ui-view'

type BreadcrumbLinkOwnProps = {
  /**
   * Content to render as the crumb, generally should be text.
   */
  children: React.ReactNode
  /**
   * Link the crumb should direct to; if an href is provided, the crumb will render as a link
   */
  href?: string
  /**
   * If the Breadcrumb.Link has an onClick prop (and no href), it will render as a button
   */
  onClick?: (event: React.MouseEvent<ViewOwnProps, MouseEvent>) => void
  /**
   * Sets the font-size of the breadcrumb text
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Add an icon to the Breadcrumb.Link
   */
  renderIcon?: React.ReactNode | (() => React.ReactNode)
  /**
   * Place the icon before or after the text in the Breadcrumb.Link
   */
  iconPlacement?: 'start' | 'end'
}

type PropKeys = keyof BreadcrumbLinkOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BreadcrumbLinkProps = BreadcrumbLinkOwnProps &
  OtherHTMLAttributes<BreadcrumbLinkOwnProps>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  iconPlacement: PropTypes.oneOf(['start', 'end'])
}

const allowedProps: AllowedPropKeys = [
  'children',
  'href',
  'iconPlacement',
  'onClick',
  'renderIcon',
  'size'
]

export type { BreadcrumbLinkProps }
export { propTypes, allowedProps }
