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

import type { LiveRegion, UIElement } from '@instructure/shared-types'

export type FocusRegionOptions = {
  /**
   * Function called when tab focus leaves the focusable content. This only
   * occurs when `shouldContainFocus` is set to false.
   */
  onBlur?: (event: React.UIEvent | React.FocusEvent) => void
  /**
   * Function called when a focus region is dismissed. This can happen when
   * the user presses the escape key and `shouldCloseOnEscape` is true or
   * when an IFrame is clicked or when anything outside the focus region
   * is clicked if `shouldCloseOnDocumentClick` is true.
   * @param event The event triggered the dismissal
   * @param documentClick Whether the dismissal was triggered by a mouse click.
   */
  onDismiss?: (
    event: React.UIEvent | React.FocusEvent,
    documentClick?: boolean
  ) => void
  /**
   * An element or a function returning an element to focus by default
   */
  defaultFocusElement?: UIElement
  /**
   * An element, function returning an element, or array of elements that will not be hidden from
   * the screen reader when the focus region is active
   */
  liveRegion?: LiveRegion
  /**
   * When set to true or its an array that includes the 'keyboard' string,
   * the keyboard and screenreader focus is trapped; when set to 'screenreader'
   * only the screenreader focus is trapped.
   */
  shouldContainFocus?: boolean | ('keyboard' | 'screenreader')[]
  /**
   * When set to true the keyboard focus is returned to the active element
   * before the focus region was activated.
   */
  shouldReturnFocus?: boolean
  /**
   * When set to true the `onDismiss` function is called on a click outside
   * the focus region.
   */
  shouldCloseOnDocumentClick?: boolean
  /**
   * When set to true the `onDismiss` function is called on the `Escape`
   * keypress
   */
  shouldCloseOnEscape?: boolean
  /**
   * When set to true, the `defaultFocusElement` is focused on initialization.
   */
  shouldFocusOnOpen?: boolean
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  /**
   * Whether or not the element is a Tooltip
   */
  isTooltip?: boolean
  /**
   * The ID of the `FocusRegion` this belongs to. Used only for debugging.
   */
  regionId?: string
}
