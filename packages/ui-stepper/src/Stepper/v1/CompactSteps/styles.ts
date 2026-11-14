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

import type { NewComponentTypes } from '@instructure/ui-themes'

import type { CompactStepsStyle } from './props.js'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['Stepper']>
): CompactStepsStyle => {
  const segment = (color: string) => ({
    flex: '1 1 0',
    // a border instead of a background, so the segments stay visible in forced colors mode
    borderBlockStart: `${componentTheme.compactStrokeHeight} solid ${color}`,
    borderRadius: componentTheme.compactStrokeRadius
  })

  return {
    // TODO: the gaps are guessed from the designs, replace them with tokens once design adds them
    compactSteps: {
      label: 'compactSteps',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    description: {
      label: 'compactSteps__description',
      marginInlineStart: '0.25rem'
    },
    segments: {
      label: 'compactSteps__segments',
      display: 'flex',
      gap: componentTheme.compactStrokeGap
    },
    segment: {
      label: 'compactSteps__segment',
      ...segment(componentTheme.compactStrokeColor)
    },
    filledSegment: {
      label: 'compactSteps__filledSegment',
      ...segment(componentTheme.compactStrokeFilledColor)
    },
    errorSegment: {
      label: 'compactSteps__errorSegment',
      ...segment(componentTheme.compactStrokeErrorColor)
    }
  }
}

export default generateStyle
