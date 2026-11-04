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
  Spacing,
  ComponentStyle,
  NewThemeOverrideProp
} from '@instructure/emotion'
import type { NewComponentTypes } from '@instructure/ui-themes'
import type { Renderable } from '@instructure/shared-types'

type BannerOwnProps = {
  /**
   * Content to be rendered within the Banner.
   */
  children?: ReactNode
  /**
   * The first row of the Banner, displayed above the content.
   */
  title?: ReactNode
  /**
   * The background color of the Banner and its icon box.
   */
  color?: 'violet' | 'sea'
  /**
   * `relaxed` has larger spacing and icon box, `compact` fits tight spaces.
   */
  variant?: 'relaxed' | 'compact'
  /**
   * An icon, or function that returns an icon, displayed in a colored box at the start of the Banner.
   */
  renderIcon?: Renderable
  /**
   * A DOM element or function that returns an element where the screen reader announcement is placed.
   */
  liveRegion?: Element | null | (() => Element | null | undefined)
  /**
   * Value for the `aria-atomic` attribute of the live region, it controls whether the whole region or only the change is read.
   */
  isLiveRegionAtomic?: boolean
  /**
   * Milliseconds until the Banner is dismissed automatically.
   */
  timeout?: number
  /**
   * Valid values are `0`, `none`, `auto`, and Spacing token values (see https://instructure.design/layout-spacing), applied with CSS-like shorthand, e.g. `margin="general.spaceMd auto"`.
   */
  margin?: Spacing
  /**
   * Close button label, setting it renders the close button.
   */
  renderCloseButtonLabel?: Renderable
  /**
   * Callback after the Banner is closed.
   */
  onDismiss?: () => void
  /**
   * Transition used to make the Banner appear and disappear.
   */
  transition?: 'none' | 'fade'
  /**
   * Setting it from `true` to `false` closes the Banner from the outside and still runs the transition.
   */
  open?: boolean
  /**
   * Provides a reference to the underlying html root element.
   */
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof BannerOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BannerProps = BannerOwnProps &
  NewThemeOverrideProp<ReturnType<NewComponentTypes['Banner']>>

type BannerStyle = ComponentStyle<
  'banner' | 'icon' | 'content' | 'title' | 'body' | 'closeButton'
>

type BannerStyleParams = Required<Pick<BannerProps, 'color' | 'variant'>>

const allowedProps: AllowedPropKeys = [
  'children',
  'title',
  'color',
  'variant',
  'renderIcon',
  'liveRegion',
  'isLiveRegionAtomic',
  'timeout',
  'margin',
  'renderCloseButtonLabel',
  'onDismiss',
  'transition',
  'open',
  'elementRef'
]

export type { BannerProps, BannerStyle, BannerStyleParams }
export { allowedProps }
