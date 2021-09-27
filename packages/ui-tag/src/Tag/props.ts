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

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type { PropValidators, TagTheme } from '@instructure/shared-types'

type TagOwnProps = {
  className?: string
  text: string | React.ReactNode
  title?: string
  disabled?: boolean
  readOnly?: boolean
  dismissible?: boolean
  margin?: Spacing
  onClick?: (...args: any[]) => any
  elementRef?: (...args: any[]) => any
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'inline'
}

type PropKeys = keyof TagOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TagProps = TagOwnProps & WithStyleProps<TagTheme, TagStyle>

type TagStyle = ComponentStyle<'tag' | 'text' | 'icon'>

const propTypes: PropValidators<PropKeys> = {
  className: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  title: PropTypes.string,
  /**
   * Whether or not to disable the tag
   */
  disabled: PropTypes.bool,
  /**
   * Works just like disabled but keeps the same styles as if it were active
   */
  readOnly: PropTypes.bool,
  dismissible: PropTypes.bool,
  /**
   * Valid values are `0`, `none`, `auto`, `xxxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  /**
   * If you add an onClick prop, Tag renders as a clickable button
   */
  onClick: PropTypes.func,
  /**
   * Provides a reference to the underlying html root element
   */
  elementRef: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'inline'])
}

const allowedProps: AllowedPropKeys = [
  'className',
  'text',
  'title',
  'disabled',
  'readOnly',
  'dismissible',
  'margin',
  'onClick',
  'elementRef',
  'size',
  'variant'
]

export type { TagProps, TagStyle }
export { propTypes, allowedProps }
