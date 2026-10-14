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

import type { OtherHTMLAttributes } from '@instructure/shared-types'

type SkeletonShapeType = 'text' | 'rectangle' | 'circle'

type SkeletonLoaderOwnProps = {
  /**
   * How long to wait, in milliseconds, before announcing `loadingLabel`. If
   * loading finishes before then, only `loadedLabel` is announced.
   */
  announcementDelay?: number

  /**
   * The content to show once loading has finished.
   */
  children?: ReactNode

  /**
   * Provides a reference to the underlying HTML element.
   */
  elementRef?: (element: Element | null) => void

  /**
   * Announced right away (with `role="alert"`) when `isError` is set.
   */
  errorLabel?: string

  /**
   * Set when loading failed. Stops loading and shows `children`, which should
   * contain your error message.
   */
  isError?: boolean

  /**
   * Whether the content is loading. Set it yourself when you're waiting for
   * data. If you leave it unset, the skeleton shows until the page has
   * hydrated.
   */
  isLoading?: boolean

  /**
   * Announced when loading finishes. Required, so it can be translated.
   */
  loadedLabel: string

  /**
   * Announced after `announcementDelay` if the content is still loading.
   * Required, so it can be translated.
   */
  loadingLabel: string

  /**
   * The placeholder to show while loading, built from `SkeletonLoader.Text`,
   * `SkeletonLoader.Rectangle`, and `SkeletonLoader.Circle`.
   */
  skeleton?: ReactNode
}

type SkeletonLoaderProps = SkeletonLoaderOwnProps &
  OtherHTMLAttributes<SkeletonLoaderOwnProps>

const allowedProps: (keyof SkeletonLoaderOwnProps)[] = [
  'announcementDelay',
  'children',
  'elementRef',
  'errorLabel',
  'isError',
  'isLoading',
  'loadedLabel',
  'loadingLabel',
  'skeleton'
]

export { allowedProps }
export type { SkeletonLoaderProps, SkeletonLoaderOwnProps, SkeletonShapeType }
