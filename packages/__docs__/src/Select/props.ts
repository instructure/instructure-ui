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

import { Renderable } from '@instructure/shared-types'

type SelectOwnProps = {
  name: string
  renderLabel: React.ReactNode | (() => React.ReactNode)
  renderBeforeInput?: Renderable
  id?: string
  value?: string
  onChange?: (e: React.SyntheticEvent, params: { value: string }) => void
  children: React.ReactElement[]
}

type PropKeys = keyof SelectOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SelectProps = SelectOwnProps

const propTypes: PropValidators<PropKeys> = {
  name: PropTypes.string.isRequired,
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  renderBeforeInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired
}

type SelectState = {
  isShowing: boolean
  inputValue: string
  highlightedValue: string
  selectedValue: string
}

const allowedProps: AllowedPropKeys = [
  'name',
  'renderLabel',
  'renderBeforeInput',
  'id',
  'value',
  'onChange',
  'children'
]
export type { SelectProps, SelectState }
export { propTypes, allowedProps }
