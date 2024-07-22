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
type NavOwnProps = {
  docs: Record<string, any>
  sections: Record<string, any>
  themes?: Record<string, any>
  icons?: Record<string, any> | null
  selected?: string
}
type PropKeys = keyof NavOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type NavProps = NavOwnProps

const propTypes: PropValidators<PropKeys> = {
  docs: PropTypes.object.isRequired,
  sections: PropTypes.object.isRequired,
  themes: PropTypes.object,
  icons: PropTypes.object,
  selected: PropTypes.string
}
const allowedProps: AllowedPropKeys = [
  'docs',
  'icons',
  'sections',
  'selected',
  'themes'
]
type NavState = {
  query: any
  expandedSections: Record<string, any>
  userToggling: boolean
  queryStr?: string
}
export type { NavProps, NavState }
export { allowedProps, propTypes }
