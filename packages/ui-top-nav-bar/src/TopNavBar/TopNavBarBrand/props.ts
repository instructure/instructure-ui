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

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  TopNavBarBrandTheme,
  OtherHTMLAttributes,
  PropValidators,
  AsElementType
} from '@instructure/shared-types'
import type { ViewOwnProps } from '@instructure/ui-view'

import type { TopNavBarContextType } from '../TopNavBarContext'

import { TopNavBarBrand } from './index'

type BrandChild = React.ComponentElement<TopNavBarBrandProps, TopNavBarBrand>

type TopNavBarBrandOwnProps = {
  /**
   * A label is required for accessibility (e.g. name).
   */
  screenReaderLabel: string

  /**
   * The app/product/brand/company/etc. name.
   */
  renderName?: React.ReactNode

  /**
   * The app/product/brand/company/etc. logo or icon.
   * The icon is not displayed in "smallViewport" mode.
   */
  renderIcon?: React.ReactNode

  /**
   * Background color of the brand name.
   * The background is not displayed in "smallViewport" mode.
   */
  nameBackground?: string

  /**
   * Background color of the icon, usually the brand color (when an icon is provided).
   * The background is not displayed in "smallViewport" mode.
   */
  iconBackground?: string

  /**
   * If the item goes to a new page, pass a href.
   */
  href?: string

  /**
   * If the item does not go to a new page, pass an onClick
   */
  onClick?: (event: React.MouseEvent<ViewOwnProps>) => void

  /**
   * The element type to render as (will default to `<a>` if href is provided)
   */
  as?: AsElementType

  /**
   * A function that returns a reference to root HTML element
   */
  elementRef?: (el: HTMLDivElement | null) => void
}

type PropKeys = keyof TopNavBarBrandOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TopNavBarBrandProps = TopNavBarBrandOwnProps &
  WithStyleProps<TopNavBarBrandTheme, TopNavBarBrandStyle> &
  OtherHTMLAttributes<TopNavBarBrandOwnProps>

type TopNavBarBrandStyle = ComponentStyle<
  | 'topNavBarBrand'
  | 'container'
  | 'nameContainer'
  | 'name'
  | 'iconContainer'
  | 'icon'
> &
  Pick<TopNavBarBrandTheme, 'focusOutlineInset'>

type TopNavBarBrandStyleProps = {
  layout: TopNavBarContextType['layout']
}

const propTypes: PropValidators<PropKeys> = {
  screenReaderLabel: PropTypes.string.isRequired,
  renderName: PropTypes.node,
  renderIcon: PropTypes.node,
  nameBackground: PropTypes.string,
  iconBackground: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  as: PropTypes.elementType,
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'screenReaderLabel',
  'renderName',
  'renderIcon',
  'nameBackground',
  'iconBackground',
  'href',
  'onClick',
  'as',
  'elementRef'
]

export type {
  BrandChild,
  TopNavBarBrandProps,
  TopNavBarBrandOwnProps,
  TopNavBarBrandStyle,
  TopNavBarBrandStyleProps
}
export { propTypes, allowedProps }
