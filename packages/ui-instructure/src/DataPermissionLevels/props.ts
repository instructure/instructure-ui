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

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  DataPermissionLevelsTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'

type DataPermissionLevelsOwnProps = {
  /**
   * i18n text for the label of the modal
   */
  modalLabel: string
  /**
   * i18n text for the dataPermissionLevels title
   */
  title: string
  /**
   * i18n text for the "model and data" heading of the dataPermissionLevels
   */
  data: {
    level: string
    title: string
    description: string
    highlighted?: boolean
  }[]
  /**
   * i18n text for the close button
   */
  closeButtonText: string
  /**
   * i18n text for the close iconButton
   */
  closeIconButtonScreenReaderLabel: string
  /**
   * i18n text for the "current feature" text
   */
  currentFeatureText: string
  /**
   * i18n text for the current feature
   */
  currentFeature: string
  /**
   * i18n text for the trigger
   */
  triggerText: string
  /**
   * sets the modal size to 'fullscreen'. Used for small viewports
   */
  fullscreen?: boolean
}

type PropKeys = keyof DataPermissionLevelsOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DataPermissionLevelsProps = DataPermissionLevelsOwnProps &
  WithStyleProps<DataPermissionLevelsTheme, DataPermissionLevelsStyle> &
  OtherHTMLAttributes<DataPermissionLevelsOwnProps>

type DataPermissionLevelsStyle = ComponentStyle<
  | 'dataPermissionLevels'
  | 'body'
  | 'card'
  | 'level'
  | 'highlightedCard'
  | 'currentFeature'
  | 'contentContainer'
  | 'permissionTitle'
> & {
  maxWidth?: string
}

const allowedProps: AllowedPropKeys = [
  'fullscreen',
  'modalLabel',
  'title',
  'data',
  'closeButtonText',
  'closeIconButtonScreenReaderLabel',
  'currentFeatureText',
  'currentFeature',
  'triggerText'
]

export type { DataPermissionLevelsProps, DataPermissionLevelsStyle }
export { allowedProps }
