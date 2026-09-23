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

import {
  useIsHydratedContext,
  passthroughProps
} from '@instructure/ui-react-utils'

import generateStyle from './styles.js'
import { allowedProps } from './props.js'
import type { SkeletonLoaderProps } from './props'
import { SkeletonShape } from '../SkeletonShape'
import { Text, Circle, Rectangle } from './shapes.js'

/**
---
category: components
---
Wraps a loading region and owns everything a screen reader needs to know about
it. The skeleton shapes themselves are decorative; this is what announces.

Render **one of these per region**, not one per card or row — a page that
announces once per skeleton row is unusable.
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
    skeleton,
    ...rest
  } = props

  const isHydrated = useIsHydratedContext()

  // Uncontrolled: loading until hydration commits. Controlled: the caller wins.
  //
  // A failed region is never also loading. Without this guard a caller that
  // sets `isError` without clearing `isLoading` would render a shimmering
  // skeleton inside an `aria-busy` container while a `role="alert"` announced
  // the failure — the markup would claim the work is still in progress at the
  // same moment it says it stopped.
  const loading = isError ? false : isLoading ?? !isHydrated

  // Deliberately empty on the server and on the first client render, so the
  // first non-empty value is a genuine change that assistive tech will announce.
  // Seeding it with the loading label would make that first announcement part
  // of the initial page content and be skipped.
  const [status, setStatus] = useState('')

  const styles = generateStyle()

  useEffect(() => {
    if (isError) {
      setStatus('')
      return
    }

    if (loading) {
      // Sub-second loads never announce — the content beats the timer.
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
        {...passthroughProps(rest)}
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
SkeletonLoader.Shape = SkeletonShape
SkeletonLoader.Text = Text
SkeletonLoader.Circle = Circle
SkeletonLoader.Rectangle = Rectangle

export default SkeletonLoader
export { SkeletonLoader }
