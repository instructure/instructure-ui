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
import type { NewComponentTypes } from '@instructure/ui-themes'

type BannerOwnProps = {
  /**
   * The visual color treatment of the `Banner`.
   */
  color?: 'violet' | 'sea'

  /**
   * Controls the padding and internal spacing of the `Banner`. Use `compact`
   * when there's less real estate for the banner such as smaller containers.
   */
  density?: 'relaxed' | 'compact'

  /**
   * Whether the `Banner` can be dismissed by the user. Reserve `false` for
   * time-sensitive or recurring campaign banners where the user shouldn't
   * lose track of the message.
   */
  dismissible?: boolean

  /**
   * Callback fired when the user dismisses the `Banner`. Required when
   * `dismissible` is `true` — the `Banner` does not manage its own visibility.
   */
  onDismiss?: () => void

  /**
   * An accessible label for the dismiss button.
   */
  closeButtonLabel?: ReactNode

  /**
   * A function returning a decorative icon or illustration to render at the
   * start of the `Banner`. Treated as purely decorative — pass meaningful
   * content via `children` instead.
   */
  renderIcon?: () => ReactNode

  /**
   * An optional title for the `Banner`.
   */
  header?: ReactNode

  /**
   * The body content of the `Banner`.
   */
  children?: ReactNode

  /**
   * A function returning the primary action element (for example, a `Button`).
   * Don't use this for page navigation — link the title or message instead.
   */
  renderPrimaryAction?: () => ReactNode

  /**
   * A function returning a secondary action element. Only rendered alongside
   * a primary action.
   */
  renderSecondaryAction?: () => ReactNode

  /**
   * Provides a reference to the `Banner`'s underlying html element.
   */
  elementRef?: (element: Element | null) => void

  /**
   * Valid values are `0`, `none`, `auto`, and Spacing token values,
   * see https://instructure.design/layout-spacing. Apply these values via
   * familiar CSS-like shorthand. For example, `margin="general.spaceMd auto"`.
   */
  margin?: Spacing
}

type PropKeys = keyof BannerOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BannerProps = BannerOwnProps &
  NewThemeOverrideProp<ReturnType<NewComponentTypes['Banner']>>

type BannerStyle = ComponentStyle<
  'banner' | 'icon' | 'content' | 'contentInner' | 'actions' | 'closeButton'
>

const allowedProps: AllowedPropKeys = [
  'color',
  'density',
  'dismissible',
  'onDismiss',
  'closeButtonLabel',
  'renderIcon',
  'header',
  'children',
  'renderPrimaryAction',
  'renderSecondaryAction',
  'elementRef',
  'margin'
]

export type { BannerProps, BannerStyle }
export { allowedProps }
