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

import type { StepperStep, StepperStepState } from './props.js'

// TODO: confirm with design which step to name when no step is current
const namedStepOrder: StepperStepState[] = ['current', 'error', 'notStarted']

/**
 * ---
 * private: true
 * ---
 * Returns the index of the step that the compact layout and the mobile summary name: the current
 * step, else the first failed one, else the first one not started, else the last one.
 */
const getNamedStepIndex = (steps: StepperStep[]) => {
  for (const state of namedStepOrder) {
    const index = steps.findIndex((step) => step.state === state)
    if (index >= 0) return index
  }
  return steps.length - 1
}

export default getNamedStepIndex
export { getNamedStepIndex }
