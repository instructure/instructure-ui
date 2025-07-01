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

import type { DataPermissionLevelsTheme } from '@instructure/shared-types'
import type {
  DataPermissionLevelsProps,
  DataPermissionLevelsStyle
} from './props'

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
  componentTheme: DataPermissionLevelsTheme,
  _props: DataPermissionLevelsProps
): DataPermissionLevelsStyle => {
  return {
    dataPermissionLevels: {
      label: 'data-permission-levels'
    },
    body: {
      label: 'data-permission-levels__body',
      display: 'flex',
      flexDirection: 'column',
      padding: componentTheme?.bodyPadding
    },
    card: {
      label: 'data-permission-levels__card',
      padding: '2px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderWidth: componentTheme?.cardBorderWidth,
      display: 'flex',
      flexDirection: 'column'
    },
    highlightedCard: {
      label: 'data-permission-levels__highlighted-card',
      borderStyle: 'solid',
      borderWidth: componentTheme?.cardBorderWidth,
      borderColor: componentTheme?.cardBorderColor,
      borderRadius: componentTheme?.cardBorderRadius,
      padding: '2px',
      display: 'flex',
      flexDirection: 'column',
      background: `
        linear-gradient(to right,  ${componentTheme.aiTextLeftGradientColor} 0%, ${componentTheme.aiTextRightGradientColor} 100%) padding-box,
        linear-gradient(to right, ${componentTheme.aiTextLeftGradientColor} 0%, ${componentTheme.aiTextRightGradientColor} 100%) border-box`,
      border: 'solid transparent'
    },
    level: {
      label: 'data-permission-levels__level',
      color: componentTheme?.levelColor
    },
    currentFeature: {
      label: 'data-permission-levels__current-feature',
      background: `
        linear-gradient(to right, ${componentTheme.aiTextLeftGradientColor} 0%, ${componentTheme.aiTextRightGradientColor} 100%)`,
      paddingLeft: componentTheme?.currentFeaturePaddingSides,
      paddingRight: componentTheme?.currentFeaturePaddingSides,
      paddingTop: componentTheme?.currentFeaturePaddingTopBottom,
      paddingBottom: componentTheme?.currentFeaturePaddingTopBottom,
      borderTopLeftRadius: componentTheme?.cardBorderRadius,
      borderTopRightRadius: componentTheme?.cardBorderRadius
    },
    contentContainer: {
      label: 'data-permission-levels__content-container',
      background: 'white',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column'
    },
    permissionTitle: {
      label: 'data-permission-levels__permission-title',
      marginBottom: componentTheme?.permissionTitleBottomMargin
    }
  }
}

export default generateStyle
