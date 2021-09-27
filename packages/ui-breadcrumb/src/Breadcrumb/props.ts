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

import { Children } from '@instructure/ui-prop-types'
import { ThemeablePropTypes } from '@instructure/emotion'

import { BreadcrumbLink } from './BreadcrumbLink'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type { BreadcrumbTheme, PropValidators } from '@instructure/shared-types'

type BreadcrumbOwnProps = {
  children?: React.ReactNode // TODO: oneOf([BreadcrumbLink])
  label: string
  size?: 'small' | 'medium' | 'large'
  margin?: Spacing
}

type PropKeys = keyof BreadcrumbOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BreadcrumbProps = BreadcrumbOwnProps &
  WithStyleProps<BreadcrumbTheme, BreadcrumbStyle>

type BreadcrumbStyle = ComponentStyle<'breadcrumb' | 'crumb' | 'separator'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * children of type Breadcrumb.Link
   */
  children: Children.oneOf([BreadcrumbLink]),
  /**
   * An accessible label for the navigation
   */
  label: PropTypes.string.isRequired,
  /**
   * Sets the font-size of the breadcrumb text
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing
}

const allowedProps: AllowedPropKeys = ['children', 'label', 'margin', 'size']

export type { BreadcrumbProps, BreadcrumbStyle }
export { propTypes, allowedProps }
