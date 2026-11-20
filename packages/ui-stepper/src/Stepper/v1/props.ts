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

import type {
  ComponentStyle,
  NewThemeOverrideProp,
  Spacing
} from '@instructure/emotion'
import type { OtherHTMLAttributes } from '@instructure/shared-types'
import type { NewComponentTypes } from '@instructure/ui-themes'

type StepperStepState = 'completed' | 'current' | 'notStarted' | 'error'

type StepperStep = {
  /**
   * The name of the step, always visible.
   */
  title: string
  /**
   * Where the step is in the flow; at most one step can be `current`.
   */
  state: StepperStepState
  /**
   * Supporting detail under the title; on an error step it is the error text.
   */
  description?: string
}

type StepperScreenReaderLabels = {
  /**
   * Read before a completed step, for example `Completed:`.
   */
  completed: string
  /**
   * Read before the current step, for example `Current step:`.
   */
  current: string
  /**
   * Read before a step that hasn't started, for example `Upcoming:`.
   */
  notStarted: string
  /**
   * Read before a failed step, for example `Error:`.
   */
  error: string
  /**
   * Read after the mobile toggle's visible text to name what it opens, for example `step list`.
   */
  mobileToggle: string
}

type StepperOwnProps = {
  /**
   * The steps of the flow in order, each with a title, a state and an optional description.
   */
  steps: StepperStep[]
  /**
   * The name of the Stepper region, rendered as its heading.
   */
  label: string
  /**
   * Whether the heading is visible; when `false` it is visually hidden but still names the region.
   */
  showLabel?: boolean
  /**
   * The level of the heading, chosen to fit the heading structure of the page.
   */
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /**
   * `default` names every step with its state, `compact` names only the current step and shows every step as a segment.
   */
  layout?: 'default' | 'compact'
  /**
   * Lays the steps of the default layout out in a row or a column without changing their order or markup.
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * Whether each step shows its position in the default layout; the current step's position is always read to screen readers.
   */
  showStepCount?: boolean
  /**
   * Whether the step descriptions are visible; the description of an error step is always visible.
   */
  showDetails?: boolean
  /**
   * Returns the position text of a step, for example `(2, 7) => 'Step 2 of 7'`.
   */
  stepCountLabel: (position: number, total: number) => string
  /**
   * Returns the screen reader text that names a failed step in the compact layout, for example `(5, 'Verify records') => 'Step 5, Verify records, needs attention'`.
   */
  compactErrorLabel?: (position: number, title: string) => string
  /**
   * Visually hidden texts: the state prefix read before each step and the suffix of the mobile toggle.
   */
  screenReaderLabels: StepperScreenReaderLabels
  /**
   * Spacing around the Stepper as Spacing tokens in CSS shorthand, for example `general.spaceMd 0`.
   */
  margin?: Spacing
}

type PropKeys = keyof StepperOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type StepperProps = StepperOwnProps &
  NewThemeOverrideProp<ReturnType<NewComponentTypes['Stepper']>> &
  OtherHTMLAttributes<StepperOwnProps>

type StepperStyle = ComponentStyle<'stepper' | 'list'>

const allowedProps: AllowedPropKeys = [
  'steps',
  'label',
  'showLabel',
  'headingLevel',
  'layout',
  'orientation',
  'showStepCount',
  'showDetails',
  'stepCountLabel',
  'compactErrorLabel',
  'screenReaderLabels',
  'margin'
]

export type {
  StepperProps,
  StepperStep,
  StepperStepState,
  StepperScreenReaderLabels,
  StepperStyle
}
export { allowedProps }
