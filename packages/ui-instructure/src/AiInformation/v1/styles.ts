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

import type { AiInformationTheme } from '@instructure/shared-types'
import type { AiInformationProps, AiInformationStyle } from './props'

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
  componentTheme: AiInformationTheme,
  _props: AiInformationProps
): AiInformationStyle => {
  return {
    aiInformation: {
      label: 'ai-information',
      width: '18.5rem',
      padding: componentTheme.bodyPadding,
      boxSizing: 'border-box'
    },
    header: {
      label: 'ai-information__header',
      marginBottom: componentTheme.headingBottomMargin
    },
    privacyNotice: {
      label: 'ai-information__privacyNotice',
      marginBottom: componentTheme.headingBottomMargin
    },
    featureName: {
      label: 'ai-information__feature-name',
      marginBottom: componentTheme.featureNameBottomMargin
    },
    permissionLevelText: {
      label: 'ai-information__permission-level-text',
      marginBottom: componentTheme.permissionLevelTextBottomMargin
    },
    permissionLevel: {
      label: 'ai-information__permission-level',
      marginBottom: componentTheme.permissionLevelBottomMargin,
      color: componentTheme.levelColor
    },
    description: {
      label: 'ai-information__description',
      marginBottom: componentTheme.descriptionBottomMargin
    },
    permissionLevelsModalTriggerText: {
      label: 'ai-information__permission-levels-modal-trigger-text',
      marginBottom: componentTheme.permissionLevelsModalTriggerBottomMargin
    },
    modelNameText: {
      label: 'ai-information__model-name-text',
      marginBottom: componentTheme.modelNameTextBottomMargin
    },
    modelName: {
      label: 'ai-information__model-name',
      marginBottom: componentTheme.modelNameBottomMargin
    },
    divider: {
      label: 'ai-information__divider',
      marginBottom: componentTheme.dividerMargin,
      marginTop: componentTheme.dividerMargin,
      borderTop: 'solid 1px',
      width: '100%',
      borderColor: componentTheme.dividerColor
    }
  }
}

export default generateStyle
