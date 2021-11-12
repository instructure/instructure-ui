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
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
import type { FigureProps, FigureStyle, FigureTheme } from './props'
const generateStyle = (
  componentTheme: FigureTheme,
  props: FigureProps
): FigureStyle => {
  const { recommendation } = props

  const recommendationVariants = {
    yes: {
      figure: { borderTopColor: componentTheme.yesColor },
      iconContainer: { background: componentTheme.yesColor }
    },
    no: {
      figure: { borderTopColor: componentTheme.noColor },
      iconContainer: { background: componentTheme.noColor }
    },
    a11y: {
      figure: { borderTopColor: componentTheme.a11yColor },
      iconContainer: { background: componentTheme.a11yColor }
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
      boxShadow: componentTheme.shadow,
      borderTopWidth: componentTheme.borderWidth,
      borderTopStyle: 'solid',
      borderTopColor: componentTheme.borderColor,
      ...recommendationVariants[recommendation].figure
    },

    /* there is currently not a use case for the caption and if it is used the style will need to be re-worked */
    caption: {
      label: 'figure__caption',
      display: 'block',
      fontFamily: componentTheme.captionFontFamily,
      fontSize: componentTheme.captionFontSize,
      color: componentTheme.captionColor,
      background: componentTheme.captionBackground,
      padding: componentTheme.captionPadding,
      textAlign: 'center'
    },

    content: {
      label: 'figure__content',
      display: 'block',
      position: 'relative',
      background: componentTheme.contentBackground,
      padding: componentTheme.contentPadding
    },

    iconContainer: {
      label: 'figure__iconContainer',
      position: 'absolute',
      top: '-0.0625rem',
      insetInlineEnd: '-0.0313rem',
      zIndex: componentTheme.iconContainerStacking,
      width: componentTheme.iconContainerSize,
      height: componentTheme.iconContainerSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      color: componentTheme.iconColor,
      ...recommendationVariants[recommendation].iconContainer
    }
  }
}

export default generateStyle
