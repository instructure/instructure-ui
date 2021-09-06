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

import type { PropValidators } from '@instructure/shared-types'
import type { WithStyleProps } from '@instructure/emotion'

export type TruncateTextOwnProps = {
  maxLines?: string | number
  position?: 'end' | 'middle'
  truncate?: 'character' | 'word'
  ellipsis?: string
  ignore?: string[]
  debounce?: number
  onUpdate?: (...args: any[]) => any
  shouldTruncateWhenInvisible?: boolean
  children: React.ReactNode
}

type PropKeys = keyof TruncateTextOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TruncateTextProps = TruncateTextOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * The content to be truncated.
   */
  children: PropTypes.node.isRequired,
  /**
   * Number of lines to allow before truncating. `auto` will fit to parent
   */
  maxLines: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Where to place the ellipsis within the string
   */
  position: PropTypes.oneOf(['end', 'middle']),
  /**
   * Add ellipsis after words or after any character
   */
  truncate: PropTypes.oneOf(['character', 'word']),
  /**
   * A string to use as the ellipsis
   */
  ellipsis: PropTypes.string,
  /**
   * Characters to ignore at truncated end of string
   */
  ignore: PropTypes.arrayOf(PropTypes.string),
  /**
   * Debounce delay in milliseconds
   */
  debounce: PropTypes.number,
  /**
   * Callback when truncated text has changed
   */
  onUpdate: PropTypes.func,
  /**
   * Force truncation of invisible elements (hack; will be removed in favor
   * of a better fix)
   */
  // eslint-disable-next-line react/require-default-props
  shouldTruncateWhenInvisible: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'children',
  'maxLines',
  'position',
  'truncate',
  'ellipsis',
  'ignore',
  'debounce',
  'onUpdate',
  'shouldTruncateWhenInvisible'
]

export type { TruncateTextProps }
export { propTypes, allowedProps }
