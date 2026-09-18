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
type SkeletonLoaderOwnProps = {
  /**
   * How long to wait before announcing the loading state, in milliseconds.
   * Sub-second loads should not announce at all.
   */
  announcementDelay?: number

  children?: ReactNode

  elementRef?: (element: Element | null) => void

  /**
   * Announced through `role="alert"` when `isError` is set.
   */
  errorLabel?: string

  /**
   * Renders the error branch instead of the skeleton or the children.
   */
  isError?: boolean

  /**
   * Whether the region is loading.
   *
   * Leave it undefined to let the component follow hydration: it shows the
   * skeleton on the server and through the hydrating render, then swaps to
   * `children` once hydration commits. Pass a boolean to take control, which is
   * what you want when the wait is a data fetch rather than hydration.
   */
  isLoading?: boolean

  /**
   * Announced once loading has finished.
   */
  loadedLabel: string

  /**
   * Announced once loading has been running long enough to be worth mentioning.
   * Required so it can be translated.
   */
  loadingLabel: string

  /**
   * The skeleton to show while loading. If not provided, a default skeleton is shown.
   */
  skeleton?: ReactNode
}

import type { ReactNode } from 'react'

import type { OtherHTMLAttributes } from '@instructure/shared-types'

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
export type { SkeletonLoaderProps, SkeletonLoaderOwnProps }
