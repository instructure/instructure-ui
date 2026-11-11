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

import { forwardRef } from 'react'

import { useStyleNew } from '@instructure/emotion'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import {
  passthroughProps,
  useDeterministicId
} from '@instructure/ui-react-utils'

import type { StepperProps } from './props.js'
import generateStyle from './styles.js'

/**
---
category: components
---
**/
const Stepper = forwardRef<HTMLElement, StepperProps>(
  (
    {
      steps,
      label,
      showLabel = true,
      headingLevel = 'h2',
      layout = 'default',
      orientation = 'horizontal',
      showStepCount = false,
      showDetails = true,
      stepCountLabel,
      compactErrorLabel,
      screenReaderLabels,
      margin,
      themeOverride,
      ...rest
    },
    ref
  ) => {
    const styles = useStyleNew({
      generateStyle,
      themeOverride,
      params: { margin },
      componentId: 'Stepper',
      displayName: 'Stepper'
    })

    const headingId = useDeterministicId('Stepper')('Stepper-heading')
    const HeadingElement = headingLevel

    return (
      <section
        {...passthroughProps(rest)}
        ref={ref}
        aria-labelledby={headingId}
        css={styles?.stepper}
      >
        {showLabel ? (
          <HeadingElement id={headingId} css={styles?.heading}>
            {label}
          </HeadingElement>
        ) : (
          <ScreenReaderContent as={headingLevel} id={headingId}>
            {label}
          </ScreenReaderContent>
        )}
      </section>
    )
  }
)

Stepper.displayName = 'Stepper'

export default Stepper
export { Stepper }
