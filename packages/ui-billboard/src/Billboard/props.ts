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

import { ThemeablePropTypes } from '@instructure/emotion'

import type { Spacing, WithStyleProps } from '@instructure/emotion'
import type {
  AsElementType,
  DefaultProps,
  PropValidators
} from '@instructure/shared-types'

type BillboardOwnProps = {
  hero?: React.ReactElement | ((...args: any[]) => any)
  size?: 'small' | 'medium' | 'large'
  as?: AsElementType
  elementRef?: (...args: any[]) => any
  heading?: string
  headingAs?: 'h1' | 'h2' | 'h3' | 'span'
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4'
  message?: React.ReactNode | ((...args: any[]) => any)
  onClick?: (...args: any[]) => any
  href?: string
  disabled?: boolean
  readOnly?: boolean
  margin?: Spacing
}

type PropKeys = keyof BillboardOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BillboardProps = BillboardOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * Provide an <Img> component or Instructure Icon for the hero image
   */
  hero: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * If you're using an icon, this prop will size it. Also sets the font-size
   * of the headline and message.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * the element type to render as
   */
  as: PropTypes.elementType,
  /**
   * provides a reference to the underlying html root element
   */
  elementRef: PropTypes.func,
  /**
   * The headline for the Billboard. Is styled as an h1 element by default
   */
  heading: PropTypes.string,
  /**
   * Choose the appropriately semantic tag for the heading
   */
  headingAs: PropTypes.oneOf(['h1', 'h2', 'h3', 'span']),
  /**
   * Choose the font-size for the heading (see the Heading component)
   */
  headingLevel: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']),
  /**
   * Instructions or information for the Billboard. Note: you should not pass
   * interactive content to this prop if you are also providing an `href` or
   * `onClick`. That would cause the Billboard to render as a button or link
   * and would result in nested interactive content.
   */
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * If you add an onClick prop, the Billboard renders as a clickable button
   */
  onClick: PropTypes.func,
  /**
   * If `href` is provided, Billboard will render as a link
   */
  href: PropTypes.string,
  /**
   * Whether or not to disable the billboard
   */
  disabled: PropTypes.bool,
  /**
   * Works just like disabled but keeps the same styles as if it were active
   */
  readOnly: PropTypes.bool,
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing
}

const allowedProps: AllowedPropKeys = [
  'as',
  'disabled',
  'elementRef',
  'heading',
  'headingAs',
  'headingLevel',
  'hero',
  'href',
  'margin',
  'message',
  'onClick',
  'readOnly',
  'size'
]

const defaultProps: DefaultProps<BillboardOwnProps> = {
  disabled: false,
  readOnly: false,
  size: 'medium',
  headingAs: 'span',
  headingLevel: 'h1',
  as: 'span',
  elementRef: () => {}
}

export type { BillboardProps }
export { propTypes, defaultProps, allowedProps }
