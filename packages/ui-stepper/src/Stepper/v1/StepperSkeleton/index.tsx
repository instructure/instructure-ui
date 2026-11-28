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

import { useStyleNew } from '@instructure/emotion'
import { CircleDashedInstUIIcon } from '@instructure/ui-icons'
import { passthroughProps } from '@instructure/ui-react-utils'
import { SkeletonLoader } from '@instructure/ui-skeleton/latest'

import type { StepperSkeletonProps } from './props.js'
import { allowedProps } from './props.js'
import generateStyle from './styles.js'

/**
---
parent: Stepper
id: Stepper.Skeleton
---
A placeholder in the shape of the Stepper, for the `skeleton` of a `SkeletonLoader`. It's hidden from
screen readers.
**/
const StepperSkeleton = ({
  stepCount,
  orientation = 'horizontal',
  margin,
  ...rest
}: StepperSkeletonProps) => {
  const styles = useStyleNew({
    generateStyle,
    params: { orientation, margin },
    componentId: 'StepItem',
    displayName: 'StepperSkeleton'
  })

  return (
    // no placeholder step is real content, so assistive technology skips the whole skeleton
    <div {...passthroughProps(rest)} aria-hidden="true" css={styles?.skeleton}>
      {Array.from({ length: stepCount }, (_, index) => (
        <div key={index} css={styles?.step}>
          <span css={styles?.icon}>
            <CircleDashedInstUIIcon
              size="md"
              color="baseColor"
              bidirectional={false}
            />
          </span>
          <span css={styles?.text}>
            <SkeletonLoader.Rectangle height="1rem" />
          </span>
        </div>
      ))}
    </div>
  )
}

StepperSkeleton.displayName = 'StepperSkeleton'
StepperSkeleton.allowedProps = allowedProps

export default StepperSkeleton
export { StepperSkeleton }
