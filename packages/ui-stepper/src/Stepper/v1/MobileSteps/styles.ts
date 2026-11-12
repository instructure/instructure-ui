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

import { calcFocusOutlineStyles } from '@instructure/emotion'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'

import type { MobileStepsStyle } from './props.js'

type StyleParams = {
  expanded: boolean
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
  componentTheme: ReturnType<NewComponentTypes['Stepper']>,
  params: StyleParams,
  sharedTokens: SharedTokens
): MobileStepsStyle => {
  const { expanded } = params

  return {
    bar: {
      label: 'mobileSteps__bar',
      display: 'flex',
      flexDirection: 'column',
      // TODO: the row gap and the typography below are guessed from the designs, replace them with
      // tokens once design adds them; font families and text colours are inherited until then
      gap: '0.25rem',
      padding: `${componentTheme.mobileTogglePaddingVertical} ${componentTheme.mobileTogglePaddingHorizontal}`,
      borderRadius: componentTheme.mobileToggleBorderRadius,
      backgroundColor: expanded
        ? componentTheme.mobileToggleExpandedBackground
        : componentTheme.mobileToggleBackground,
      // the ring goes around the whole bar, which reads as one control
      ...calcFocusOutlineStyles(sharedTokens.focusOutline, {
        focusWithin: true
      })
    },
    heading: {
      label: 'mobileSteps__heading',
      margin: 0,
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    title: {
      label: 'mobileSteps__title',
      margin: 0,
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.25
    },
    toggle: {
      label: 'mobileSteps__toggle',
      display: 'flex',
      alignItems: 'center',
      gap: componentTheme.mobileToggleContentGap,
      width: '100%',
      margin: 0,
      padding: 0,
      border: 'none',
      backgroundColor: 'transparent',
      color: 'inherit',
      fontFamily: 'inherit',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      textAlign: 'start',
      cursor: 'pointer',
      // the bar draws the focus ring
      outline: 'none'
    },
    list: {
      label: 'mobileSteps__list',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      marginBlockStart: componentTheme.mobileToggleMainGap,
      padding: 0,
      listStyleType: 'none',
      // the display above would override the hidden attribute
      '&[hidden]': {
        display: 'none'
      }
    }
  }
}

export default generateStyle
