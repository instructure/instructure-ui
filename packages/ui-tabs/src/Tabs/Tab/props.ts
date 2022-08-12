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

import type {
  OtherHTMLAttributes,
  PropValidators,
  Renderable,
  TabsTabTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { ViewOwnProps } from '@instructure/ui-view'

type TabsTabOwnProps = {
  variant?: 'default' | 'secondary'
  id: string
  index: number
  controls: string
  isDisabled?: boolean
  isSelected?: boolean
  onClick?: (
    event: React.MouseEvent<ViewOwnProps>,
    tabData: { index: number; id: string }
  ) => void
  onKeyDown?: (
    event: React.KeyboardEvent<ViewOwnProps>,
    tabData: { index: number; id: string }
  ) => void
  children?: Renderable
}

type PropKeys = keyof TabsTabOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TabsTabProps = TabsTabOwnProps &
  WithStyleProps<TabsTabTheme, TabsTabStyle> &
  OtherHTMLAttributes<TabsTabOwnProps>

type TabsTabStyle = ComponentStyle<'tab'>

const propTypes: PropValidators<PropKeys> = {
  variant: PropTypes.oneOf(['default', 'secondary']),
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  controls: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

const allowedProps: AllowedPropKeys = [
  'variant',
  'id',
  'index',
  'controls',
  'isDisabled',
  'isSelected',
  'onClick',
  'onKeyDown',
  'children'
]

export type { TabsTabProps, TabsTabOwnProps, TabsTabStyle }
export { propTypes, allowedProps }
