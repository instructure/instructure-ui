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
import type { StepItemProps, StepItemStyle } from './props.js'

type StyleParams = {
  state: StepperStepState
  orientation: StepItemProps['orientation']
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
  const { state, orientation } = params
  const vertical = orientation === 'vertical'
  const filled = state === 'completed' || state === 'current'

  const strokeWidth = filled
    ? componentTheme.stepStrokeFilledWidth
    : componentTheme.stepStrokeWidth
  const strokeColor = filled
    ? componentTheme.stepStrokeFilledColor
    : componentTheme.stepStrokeColor
  const stroke = `${strokeWidth} solid ${strokeColor}`
  // centres a thin stroke on the axis of a thick one, so the strokes read as one line
  const strokeOffset = `calc((${componentTheme.stepStrokeFilledWidth} - ${strokeWidth}) / 2)`
  const radius = componentTheme.stepStrokeRadius

  return {
    stepItem: {
      label: 'stepItem',
      position: 'relative',
      display: 'grid',
      alignContent: 'start',
      alignItems: 'start',
      // the gap separates the stroke from the icon and the text
      ...(vertical
        ? {
            gridTemplateColumns: 'auto auto 1fr',
            columnGap: componentTheme.stepGap
          }
        : {
            flex: '1 1 0',
            // steps in a row never wrap their text; when they don't fit, the Stepper shows the mobile form
            minWidth: 'max-content',
            gridTemplateColumns: 'auto 1fr',
            rowGap: componentTheme.stepGap
          }),
      // a border instead of a background, so the stroke stays visible in forced colors mode
      '&::before': {
        content: '""',
        ...(vertical
          ? {
              alignSelf: 'stretch',
              borderInlineStart: stroke,
              marginInline: strokeOffset
            }
          : {
              gridColumn: '1 / -1',
              borderBlockStart: stroke,
              marginBlock: strokeOffset
            })
      },
      // only the two ends of the whole line are rounded
      '&:first-of-type::before': vertical
        ? { borderStartStartRadius: radius, borderStartEndRadius: radius }
        : { borderStartStartRadius: radius, borderEndStartRadius: radius },
      '&:last-of-type::before': vertical
        ? { borderEndStartRadius: radius, borderEndEndRadius: radius }
        : { borderStartEndRadius: radius, borderEndEndRadius: radius }
    },
    icon: {
      label: 'stepItem__icon',
      display: 'flex',
      marginInlineEnd: componentTheme.stepContentGap,
      paddingBlockStart: componentTheme.iconTopPadding
    },
    content: {
      label: 'stepItem__content',
      display: 'flex',
      flexDirection: 'column',
      // on the content, not on the step, so the stroke runs through the padding
      ...(vertical
        ? { paddingBlockEnd: componentTheme.stepVerticalPaddingEnd }
        : { paddingInlineEnd: componentTheme.stepHorizontalPaddingEnd })
    },
    count: {
      label: 'stepItem__count',
      display: 'flex',
      alignItems: 'center',
      // TODO: guessed from the designs, replace it with a token once design adds one
      // the height of the icon row, so the count is centred on the icon
      minHeight: '1.5rem'
    }
  }
}

export default generateStyle
