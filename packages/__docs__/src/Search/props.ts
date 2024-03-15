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

type OptionType = {
  id: string
  value: string
  label: string
  groupLabel: string
  tags: string
  isWIP: string | boolean
  category?: string
  description?: string
  title?: string
}

type SearchOwnProps = {
  options: Record<string, OptionType>
}

type PropKeys = keyof SearchOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SearchProps = SearchOwnProps

const propTypes: PropValidators<PropKeys> = {
  options: PropTypes.object
}

type SearchState = {
  inputValue: string
  isShowingOptions: boolean
  isLoading: boolean
  highlightedOptionId: string | null
  selectedOptionId: string | null
  selectedOptionLabel: string
  filteredOptions: {
    id: string
    value: string
    label: string
    groupLabel: string
    tags: string
    isWIP: string | boolean
    category?: string
  }[]
  announcement: string | null
  searchMatches: any[]
  idx: any
}

const allowedProps: AllowedPropKeys = ['options']
export type { SearchProps, SearchState, OptionType }
export { propTypes, allowedProps }
