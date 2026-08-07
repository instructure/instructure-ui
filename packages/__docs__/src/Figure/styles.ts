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

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} tokens The theme's semantic and shared tokens.
 * @return {Object} The final style object, which will be used in the component
 */
import { boxShadowObjectsToCSSString } from '@instructure/ui-themes'
import type { DocsTokens } from '../withStyleForDocs'
import type { FigureProps, FigureStyle } from './props'
const generateStyle = (
  props: FigureProps,
  { semantics, sharedTokens }: DocsTokens
): FigureStyle => {
  const { recommendation } = props
  const { success, error, info } = semantics.color.background
  const iconContainerSize = '2.25rem'

  const recommendationVariants = {
    yes: {
      figure: { borderTopColor: success },
      iconContainer: { background: success }
    },
    no: {
      figure: { borderTopColor: error },
      iconContainer: { background: error }
    },
    a11y: {
      figure: { borderTopColor: info },
      iconContainer: { background: info }
    },
    none: {
      figure: {},
      iconContainer: {}
    }
  }

  return {
    figure: {
      label: 'figure',
      boxSizing: 'border-box',
      height: '100%',
      display: 'block',
      padding: 0,
      margin: 0,
      boxShadow: boxShadowObjectsToCSSString(sharedTokens.boxShadow.elevation2),
      borderTopWidth: semantics.borderWidth.md,
      borderTopStyle: 'solid',
      borderTopColor: semantics.color.stroke.accent.ash,
      ...recommendationVariants[recommendation].figure
    },

    /* there is currently not a use case for the caption and if it is used the style will need to be re-worked */
    caption: {
      label: 'figure__caption',
      display: 'block',
      fontFamily: semantics.fontFamily.base,
      fontSize: semantics.fontSize.textSm,
      color: semantics.color.text.base,
      background: '#DCEEE4',
      padding: semantics.spacing.spaceMd,
      textAlign: 'center'
    },

    content: {
      label: 'figure__content',
      display: 'block',
      position: 'relative',
      background: semantics.color.background.container,
      padding: semantics.spacing.spaceXl
    },

    iconContainer: {
      label: 'figure__iconContainer',
      position: 'absolute',
      top: '-0.0625rem',
      insetInlineEnd: '-0.0313rem',
      zIndex: 1,
      width: iconContainerSize,
      height: iconContainerSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      color: semantics.color.text.onColor,
      ...recommendationVariants[recommendation].iconContainer
    }
  }
}

export default generateStyle
