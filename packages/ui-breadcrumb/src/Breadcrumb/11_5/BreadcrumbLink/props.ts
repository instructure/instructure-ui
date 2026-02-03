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
import type {
  PickPropsWithExceptions,
  OtherHTMLAttributes,
  Renderable
} from '@instructure/shared-types'
import type { ViewOwnProps } from '@instructure/ui-view'
import type { LinkProps } from '@instructure/ui-link'

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
   * Fires when the Link is hovered
   */
  onMouseEnter?: (event: React.MouseEvent<ViewOwnProps, MouseEvent>) => void
  /**
   * Sets the font-size of the breadcrumb text
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Add an icon to the Breadcrumb.Link
   */
  renderIcon?: Renderable
  /**
   * Place the icon before or after the text in the Breadcrumb.Link
   */
  iconPlacement?: 'start' | 'end'
  /**
   * Whether the page this breadcrumb points to is the current one. If true, it sets aria-current="page".
   * If this prop is not set to true on any breadcrumb element, the one recieving the aria-current="page" will always be the last element, unless the last element's isCurrentPage prop is explicity set to false.
   */
  isCurrentPage?: boolean
}

type PropKeys = keyof BreadcrumbLinkOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BreadcrumbLinkProps = PickPropsWithExceptions<
  LinkProps,
  | 'children'
  | 'href'
  | 'onClick'
  | 'renderIcon'
  | 'iconPlacement'
  | 'elementRef'
> &
  BreadcrumbLinkOwnProps &
  OtherHTMLAttributes<BreadcrumbLinkOwnProps & LinkProps>
const allowedProps: AllowedPropKeys = [
  'children',
  'href',
  'iconPlacement',
  'onClick',
  'onMouseEnter',
  'renderIcon',
  'size',
  'isCurrentPage'
]

type BreadcrumbLinkState = {
  isTruncated: boolean
}

export type { BreadcrumbLinkProps, BreadcrumbLinkState }
export { allowedProps }
