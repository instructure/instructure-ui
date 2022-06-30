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

import type {
  AsElementType,
  PropValidators,
  OptionsTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import { Renderable } from '@instructure/shared-types'

type OptionsOwnProps = {
  /**
   * Element type to render as
   */
  as?: AsElementType
  /**
   * The aria role of the element
   */
  role?: string
  /**
   * The the actual list element
   */
  elementRef?: (element: Element | null) => void
  /**
   * Content to render as a label. Mostly for when the component is nested
   */
  renderLabel?: Renderable

  //TODO children has to be typed better
  //e.g.: ChildrenPropTypes.oneOf(['Options', 'Item', 'Separator']))
  children?: React.ReactNode
}

type PropKeys = keyof OptionsOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type OptionsProps = OptionsOwnProps &
  WithStyleProps<OptionsTheme, OptionsStyle> &
  OtherHTMLAttributes<OptionsOwnProps> &
  WithDeterministicIdProps

type OptionsStyle = ComponentStyle<'options' | 'list' | 'label'>

const propTypes: PropValidators<PropKeys> = {
  as: PropTypes.elementType,
  role: PropTypes.string,
  elementRef: PropTypes.func,
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: ChildrenPropTypes.oneOf(['Options', 'Item', 'Separator'])
}

const allowedProps: AllowedPropKeys = [
  'as',
  'role',
  'elementRef',
  'renderLabel',
  'children'
]

export type { OptionsProps, OptionsStyle }
export { propTypes, allowedProps }
