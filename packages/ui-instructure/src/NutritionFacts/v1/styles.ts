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

import type { NutritionFactsTheme } from '@instructure/shared-types'
import type { NutritionFactsProps, NutritionFactsStyle } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NutritionFactsTheme,
  _props: NutritionFactsProps
): NutritionFactsStyle => {
  return {
    segmentCard: {
      label: 'nutrition-facts__segment-card',
      borderStyle: 'solid',
      borderWidth: componentTheme?.cardBorderWidth,
      borderColor: componentTheme?.cardBorderColor,
      borderRadius: componentTheme?.cardBorderRadius,
      padding: componentTheme?.cardPadding,
      display: 'flex',
      flexDirection: 'column'
    },
    segmentCardExplainerContainer: {
      label: 'nutrition-facts__segment-card-explainer-container',
      marginBottom: componentTheme?.cardExplainerContainerBottomMargin
    },
    segmentContainer: {
      label: 'nutrition-facts__segment-container',
      display: 'flex',
      flexDirection: 'column',
      gap: componentTheme?.cardGap
    },
    blockContainer: {
      label: 'nutrition-facts__block-container',
      display: 'flex',
      flexDirection: 'column',
      gap: componentTheme?.cardGap
    },
    body: {
      label: 'nutrition-facts__body',
      display: 'flex',
      flexDirection: 'column',
      gap: componentTheme?.blockGap,
      padding: componentTheme?.bodyPadding,
      boxSizing: 'border-box'
    }
  }
}

export default generateStyle
