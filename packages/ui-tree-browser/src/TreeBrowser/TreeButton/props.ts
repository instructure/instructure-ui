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

import type { WithStyleProps } from '@instructure/emotion'
import { PropValidators } from '@instructure/shared-types'

export type TreeBrowserButtonOwnProps = {
  id?: string | number
  name?: string
  descriptor?: string
  type?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'folderTree' | 'indent'
  collectionIcon?: React.ReactNode | ((...args: any[]) => any)
  collectionIconExpanded?: React.ReactNode | ((...args: any[]) => any)
  itemIcon?: React.ReactNode | ((...args: any[]) => any)
  thumbnail?: string
  onClick?: (...args: any[]) => any
  expanded?: boolean
  selected?: boolean
  focused?: boolean
  level?: number
  containerRef?: (...args: any[]) => any // TODO: function () {}
  renderContent?: (...args: any[]) => any // TODO: function () {}
}

type PropKeys = keyof TreeBrowserButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TreeBrowserButtonProps = TreeBrowserButtonOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  descriptor: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['folderTree', 'indent']),
  collectionIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  collectionIconExpanded: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  itemIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  thumbnail: PropTypes.string,
  onClick: PropTypes.func,
  expanded: PropTypes.bool,
  selected: PropTypes.bool,
  focused: PropTypes.bool,
  level: PropTypes.number,
  containerRef: PropTypes.func,
  renderContent: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'id',
  'name',
  'descriptor',
  'type',
  'size',
  'variant',
  'collectionIcon',
  'collectionIconExpanded',
  'itemIcon',
  'thumbnail',
  'onClick',
  'expanded',
  'selected',
  'focused',
  'level',
  'containerRef',
  'renderContent'
]

export type { TreeBrowserButtonProps }
export { propTypes, allowedProps }
