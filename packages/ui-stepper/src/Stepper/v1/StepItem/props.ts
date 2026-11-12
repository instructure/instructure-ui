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

import type { ComponentStyle } from '@instructure/emotion'

import type { StepperStep } from '../props.js'

type StepItemProps = {
  /**
   * The data of the step.
   */
  step: StepperStep
  /**
   * The visually hidden text read before the step, chosen by its state.
   */
  prefix: string
  /**
   * The position text of the step, for example `Step 2 of 7`.
   */
  countLabel: string
  /**
   * Whether the position text is visible.
   */
  showStepCount: boolean
  /**
   * Whether the description is visible on steps that aren't in error.
   */
  showDetails: boolean
}

type StepItemStyle = ComponentStyle<
  'stepItem' | 'icon' | 'content' | 'count' | 'title' | 'description'
>

export type { StepItemProps, StepItemStyle }
