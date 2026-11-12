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

import type { StepperStepState } from '../props.js'
import type { StepItemStyle } from './props.js'

type StyleParams = {
  state: StepperStepState
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['StepItem']>,
  params: StyleParams
): StepItemStyle => {
  const { state } = params
  const current = state === 'current'
  const filled = state === 'completed' || current

  const strokeWidth = filled
    ? componentTheme.stepStrokeFilledWidth
    : componentTheme.stepStrokeWidth
  const strokeColor = filled
    ? componentTheme.stepStrokeFilledColor
    : componentTheme.stepStrokeColor

  return {
    stepItem: {
      label: 'stepItem',
      position: 'relative',
      flex: '1 1 0',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      alignContent: 'start',
      alignItems: 'start',
      columnGap: componentTheme.stepContentGap,
      rowGap: componentTheme.stepGap,
      // a border instead of a background, so the stroke stays visible in forced colors mode
      '&::before': {
        content: '""',
        gridColumn: '1 / -1',
        borderBlockStart: `${strokeWidth} solid ${strokeColor}`,
        // centres a thin stroke on the axis of a thick one, so the strokes read as one line
        marginBlock: `calc((${componentTheme.stepStrokeFilledWidth} - ${strokeWidth}) / 2)`
      },
      // only the two ends of the whole line are rounded
      '&:first-of-type::before': {
        borderStartStartRadius: componentTheme.stepStrokeRadius,
        borderEndStartRadius: componentTheme.stepStrokeRadius
      },
      '&:last-of-type::before': {
        borderStartEndRadius: componentTheme.stepStrokeRadius,
        borderEndEndRadius: componentTheme.stepStrokeRadius
      }
    },
    icon: {
      label: 'stepItem__icon',
      display: 'flex',
      paddingBlockStart: componentTheme.iconTopPadding
    },
    content: {
      label: 'stepItem__content',
      display: 'flex',
      flexDirection: 'column',
      paddingInlineEnd: componentTheme.stepHorizontalPaddingEnd
    },
    // TODO: typography guessed from the designs, replace it with tokens once design adds them; font
    // families and text colours are inherited until then
    count: {
      label: 'stepItem__count',
      display: 'flex',
      alignItems: 'center',
      // the height of the icon row, so the count is centred on the icon
      minHeight: '1.5rem',
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    title: {
      label: 'stepItem__title',
      fontSize: '1rem',
      fontWeight: current ? 700 : 400,
      lineHeight: current ? 1.25 : 1.5
    },
    description: {
      label: 'stepItem__description',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5
    }
  }
}

export default generateStyle
