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
import type { ComponentStyle, NewThemeOverrideProp } from '@instructure/emotion'
import type { NewComponentTypes } from '@instructure/ui-themes'

type BannerOwnProps = {
  /**
   * The color treatment used for the banner's background and default icon.
   */
  color?: 'violet' | 'sea'

  /**
   * Controls the padding, gaps, and font sizes used by the banner.
   * `'relaxed'` is larger, `'compact'` is smaller.
   */
  density?: 'relaxed' | 'compact'

  /**
   * An optional bold header line shown above the body content.
   */
  header?: string

  /**
   * The banner's body content. This is the main descriptive text (or other
   * content) shown below the optional `header`.
   */
  children: ReactNode

  /**
   * Overrides the default icon shown in the icon swatch. If not provided, a
   * decorative diamond icon is used.
   */
  icon?: ReactNode

  /**
   * Whether to show a dismiss (close) button in the top-right corner of the
   * banner. The close button only renders when both `isDismissible` and
   * `onDismiss` are provided -- a dismiss button with no handler is a
   * dead end for users and is bad for accessibility, so it's intentionally
   * omitted otherwise. When `isDismissible` is `true`, `closeButtonLabel`
   * must also be provided or a warning is logged in development.
   */
  isDismissible?: boolean

  /**
   * Called when the dismiss button is clicked. Required (in practice) for
   * the dismiss button to render -- see `isDismissible`.
   */
  onDismiss?: () => void

  /**
   * An accessible label for the dismiss button, read by screen readers.
   * Required when `isDismissible` is `true`.
   */
  closeButtonLabel?: string

  /**
   * The label for an optional call-to-action button rendered below the
   * body content. Banner always renders this as its own fixed-style
   * `Button` (same size and color treatment everywhere) -- consumers
   * control the label and click behavior, not the button's appearance.
   * The button only renders when both `ctaText` and `onCtaClick` are
   * provided.
   */
  ctaText?: string

  /**
   * Called when the call-to-action button is clicked. Required (in
   * practice) for the button to render -- see `ctaText`.
   */
  onCtaClick?: () => void
}

type PropKeys = keyof BannerOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BannerProps = BannerOwnProps &
  NewThemeOverrideProp<ReturnType<NewComponentTypes['Banner']>>

type BannerStyle = ComponentStyle<
  'banner' | 'closeButton' | 'iconSwatch' | 'icon' | 'content' | 'cta'
>

const allowedProps: AllowedPropKeys = [
  'color',
  'density',
  'header',
  'children',
  'icon',
  'isDismissible',
  'onDismiss',
  'closeButtonLabel',
  'ctaText',
  'onCtaClick'
]

export type { BannerProps, BannerStyle }
export { allowedProps }
