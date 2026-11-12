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
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import {
  CircleAlertInstUIIcon,
  CircleCheckInstUIIcon,
  CircleDashedInstUIIcon,
  CircleDotInstUIIcon
} from '@instructure/ui-icons'

import type { StepItemProps } from './props.js'
import generateStyle from './styles.js'

const stateIcons = {
  completed: CircleCheckInstUIIcon,
  current: CircleDotInstUIIcon,
  notStarted: CircleDashedInstUIIcon,
  error: CircleAlertInstUIIcon
}

/**
---
private: true
id: Stepper.StepItem
---
**/
const StepItem = ({
  step,
  prefix,
  countLabel,
  showStepCount,
  showDetails
}: StepItemProps) => {
  const { title, state, description } = step
  const current = state === 'current'
  const error = state === 'error'

  const styles = useStyleNew({
    generateStyle,
    params: { state },
    componentId: 'StepItem'
  })

  const Icon = stateIcons[state]

  return (
    <li aria-current={current ? 'step' : undefined} css={styles?.stepItem}>
      <span css={styles?.icon}>
        {/* decorative, the state is read from the prefix; none of the icons points in a direction */}
        <Icon
          size="md"
          color={error ? 'errorColor' : 'baseColor'}
          bidirectional={false}
        />
      </span>
      <span css={styles?.content}>
        <ScreenReaderContent>
          {/* aria-current doesn't say which step is current, so its position is always read */}
          {current && !showStepCount ? `${prefix} ${countLabel}` : prefix}
        </ScreenReaderContent>
        {showStepCount && <span css={styles?.count}>{countLabel}</span>}
        <span css={styles?.title}>{title}</span>
        {/* the description of a failed step is its error text, so it is never hidden */}
        {description && (showDetails || error) && (
          <span css={styles?.description}>{description}</span>
        )}
      </span>
    </li>
  )
}

export default StepItem
export { StepItem }
