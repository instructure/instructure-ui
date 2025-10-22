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
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type { OtherHTMLAttributes, TabsTheme } from '@instructure/shared-types'
import type { TextDirectionContextConsumerProps } from '@instructure/ui-i18n'
import type { ViewOwnProps } from '@instructure/ui-view'

type TabsOwnProps = {
  /**
   * children of type `Tabs.Panel`
   */
  children?: React.ReactNode // TODO: oneOf([Panel, null])
  variant?: 'default' | 'secondary'
  /**
   * A screen ready only label for the list of tabs
   */
  screenReaderLabel?: string
  /**
   * Called when the selected tab should change.
   * @param tabData.index - The zero-based index of the tab that was selected
   * @param tabData.id - The HTML `id` of the tab that was selected
   */
  onRequestTabChange?: (
    event: React.MouseEvent<ViewOwnProps> | React.KeyboardEvent<ViewOwnProps>,
    tabData: { index: number; id?: string }
  ) => void
  maxWidth?: string | number
  maxHeight?: string | number
  minHeight?: string | number
  fixHeight?: string | number
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
   */
  padding?: Spacing
  textAlign?: 'start' | 'center' | 'end'
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  /**
   * Choose whether Tabs should stack or scroll when they exceed the width of their
   * container.
   */
  tabOverflow?: 'stack' | 'scroll'
  shouldFocusOnRender?: boolean
}

type PropKeys = keyof TabsOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TabsProps = TabsOwnProps &
  TextDirectionContextConsumerProps &
  WithStyleProps<TabsTheme, TabsStyle> &
  OtherHTMLAttributes<TabsOwnProps>

type TabsStyle = ComponentStyle<
  | 'tabs'
  | 'container'
  | 'tabList'
  | 'panelsContainer'
  | 'startScrollOverlay'
  | 'endScrollOverlay'
> & {
  scrollOverlayWidthDefault: string
  scrollOverlayWidthSecondary: string
}

type TabsState = {
  withTabListOverflow: boolean
  showStartOverLay: boolean
  showEndOverLay: boolean
}
const allowedProps: AllowedPropKeys = [
  'children',
  'variant',
  'screenReaderLabel',
  'onRequestTabChange',
  'maxWidth',
  'maxHeight',
  'minHeight',
  'fixHeight',
  'margin',
  'padding',
  'textAlign',
  'elementRef',
  'tabOverflow',
  'shouldFocusOnRender'
]

export type { TabsProps, TabsState, TabsStyle }
export { allowedProps }
