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
import { ResponsivePropTypes } from '../ResponsivePropTypes'

import type { PropValidators } from '@instructure/shared-types'
import { BreakpointQueries, QueriesMatching } from '../QueryType'

export interface ResponsivePropsObject {
  [propName: string]: any
}

/**
 * Consists of an object where the keys match the breakpoint names used in the query. The values are objects with keys representing prop names and values representing prop values Ex. `{small: { myProp: 'fillscreen' }, large: { myProp: 'fillcontainer' }}`
 */
export type ResponsiveByBreakpointProps = {
  [breakpointName: string]: ResponsivePropsObject
}

type ResponsiveOwnProps = {
  /**
   * Consists of an object where the keys define the names of breakpoints. The values are query objects
   * with keys representing the breakpoint condition and values representing a breakpoint value as a
   * string or number. Ex. `{small: { maxWidth: 400 }, large: { minWidth: '600em'}}`
   */
  query: BreakpointQueries

  /**
   * Specifies if the `<Responsive />` component should use element or media queries
   */
  match?: 'element' | 'media'

  /**
   * Consists of an object where the keys match the breakpoint names used in the query. The values
   * are objects with keys representing prop names and values representing prop values Ex.
   * `{small: { myProp: 'fillscreen' }, large: { myProp: 'fillcontainer' }}`
   */
  props?: ResponsiveByBreakpointProps

  /**
   * Function called on render with the following form `(props, matches) => {...}` where the props
   * are the current props to be applied and matches is an array of current matches from the query
   * prop. Either this or a `children` prop function must be supplied.
   */
  render?: (
    props?: ResponsivePropsObject | null,
    matches?: QueriesMatching
  ) => any

  /**
   * Function that takes the same form and arguments as the render prop. Either this or a `render`
   * prop function must be supplied.
   */
  children?: (
    props?: ResponsivePropsObject | null,
    matches?: QueriesMatching
  ) => any
}
type PropKeys = keyof ResponsiveOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ResponsiveProps = ResponsiveOwnProps

const propTypes: PropValidators<PropKeys> = {
  match: PropTypes.oneOf(['element', 'media']),
  query: PropTypes.objectOf(ResponsivePropTypes.validQuery).isRequired,
  props: PropTypes.objectOf(PropTypes.object),
  render: PropTypes.func,
  children: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'match',
  'query',
  'props',
  'render',
  'children'
]

export type { ResponsiveProps }
export { propTypes, allowedProps }
