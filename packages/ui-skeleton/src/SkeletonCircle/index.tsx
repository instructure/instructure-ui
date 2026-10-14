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

import { useContext } from 'react'

import { useStyleNew } from '@instructure/emotion'
import { TextDirectionContext } from '@instructure/ui-i18n'
import { omitProps } from '@instructure/ui-react-utils'

import generateStyle from './styles.js'
import { allowedProps } from './props.js'
import type { SkeletonLoaderTheme } from '../utils/shimmer'
import type { SkeletonCircleProps } from './props'

/**
---
parent: SkeletonLoader
id: SkeletonLoader.Circle
---
A placeholder for avatars and other round content. It's hidden from screen
readers.
**/
function SkeletonCircle(props: SkeletonCircleProps) {
  const { animate, diameter, elementRef } = props

  const textDirection = useContext(TextDirectionContext)

  const styles = useStyleNew<SkeletonLoaderTheme, typeof generateStyle>({
    generateStyle,
    componentId: 'SkeletonLoader',
    displayName: 'SkeletonCircle',
    params: { animate, diameter, textDirection }
  })

  return (
    <span
      {...omitProps(props, allowedProps)}
      ref={elementRef}
      css={styles.skeletonCircle}
      aria-hidden="true"
      data-skeleton-shape="circle"
    />
  )
}

SkeletonCircle.displayName = 'SkeletonCircle'
SkeletonCircle.allowedProps = allowedProps

export default SkeletonCircle
export { SkeletonCircle }
