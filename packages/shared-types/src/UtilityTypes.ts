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

/** Recursively makes every property in T optional */
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

/** Uses a union as optional keys for a Record */
type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}

/**
 * Make all properties in T nullable
 */
type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

/** Makes all possible combination for a CSS prop to accept 1 to 4 values */
type CSSShorthandValue<Value extends string> =
  | `${Value}`
  | `${Value} ${Value}`
  | `${Value} ${Value} ${Value}`
  | `${Value} ${Value} ${Value} ${Value}`

/**
 * Generates a type which contains HTML attributes for the given element
 * excluding attributes which are defined in Props.
 *
 * @example
 * class Button extends React.Component<ButtonProps & OtherHTMLAttributes<ButtonProps, React.ButtonHTMLAttributes<ButtonProps>>> {}
 */
type OtherHTMLAttributes<
  Props,
  Attributes extends React.HTMLAttributes<Props> = React.AllHTMLAttributes<Props>
> = Omit<Attributes, keyof Props>

type PropValidators<PropKeys extends string> = Record<
  PropKeys,
  PropTypes.Validator<unknown>
>

export type {
  DeepPartial,
  PartialRecord,
  Nullable,
  CSSShorthandValue,
  OtherHTMLAttributes,
  PropValidators
}
