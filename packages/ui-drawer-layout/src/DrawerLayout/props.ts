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

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { textDirectionContextConsumer } from '@instructure/ui-i18n'

import { DrawerContent } from './DrawerContent'
import { DrawerTray } from './DrawerTray'

import type { BidirectionalProps } from '@instructure/ui-i18n'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { PropValidators } from '@instructure/shared-types'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type DrawerLayoutOwnProps = {
  /**
   * Exactly one of each of the following child types: `DrawerLayout.Content`, `DrawerLayout.Tray`
   */
  children?: React.ReactNode // TODO: oneOfEach([DrawerContent, DrawerTray])

  /**
   * Min width for the `<DrawerLayout.Content />`
   */
  minWidth?: string

  /**
   * Function called when the `<DrawerLayout.Content />` is resized and hits the `minWidth` breakpoint
   * Called with a boolean value, `true` if the tray is now overlaying the content or `false` if
   * it is side by side
   */
  onOverlayTrayChange?: (shouldOverlayTray: boolean) => void
} & BidirectionalProps

type PropKeys = keyof DrawerLayoutOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DrawerLayoutProps = DrawerLayoutOwnProps &
  WithStyleProps<null, DrawerLayoutStyle> & WithDeterministicIdProps

type DrawerLayoutStyle = ComponentStyle<'drawerLayout'>

type DrawerLayoutState = {
  shouldOverlayTray: boolean
  trayWidth: number
  contentWidth: number
}

const propTypes: PropValidators<PropKeys> = {
  children: ChildrenPropTypes.oneOfEach([DrawerContent, DrawerTray]),
  minWidth: PropTypes.string,
  onOverlayTrayChange: PropTypes.func,
  dir: PropTypes.oneOf(Object.values(textDirectionContextConsumer.DIRECTION))
}

const allowedProps: AllowedPropKeys = [
  'children',
  'minWidth',
  'onOverlayTrayChange',
  'dir'
]

export type { DrawerLayoutProps, DrawerLayoutState, DrawerLayoutStyle }
export { propTypes, allowedProps }
