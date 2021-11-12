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
import type { ComponentStyle, WithStyleProps } from '@instructure/emotion'
import type { PropValidators } from '@instructure/shared-types'
import { Children } from '@instructure/ui-prop-types'
import PropTypes from 'prop-types'
import {
  Shadows,
  Typography,
  Colors,
  Spacing,
  Border,
  Stacking
} from '@instructure/shared-types'

type FigureOwnProps = {
  title?: React.ReactNode
  caption?: React.ReactNode
  recommendation: 'yes' | 'no' | 'a11y' | 'none'
  iconTitle?: string
  float?: 'start' | 'end' | 'none'
  children?: React.ReactNode
}

type PropKeys = keyof FigureOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FigureProps = FigureOwnProps & WithStyleProps<FigureTheme, FigureStyle>

type FigureTheme = {
  shadow: Shadows['depth2']
  captionFontFamily: Typography['fontFamily']
  captionFontSize: Typography['fontSizeSmall']
  captionBackground: Colors['porcelain']
  captionPadding: Spacing['small']
  captionColor: Colors['oxford']
  borderWidth: Border['widthMedium']
  borderColor: Colors['oxford']
  contentPadding: Spacing['medium']
  contentBackground: Colors['white']
  yesColor: Colors['shamrock']
  noColor: Colors['crimson']
  a11yColor: Colors['electric']
  iconColor: Colors['white']
  iconContainerStacking: Stacking['above']
  iconContainerSize: Spacing['large']
  floatMargin: Spacing['large']
  floatMarginSmall: Spacing['xxSmall']
}

type FigureStyle = ComponentStyle<
  'figure' | 'caption' | 'content' | 'iconContainer'
>

const propTypes: PropValidators<PropKeys> = {
  title: PropTypes.node,
  caption: PropTypes.node,
  recommendation: PropTypes.oneOf(['yes', 'no', 'a11y', 'none']),
  iconTitle: PropTypes.string,
  float: PropTypes.oneOf(['start', 'end', 'none']),
  children: Children.oneOf(['FigureItem'])
}

const allowedProps: AllowedPropKeys = [
  'caption',
  'children',
  'float',
  'iconTitle',
  'recommendation',
  'title'
]

export type { FigureProps, FigureStyle, FigureTheme }
export { propTypes, allowedProps }
