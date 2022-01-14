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

import PropTypes from 'prop-types'

import type {
  OtherHTMLAttributes,
  PickPropsWithExceptions,
  PropValidators,
  AsElementType,
  OptionsSeparatorTheme
} from '@instructure/shared-types'
import type { WithStyleProps } from '@instructure/emotion'
import type { OptionsSeparatorProps } from '@instructure/ui-options'

type DrilldownSeparatorOwnProps = {
  id?: string

  /**
   * Element type to render as
   */
  as?: AsElementType
}

type PropKeys = keyof DrilldownSeparatorOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DrilldownSeparatorProps =
  // we are passing all props to Options.Separator
  PickPropsWithExceptions<OptionsSeparatorProps, 'as'> &
    DrilldownSeparatorOwnProps &
    WithStyleProps<OptionsSeparatorTheme, null> &
    OtherHTMLAttributes<DrilldownSeparatorOwnProps>

const propTypes: PropValidators<PropKeys> = {
  id: PropTypes.string,
  as: PropTypes.elementType
}

const allowedProps: AllowedPropKeys = ['id', 'as']

export type { DrilldownSeparatorProps }
export { propTypes, allowedProps }
