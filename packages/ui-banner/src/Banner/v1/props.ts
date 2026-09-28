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

import type { ReactNode } from 'react'
import type {
  ComponentStyle,
  NewThemeOverrideProp,
  Spacing
} from '@instructure/emotion'
import type { Renderable } from '@instructure/shared-types'
import type { NewComponentTypes } from '@instructure/ui-themes'

type BannerOwnProps = {
  /**
   * The color treatment of the `Banner`. Unlike `Alert`'s variants, these
   * are not status colors — they're promotional accents with no inherent
   * meaning, so pick whichever reads best against surrounding content.
   */
  color?: 'plum' | 'sky'

  /**
   * A function returning the icon to render at the start of the `Banner`.
   * Defaults to a megaphone icon so a `Banner` always has one. Treated as
   * decorative — pass meaningful content via `children` instead.
   */
  renderIcon?: Renderable

  /**
   * A function returning an optional title for the `Banner`. When provided,
   * it labels the `Banner`'s landmark for assistive technology.
   */
  renderTitle?: Renderable

  /**
   * The body content of the `Banner`.
   */
  children?: ReactNode

  /**
   * A function returning the `Banner`'s call-to-action content (for example,
   * one or more `Button`s). The `Banner` does not manage the actions'
   * layout beyond spacing them — compose the buttons yourself.
   */
  renderActions?: Renderable

  /**
   * A function returning the accessible label for the close button. The
   * close button only renders when this is provided.
   */
  renderCloseButtonLabel?: Renderable

  /**
   * Callback fired when the user dismisses the `Banner`. Required when
   * `renderCloseButtonLabel` is provided — the `Banner` does not manage its
   * own visibility.
   */
  onDismiss?: () => void

  /**
   * An accessible label for the `Banner`'s landmark, used when there's no
   * `renderTitle`. Provide one or the other so assistive technology users
   * can identify the `Banner` when navigating by landmark.
   */
  screenReaderLabel?: string

  /**
   * Provides a reference to the `Banner`'s underlying html element.
   */
  elementRef?: (element: Element | null) => void

  /**
   * Valid values are `0`, `none`, `auto`, and Spacing token values,
   * see https://instructure.design/layout-spacing. Apply these values via
   * familiar CSS-like shorthand. For example, `margin="small auto"`.
   */
  margin?: Spacing
}

type PropKeys = keyof BannerOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BannerProps = BannerOwnProps &
  NewThemeOverrideProp<ReturnType<NewComponentTypes['Banner']>>

type BannerStyle = ComponentStyle<
  | 'banner'
  | 'iconContainer'
  | 'content'
  | 'title'
  | 'message'
  | 'actions'
  | 'closeButton'
>

const allowedProps: AllowedPropKeys = [
  'color',
  'renderIcon',
  'renderTitle',
  'children',
  'renderActions',
  'renderCloseButtonLabel',
  'onDismiss',
  'screenReaderLabel',
  'elementRef',
  'margin'
]

export type { BannerProps, BannerStyle }
export { allowedProps }
