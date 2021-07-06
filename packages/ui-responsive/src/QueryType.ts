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

/**
 * Valid keys for the Query object
 */
type ValidQueryKey = 'minHeight' | 'maxHeight' | 'minWidth' | 'maxWidth'

/**
 * Query objects with keys representing the breakpoint condition and values representing a breakpoint value as a string or number. Ex. `{ maxWidth: 400 }`, `{ minWidth: '600em'}`
 */
type Query = {
  [queryKey in ValidQueryKey]?: string | number
}

/**
 * Consists of an object where the keys define the names of breakpoints and the values are Query objects. Ex. `{small: { maxWidth: 400 }, large: { minWidth: '600em'}}`
 */
type BreakpointQueries = { [breakpointName: string]: Query }

/**
 * List of query names (breakpoints) currently matching
 */
type QueriesMatching = string[]

export type { BreakpointQueries, Query, ValidQueryKey, QueriesMatching }
