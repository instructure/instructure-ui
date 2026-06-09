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

/*
 * React-flavored composite prop types for the v2 Alert. Framework-neutral
 * primitives — `AlertVariant`, `AlertTransition`, `AlertState`,
 * `AlertCorePropsOf`, `allowedProps`, etc. — live in ./types and can be
 * consumed without pulling React.
 */

import type { ReactNode } from 'react'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type { NewComponentTypes } from '@instructure/ui-themes'
import type { Renderable } from '@instructure/shared-types'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

import { allowedProps } from './types'
import type { AlertCorePropsOf, AlertState } from './types'

// React-flavored own props: pins the generic renderable slots to React types
// and layers the `margin` Spacing field that's specific to the React adapter
// (it's passed straight through to <View />).
type AlertOwnProps = AlertCorePropsOf<Renderable, ReactNode> & {
  margin?: Spacing
}

type PropKeys = keyof AlertOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type AlertProps = AlertOwnProps &
  WithStyleProps<ReturnType<NewComponentTypes['Alert']>, AlertStyle> &
  WithDeterministicIdProps

type AlertStyle = ComponentStyle<
  'alert' | 'icon' | 'closeButton' | 'content' | 'variantScreenReaderLabel'
>

export type { AlertProps, AlertStyle, AlertState, AllowedPropKeys, PropKeys }
export { allowedProps }
