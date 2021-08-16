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

import {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'

export type MenuProps = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  label?: string
  disabled?: boolean
  trigger?: React.ReactNode
  placement?: PlacementPropValues
  defaultShow?: boolean
  show?: any // TODO: controllable(PropTypes.bool, 'onToggle', 'defaultShow')
  onToggle?: (...args: any[]) => any
  onSelect?: (...args: any[]) => any
  onDismiss?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onMouseOver?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  onKeyUp?: (...args: any[]) => any
  menuRef?: (...args: any[]) => any
  popoverRef?: (...args: any[]) => any
  mountNode?: PositionMountNode
  constrain?: PositionConstraint
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  shouldHideOnSelect?: boolean
  shouldFocusTriggerOnClose?: boolean
  type?: 'flyout'
  id?: string
  withArrow?: boolean
  offsetX?: string | number
  offsetY?: string | number
}
