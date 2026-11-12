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

import { forwardRef, useEffect, useImperativeHandle } from 'react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { warn } from '@instructure/console'
import { useStyleNew } from '@instructure/emotion'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import {
  passthroughProps,
  useDeterministicId
} from '@instructure/ui-react-utils'

import { CompactSteps } from './CompactSteps/index.js'
import { MobileSteps } from './MobileSteps/index.js'
import type { StepperProps } from './props.js'
import { StepItem } from './StepItem/index.js'
import { StepperSkeleton } from './StepperSkeleton/index.js'
import generateStyle from './styles.js'
import { useMobileForm } from './useMobileForm.js'

type StepperComponent = ForwardRefExoticComponent<
  StepperProps & RefAttributes<HTMLElement>
> & { Skeleton: typeof StepperSkeleton }

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
      params: { margin, orientation },
      componentId: 'Stepper',
      displayName: 'Stepper'
    })

    const getId = useDeterministicId('Stepper')
    const headingId = getId('Stepper-heading')
    const listId = getId('Stepper-list')
    const HeadingElement = headingLevel

    const { mobile, sectionRef, listRef } = useMobileForm(
      layout === 'default' && orientation === 'horizontal',
      JSON.stringify([steps, showStepCount, showDetails])
    )
    useImperativeHandle(ref, () => sectionRef.current!, [sectionRef])

    const currentCount = steps.filter((step) => step.state === 'current').length
    const missingErrorLabel =
      layout === 'compact' &&
      !compactErrorLabel &&
      steps.some((step) => step.state === 'error')
    useEffect(() => {
      warn(
        currentCount <= 1,
        `[Stepper] At most one step can be \`current\`, but ${currentCount} are.`
      )
      warn(
        !missingErrorLabel,
        '[Stepper] A step failed in the compact layout, but `compactErrorLabel` is missing, so screen readers cannot tell which step it is.'
      )
    }, [currentCount, missingErrorLabel])

    const renderSteps = (itemOrientation: typeof orientation) =>
      steps.map((step, index) => (
        <StepItem
          key={index}
          step={step}
          orientation={itemOrientation}
          prefix={screenReaderLabels[step.state]}
          countLabel={stepCountLabel(index + 1, steps.length)}
          showStepCount={showStepCount}
          showDetails={showDetails}
        />
      ))

    let content
    if (mobile) {
      content = (
        <MobileSteps
          label={label}
          headingId={headingId}
          headingLevel={headingLevel}
          listId={listId}
          steps={steps}
          stepCountLabel={stepCountLabel}
          toggleLabel={screenReaderLabels.mobileToggle}
          themeOverride={themeOverride}
        >
          {/* there is no horizontal mobile form, the expanded list is a column */}
          {renderSteps('vertical')}
        </MobileSteps>
      )
    } else {
      content = (
        <>
          {showLabel ? (
            <HeadingElement id={headingId} css={styles?.heading}>
              {label}
            </HeadingElement>
          ) : (
            <ScreenReaderContent as={headingLevel} id={headingId}>
              {label}
            </ScreenReaderContent>
          )}
          {layout === 'compact' ? (
            <CompactSteps
              steps={steps}
              showDetails={showDetails}
              stepCountLabel={stepCountLabel}
              compactErrorLabel={compactErrorLabel}
              themeOverride={themeOverride}
            />
          ) : (
            <ol ref={listRef} css={styles?.list}>
              {renderSteps(orientation)}
            </ol>
          )}
        </>
      )
    }

    return (
      <section
        {...passthroughProps(rest)}
        ref={sectionRef}
        aria-labelledby={headingId}
        css={styles?.stepper}
      >
        {content}
      </section>
    )
  }
) as StepperComponent

Stepper.displayName = 'Stepper'
Stepper.Skeleton = StepperSkeleton

export default Stepper
export { Stepper }
