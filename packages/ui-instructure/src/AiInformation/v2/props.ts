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
import type { ComponentStyle, ThemeOverrideValue } from '@instructure/emotion'
import type { OtherHTMLAttributes, Renderable } from '@instructure/shared-types'
import type { NutritionFactsProps } from '../../NutritionFacts/v1/props'
import type { DataPermissionLevelsProps } from '../../DataPermissionLevels/v1/props'

type AiInformationOwnProps = {
  /**
   * i18n text for the title of popover
   */
  title: string
  /**
   * the data structure of the Features on the popover
   */
  data: {
    featureName: string
    privacyNoticeText: string
    privacyNoticeUrl: string
    permissionLevelText: string
    permissionLevel: string
    description: string
    permissionLevelsModalTriggerText: string
    modelNameText: string
    modelName: string
    nutritionFactsModalTriggerText: string
  }[]
  /**
   *  sets the modal size to 'fullscreen' for NutritionFacts and DataPermissionLevels. Used for small viewports
   */
  fullscreenModals?: boolean

  /**
   * The element that triggers the popover
   */
  trigger: Renderable

  // this is the same as DataPermissionLevels' props

  /**
   * i18n text for the label of the dataPermissionLevels modal
   */
  dataPermissionLevelsModalLabel: DataPermissionLevelsProps['modalLabel']
  /**
   * i18n text for the dataPermissionLevels title
   */
  dataPermissionLevelsTitle: DataPermissionLevelsProps['title']
  /**
   * i18n text for the "model and data" heading of the dataPermissionLevels
   */
  dataPermissionLevelsData: DataPermissionLevelsProps['data']
  /**
   * i18n text for the dataPermissionLevels close button
   */
  dataPermissionLevelsCloseButtonText: DataPermissionLevelsProps['closeButtonText']
  /**
   * i18n text for the dataPermissionLevels close iconButton
   */
  dataPermissionLevelsCloseIconButtonScreenReaderLabel: DataPermissionLevelsProps['closeIconButtonScreenReaderLabel']
  /**
   * i18n text for the dataPermissionLevels "current feature" text
   */
  dataPermissionLevelsCurrentFeatureText: DataPermissionLevelsProps['currentFeatureText']
  /**
   * i18n text for the dataPermissionLevels current feature
   */
  dataPermissionLevelsCurrentFeature: DataPermissionLevelsProps['currentFeature']

  // this is the same as NutritionFacts' props

  /**
   * i18n text for the NutritionFacts label of the modal
   */
  nutritionFactsModalLabel: NutritionFactsProps['modalLabel']
  /**
   * i18n text for the NutritionFacts title
   */
  nutritionFactsTitle: NutritionFactsProps['title']
  /**
   * i18n text for the feature name that the NutritionFacts describes
   */
  nutritionFactsFeatureName: NutritionFactsProps['featureName']
  /**
   * i18n text for the "model and data" heading of the NutritionFacts
   */
  nutritionFactsData: NutritionFactsProps['data']
  /**
   * i18n text for the NutritionFacts close button
   */
  nutritionFactsCloseButtonText: NutritionFactsProps['closeButtonText']
  /**
   * i18n text for the NutritionFacts close iconButton
   */
  nutritionFactsCloseIconButtonScreenReaderLabel: NutritionFactsProps['closeIconButtonScreenReaderLabel']
}

type PropKeys = keyof AiInformationOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type AiInformationProps = AiInformationOwnProps & {
  themeOverride?: ThemeOverrideValue
} & OtherHTMLAttributes<AiInformationOwnProps>

type AiInformationStyle = ComponentStyle<
  | 'aiInformation'
  | 'header'
  | 'privacyNotice'
  | 'featureName'
  | 'permissionLevelText'
  | 'permissionLevel'
  | 'description'
  | 'permissionLevelsModalTriggerText'
  | 'modelNameText'
  | 'modelName'
  | 'divider'
> & {
  maxWidth?: string
}

const allowedProps: AllowedPropKeys = [
  'fullscreenModals',
  'title',
  'data',
  'trigger',
  'dataPermissionLevelsModalLabel',
  'dataPermissionLevelsTitle',
  'dataPermissionLevelsData',
  'dataPermissionLevelsCloseButtonText',
  'dataPermissionLevelsCloseIconButtonScreenReaderLabel',
  'dataPermissionLevelsCurrentFeatureText',
  'dataPermissionLevelsCurrentFeature',
  'nutritionFactsModalLabel',
  'nutritionFactsTitle',
  'nutritionFactsFeatureName',
  'nutritionFactsData',
  'nutritionFactsCloseButtonText',
  'nutritionFactsCloseIconButtonScreenReaderLabel'
]

export type { AiInformationProps, AiInformationStyle }
export { allowedProps }
