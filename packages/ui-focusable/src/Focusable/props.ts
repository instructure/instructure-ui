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

import type { PropValidators } from '@instructure/shared-types'
import PropTypes from 'prop-types'
import {
  CElement,
  DOMElement,
  FunctionComponentElement,
  ReactComponentElement,
  ReactElement
} from 'react'

export type FocusableRenderOptions = {
  /**
   * Is the element focused (via keyboard only)?
   */
  focused: boolean
  /**
   * The focusable element
   */
  focusable?: HTMLElement
  /**
   * Whether the focus state should be visible or not
   */
  focusVisible: boolean
  attachRef: (el: Element) => void
}

type FocusableRenderFunction = (
  opts: FocusableRenderOptions
) => (
  | ReactElement
  | ReactComponentElement<any>
  | DOMElement<any, any>
  | CElement<any, any>
  | FunctionComponentElement<any>
) & { ref?: (args: any[]) => unknown }

type FocusableOwnProps = {
  /**
   * The function called on each render. Identical to `render()`
   */
  children?: FocusableRenderFunction
  /**
   * The function called on each render. Identical to `children()`
   */
  render?: FocusableRenderFunction
}

type PropKeys = keyof FocusableOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FocusableProps = FocusableOwnProps

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.func,
  render: PropTypes.func
}

const allowedProps: AllowedPropKeys = ['children', 'render']

type FocusableState = {
  focused: boolean
  focusable?: HTMLElement
}

export type { FocusableProps, FocusableState }
export { propTypes, allowedProps }
