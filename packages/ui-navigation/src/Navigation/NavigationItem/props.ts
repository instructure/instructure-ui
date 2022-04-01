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
import PropTypes from 'prop-types'

import type {
  AsElementType,
  PropValidators,
  NavigationItemTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type NavigationItemOwnProps = {
  elementRef?: (el: Element | null) => void
  icon: React.ReactNode
  label: React.ReactNode
  as?: AsElementType
  href?: string
  onClick?: (...args: any[]) => void
  selected?: boolean
  minimized?: boolean
}

type PropKeys = keyof NavigationItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type NavigationItemProps = NavigationItemOwnProps &
  WithStyleProps<NavigationItemTheme, NavigationItemStyle> &
  OtherHTMLAttributes<NavigationItemOwnProps>

type NavigationItemStyle = ComponentStyle<'navigationItem' | 'icon' | 'label'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * The reference to the underlying HTML element
   */
  elementRef: PropTypes.func,
  /**
   * The visual to display (ex. an Image, Logo, Avatar, or Icon)
   */
  icon: PropTypes.node.isRequired,
  /**
   * The text to display  for the Navigation Link
   */
  label: PropTypes.node.isRequired,
  /**
   * The element type to render as (will default to `<a>` if href is provided)
   */
  as: PropTypes.elementType,
  /**
   * If the NavigationItem goes to a new page, pass an href
   */
  href: PropTypes.string,
  /**
   * If the NavigationItem does not go to a new page pass an onClick
   */
  onClick: PropTypes.func,
  /**
   * Denotes which NavigationItem is currently selected
   */
  selected: PropTypes.bool,
  /**
   * When minimized is set to true, the `<Navigation />` shows icons only while the text becomes a tooltip. When it is set to false, the `<Navigation />` shows text in addition to the icons
   */
  minimized: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'elementRef',
  'icon',
  'label',
  'as',
  'href',
  'onClick',
  'selected',
  'minimized'
]

export type { NavigationItemProps, NavigationItemStyle }
export { propTypes, allowedProps }
