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
 * The "dir" prop is forced to the given value because InstUI accepts only
 * these.
 *
 * @example
 * class Button extends React.Component<ButtonProps & OtherHTMLAttributes<ButtonProps, React.ButtonHTMLAttributes<ButtonProps>>> {}
 */
type OtherHTMLAttributes<
  Props,
  Attributes extends React.HTMLAttributes<
    Props & Element
  > = React.AllHTMLAttributes<Props & Element>
> = Omit<Attributes, keyof Props | 'dir'> & { dir?: 'ltr' | 'rtl' }

/**
 * Helper type for the propTypes object.
 * It ensures that the passed prop type keys match with the propType version.
 */
type PropValidators<PropKeys extends string> = Record<
  PropKeys,
  PropTypes.Validator<unknown>
>

/**
 * These props are not the components own prop, but we have to allow them,
 * since these are passed to another component.
 */
type PickPropsWithExceptions<
  TargetProps extends Record<string, any>,
  ExcludedProps extends keyof TargetProps
> = Omit<TargetProps, ExcludedProps>

export type {
  DeepPartial,
  PartialRecord,
  Nullable,
  CSSShorthandValue,
  OtherHTMLAttributes,
  PropValidators,
  PickPropsWithExceptions
}
