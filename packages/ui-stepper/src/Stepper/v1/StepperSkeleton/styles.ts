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

import { calcSpacingFromShorthand } from '@instructure/emotion'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'

import type { StepperSkeletonProps, StepperSkeletonStyle } from './props.js'

type StyleParams = {
  orientation: StepperSkeletonProps['orientation']
  margin: StepperSkeletonProps['margin']
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @param sharedTokens Shared token object that stores common values for the theme.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['StepItem']>,
  params: StyleParams,
  sharedTokens: SharedTokens
): StepperSkeletonStyle => {
  const { orientation, margin } = params
  const vertical = orientation === 'vertical'

  const stroke = `${componentTheme.stepStrokeWidth} solid ${componentTheme.stepStrokeColor}`
  // keeps the stroke row as tall as the Stepper's, so nothing moves when the steps load
  const strokeOffset = `calc((${componentTheme.stepStrokeFilledWidth} - ${componentTheme.stepStrokeWidth}) / 2)`
  const radius = componentTheme.stepStrokeRadius

  return {
    skeleton: {
      label: 'stepperSkeleton',
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      // a very narrow container clips the placeholders instead of scrolling sideways (WCAG 1.4.10)
      overflow: 'hidden',
      margin: calcSpacingFromShorthand(margin, {
        ...sharedTokens.spacing,
        ...sharedTokens.legacy.spacing
      })
    },
    // the same grid and stroke as a step that hasn't started
    step: {
      label: 'stepperSkeleton__step',
      display: 'grid',
      alignContent: 'start',
      alignItems: 'start',
      ...(vertical
        ? {
            gridTemplateColumns: 'auto auto 1fr',
            columnGap: componentTheme.stepGap
          }
        : {
            // placeholders shrink instead of overflowing, they have no text to keep whole
            flex: '1 1 0',
            minWidth: 0,
            gridTemplateColumns: 'auto 1fr',
            rowGap: componentTheme.stepGap
          }),
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
      '&:first-of-type::before': vertical
        ? { borderStartStartRadius: radius, borderStartEndRadius: radius }
        : { borderStartStartRadius: radius, borderEndStartRadius: radius },
      '&:last-of-type::before': vertical
        ? { borderEndStartRadius: radius, borderEndEndRadius: radius }
        : { borderStartEndRadius: radius, borderEndEndRadius: radius }
    },
    icon: {
      label: 'stepperSkeleton__icon',
      display: 'flex',
      marginInlineEnd: componentTheme.stepContentGap,
      paddingBlockStart: componentTheme.iconTopPadding
    },
    text: {
      label: 'stepperSkeleton__text',
      display: 'flex',
      alignItems: 'center',
      // TODO: sizes guessed from the designs, replace them with tokens once design adds them
      // the height of the icon row, so the bar is centred on the icon
      minHeight: '1.5rem',
      ...(vertical
        ? {
            maxWidth: '10rem',
            paddingBlockEnd: componentTheme.stepVerticalPaddingEnd
          }
        : { paddingInlineEnd: componentTheme.stepHorizontalPaddingEnd })
    }
  }
}

export default generateStyle
