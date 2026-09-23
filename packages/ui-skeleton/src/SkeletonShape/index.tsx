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

import { useContext, forwardRef } from 'react'

import { useStyleNew } from '@instructure/emotion'
import type { NewComponentTypes } from '@instructure/ui-themes'
import { TextDirectionContext } from '@instructure/ui-i18n'
import { passthroughProps } from '@instructure/ui-react-utils'

import generateStyle from './styles.js'
import type { SkeletonShapeProps } from './props'

/**
---
parent: SkeletonLoader
id: SkeletonLoader.Shape
---
**/
const SkeletonShape = forwardRef<HTMLSpanElement, SkeletonShapeProps>(
  (props, ref) => {
    const {
      animate,
      aspectRatio,
      diameter,
      elementRef,
      height,
      leading,
      lines,
      radius,
      shape,
      size,
      width,
      ...rest
    } = props

    const textDirection = useContext(TextDirectionContext)

    const forwardedRef = ref
    const setRef = (el: HTMLSpanElement | null) => {
      elementRef?.(el)
      if (typeof forwardedRef === 'function') {
        forwardedRef(el)
      } else if (forwardedRef) {
        forwardedRef.current = el
      }
    }

    const styles = useStyleNew<
      ReturnType<NewComponentTypes['SkeletonLoader']>,
      typeof generateStyle
    >({
      generateStyle,
      componentId: 'SkeletonLoader',
      displayName: 'SkeletonShape',
      params: {
        animate,
        aspectRatio,
        diameter,
        height,
        leading,
        lines,
        radius,
        shape,
        size,
        textDirection,
        width
      }
    })

    return (
      <span
        {...passthroughProps(rest)}
        ref={setRef}
        css={styles.skeletonShape}
        // Purely decorative. The loading state is announced once per page by a
        // live region (see SkeletonLoader), never by the shapes themselves — a
        // screen reader should not read out a stack of unlabelled boxes.
        aria-hidden="true"
        data-skeleton-shape={shape ?? 'text'}
      >
        {styles.rows.map((rowStyle, i) => (
          <span key={i} css={rowStyle} />
        ))}
      </span>
    )
  }
)

SkeletonShape.displayName = 'Shape'

export default SkeletonShape
export { SkeletonShape }
