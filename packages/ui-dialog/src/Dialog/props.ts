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

import { element } from '@instructure/ui-prop-types'

import type {
  AsElementType,
  OtherHTMLAttributes,
  PropValidators,
  UIElement
} from '@instructure/shared-types'
import type { FocusRegionOptions } from '@instructure/ui-a11y-utils'

type DialogOwnProps = {
  /**
   * The children to be rendered within the `<Dialog />`
   */
  children?: React.ReactNode
  /**
   * The element to render as the component root, `span` by default
   */
  as?: AsElementType
  display?: 'auto' | 'block' | 'inline-block'
  /**
   * The aria-label to read for screen reader.
   */
  label?: string
  /**
   * Whether or not the `<Dialog />` is open
   */
  open?: boolean
  /**
   * An element or a function returning an element that wraps the content of the `<Dialog />`
   */
  contentElement?: UIElement
} & FocusRegionOptions

type PropKeys = keyof DialogOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DialogProps = DialogOwnProps & OtherHTMLAttributes<DialogOwnProps>

// JSDoc comments are here, because the doc app is not able to pick them up if
// they are in another package
const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node,
  as: PropTypes.elementType,
  display: PropTypes.oneOf(['auto', 'block', 'inline-block']),
  label: PropTypes.string,
  open: PropTypes.bool,
  /**
   * Function called when tab focus leaves the focusable content. This only
   * occurs when `shouldContainFocus` is set to false.
   */
  onBlur: PropTypes.func,
  /**
   * Function called when a focus region is dismissed. This can happen when
   * the user presses the escape key and `shouldCloseOnEscape` is true or
   * when an IFrame is clicked or when anything outside the focus region
   * is clicked if `shouldCloseOnDocumentClick` is true.
   * @param event The event triggered the dismissal
   * @param documentClick Whether the dismissal was triggered by a mouse click.
   */
  onDismiss: PropTypes.func,
  /**
   * An element or a function returning an element to focus by default
   */
  defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  contentElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * An element, function returning an element, or array of elements that will not be hidden from
   * the screen reader when the focus region is active
   */
  liveRegion: PropTypes.oneOfType([
    element,
    PropTypes.arrayOf(element),
    PropTypes.func
  ]),
  /**
   * When set to true, or it is an array that includes the 'keyboard' string,
   * the keyboard and screenreader focus is trapped; when set to 'screenreader'
   * only the screenreader focus is trapped.
   */
  shouldContainFocus: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['keyboard', 'screenreader'])
  ]),
  /**
   * When set to true the keyboard focus is returned to the active element
   * before the focus region was activated.
   */
  shouldReturnFocus: PropTypes.bool,
  /**
   * When set to true the `onDismiss` function is called on a click outside
   * the focus region.
   */
  shouldCloseOnDocumentClick: PropTypes.bool,
  /**
   * When set to true the `onDismiss` function is called on the `Escape`
   * keypress
   */
  shouldCloseOnEscape: PropTypes.bool,
  /**
   * When set to true, the `defaultFocusElement` is focused on initialization.
   */
  shouldFocusOnOpen: PropTypes.bool,
  /**
   * provides a reference to the underlying html root element
   */
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'children',
  'as',
  'display',
  'label',
  'open',
  'onBlur',
  'onDismiss',
  'defaultFocusElement',
  'contentElement',
  'liveRegion',
  'shouldContainFocus',
  'shouldReturnFocus',
  'shouldCloseOnDocumentClick',
  'shouldCloseOnEscape',
  'shouldFocusOnOpen',
  'elementRef'
]

export type { DialogProps }
export { propTypes, allowedProps }
