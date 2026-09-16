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

import { useEffect, useState } from 'react'

import { useIsHydratedContext, omitProps } from '@instructure/ui-react-utils'

import generateStyle from './styles.js'
import { allowedProps } from './props.js'
import type { SkeletonLoaderProps } from './props'
import { SkeletonText } from '../SkeletonText'
import { SkeletonRectangle } from '../SkeletonRectangle'
import { SkeletonCircle } from '../SkeletonCircle'

/**
---
category: components
---
Shows a placeholder while part of the page is loading, and tells screen reader
users when loading starts and finishes.

Use one `SkeletonLoader` for each loading area, not one per card or row, so
screen readers announce it once.
@module SkeletonLoader
**/
function SkeletonLoader(props: SkeletonLoaderProps) {
  const {
    announcementDelay = 400,
    children,
    elementRef,
    errorLabel,
    isError = false,
    isLoading,
    loadedLabel,
    loadingLabel,
    skeleton
  } = props

  const isHydrated = useIsHydratedContext()

  // If `isLoading` is set, it decides. If not, we're loading until hydration
  // finishes. An error always ends loading, so the skeleton is never shown
  // together with an error.
  const loading = isError ? false : isLoading ?? !isHydrated

  // Starts empty so screen readers treat the first label as a change and
  // announce it.
  const [status, setStatus] = useState('')

  const styles = generateStyle()

  useEffect(() => {
    if (isError) {
      setStatus('')
      return
    }

    if (loading) {
      const timeout = setTimeout(
        () => setStatus(loadingLabel),
        announcementDelay
      )
      return () => clearTimeout(timeout)
    }

    setStatus(loadedLabel)
    return undefined
  }, [loading, isError, loadingLabel, loadedLabel, announcementDelay])

  return (
    <>
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        css={styles.srOnly}
      >
        {status}
      </span>

      <div
        {...omitProps(props, allowedProps)}
        ref={elementRef}
        aria-busy={loading || undefined}
      >
        {loading ? skeleton : children}
      </div>

      {isError && errorLabel ? (
        <span role="alert" css={styles.srOnly}>
          {errorLabel}
        </span>
      ) : null}
    </>
  )
}

SkeletonLoader.displayName = 'SkeletonLoader'
SkeletonLoader.allowedProps = allowedProps
SkeletonLoader.Text = SkeletonText
SkeletonLoader.Rectangle = SkeletonRectangle
SkeletonLoader.Circle = SkeletonCircle

export default SkeletonLoader
export { SkeletonLoader }
