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
  NutritionFactsTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'

type BlockType = {
  blockTitle: string
  segmentData: {
    segmentTitle: string
    description: string
    value: string
    valueDescription?: string
  }[]
}

type NutritionFactsOwnProps = {
  /**
   * i18n text for the label of the modal
   */
  modalLabel: string
  /**
   * i18n text for the Nutrition Facts title
   */
  title: string
  /**
   * i18n text for the feature name that the Nutrition Facts describes
   */
  featureName: string
  /**
   * i18n text for the "model and data" heading of the Nutrition Facts
   */
  data: BlockType[]
  /**
   * i18n text for the close button
   */
  closeButtonText: string
  /**
   * i18n text for the close iconButton
   */
  closeIconButtonScreenReaderLabel: string
  /**
   * i18n text for the trigger
   */
  triggerText: string
  /**
   * sets the modal size to 'fullscreen'. Used for small viewports
   */
  fullscreen?: boolean
}

type PropKeys = keyof NutritionFactsOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type NutritionFactsProps = NutritionFactsOwnProps &
  WithStyleProps<NutritionFactsTheme, NutritionFactsStyle> &
  OtherHTMLAttributes<NutritionFactsOwnProps>

type NutritionFactsStyle = ComponentStyle<
  | 'segmentCard'
  | 'segmentCardExplainerContainer'
  | 'segmentContainer'
  | 'blockContainer'
  | 'body'
> & {
  maxWidth?: string
}

const allowedProps: AllowedPropKeys = [
  'fullscreen',
  'modalLabel',
  'title',
  'featureName',
  'data',
  'closeButtonText',
  'closeIconButtonScreenReaderLabel',
  'triggerText'
]

export type { NutritionFactsProps, NutritionFactsStyle }
export { allowedProps }
