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

// TODO-STYLES - NewCanvas type shouldn't be used here, a more general type is required
import type { NewCanvas } from '@instructure/ui-themes'
import type { PillProps, PillStyle } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewCanvas['components']['Pill'],
  props: PillProps
): PillStyle => {
  const { color } = props

  const pillColorVariants = {
    primary: {
      color: componentTheme.baseText,
      borderColor: componentTheme.baseBorder
    },
    success: {
      color: componentTheme.successText,
      borderColor: componentTheme.successBorder
    },
    info: {
      color: componentTheme.infoText,
      borderColor: componentTheme.infoBorder
    },
    warning: {
      color: componentTheme.warningText,
      borderColor: componentTheme.warningBorder
    },
    error: {
      color: componentTheme.errorText,
      borderColor: componentTheme.errorBorder
    }
  }

  return {
    pill: {
      label: 'pill',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      padding: `0 ${componentTheme.paddingHorizontal}`,
      background: componentTheme.background,
      borderWidth: componentTheme.borderWidth,
      borderStyle: componentTheme.borderStyle.style,
      borderRadius: componentTheme.borderRadius,
      /* line-height does not account for top/bottom border width */
      lineHeight: `calc(${componentTheme.height} - (${componentTheme.borderWidth} * 2))`,
      ...pillColorVariants[color!]
    },
    status: {
      label: 'pill__status',
      boxSizing: 'border-box',
      fontSize: componentTheme.textFontSize,
      fontWeight: componentTheme.statusLabelFontWeight,
      marginRight: '0.125rem'
    },
    icon: {
      label: 'pill__icon',
      display: 'flex',
      alignItems: 'center',
      marginRight: '0.375rem',
      fontSize: '0.75rem'
    },
    text: {
      label: 'pill__text',
      boxSizing: 'border-box',
      maxWidth: componentTheme.maxWidth,
      fontSize: componentTheme.textFontSize,
      fontWeight: componentTheme.textFontWeight,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    maxWidth: componentTheme.maxWidth
  }
}

export default generateStyle
