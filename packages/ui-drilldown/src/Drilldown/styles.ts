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

import type { DrilldownTheme } from '@instructure/shared-types'
import type {
  DrilldownProps,
  DrilldownStyleProps,
  DrilldownStyle
} from './props'

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
  componentTheme: DrilldownTheme,
  _props: DrilldownProps,
  state: DrilldownStyleProps
): DrilldownStyle => {
  const { hasHighlightedOption } = state

  return {
    drilldown: {
      label: 'drilldown',
      overflow: 'visible', // needed for focus ring!

      ...(hasHighlightedOption && {
        '&:focus::before': {
          display: 'none'
        }
      })
    },
    container: {
      label: 'drilldown__container'
    },
    headerBack: {
      label: 'drilldown__headerBack',
      minHeight: '1.25em'
    },
    headerTitle: {
      label: 'drilldown__headerTitle',
      fontWeight: componentTheme.headerTitleFontWeight
    },
    optionContainer: {
      label: 'drilldown__optionContainer',
      alignItems: 'center',
      display: 'flex',
      height: '100%'
    },
    optionLabelInfo: {
      label: 'drilldown__optionLabelInfo',
      display: 'flex',
      flexShrink: 0,
      height: '100%',
      alignItems: 'center',
      paddingInlineStart: componentTheme.labelInfoPadding
    },
    optionContent: {
      label: 'drilldown__optionContent',
      flexGrow: 1
    },

    // we use it in the index file
    headerActionColor: componentTheme.headerActionColor,
    headerActionColorInverse: componentTheme.headerActionColorInverse
  }
}

export default generateStyle
