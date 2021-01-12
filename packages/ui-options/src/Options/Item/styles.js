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

import { matchComponentTypes } from '@instructure/ui-react-utils'

/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (componentTheme, props, state) => {
  const {
    variant,
    children,
    renderBeforeLabel: hasContentBeforeLabel,
    renderAfterLabel: hasContentAfterLabel
  } = props

  const containsList = matchComponentTypes(children, ['Options'])

  const variantVariants = {
    highlighted: {
      background: componentTheme.highlightedBackground,
      color: componentTheme.highlightedLabelColor
    },
    selected: {
      background: componentTheme.selectedBackground,
      color: componentTheme.highlightedLabelColor
    },
    disabled: { cursor: 'not-allowed', opacity: 0.5 },
    default: {}
  }

  return {
    item: {
      label: 'optionItem',
      background: componentTheme.background,
      color: componentTheme.color,
      cursor: 'pointer',
      display: 'block',
      fontSize: componentTheme.mediumFontSize,
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,
      outline: 'none',
      position: 'relative',
      transition: 'background 200ms',
      userSelect: 'none',
      ...variantVariants[variant],
      ...(containsList && { cursor: 'default' }),

      // for nested items
      '[class*=-optionItem] &': {
        // except if it has icon before
        ...(!hasContentBeforeLabel && {
          '[class$=-optionItem__container]': {
            paddingInlineStart: componentTheme.nestedPadding
          },
          '[class$=-optionItem__content--before]': {
            offsetInlineStart: componentTheme.nestedPadding
          }
        })
      }
    },
    container: {
      label: 'optionItem__container',
      display: 'block',
      padding: componentTheme.padding,
      ...(containsList && { padding: '0' }),
      ...(hasContentBeforeLabel && {
        paddingInlineEnd: componentTheme.iconPadding,
        paddingInlineStart: `calc(${componentTheme.iconPadding} * 2 + 1em)`
      }),
      ...(hasContentAfterLabel && {
        paddingInlineEnd: `calc(${componentTheme.iconPadding} * 2 + 1em)`,
        paddingInlineStart: componentTheme.iconPadding
      }),
      ...(hasContentBeforeLabel &&
        hasContentAfterLabel && {
          paddingInlineEnd: `calc(${componentTheme.iconPadding} * 2 + 1em)`,
          paddingInlineStart: `calc(${componentTheme.iconPadding} * 2 + 1em)`
        })
    },
    content: {
      label: 'optionItem__content',
      alignItems: 'center',
      display: 'flex',
      fill: componentTheme.iconColor,
      height: '100%',
      pointerEvents: 'none',
      position: 'absolute',
      top: '0'
    },
    contentBefore: {
      label: 'optionItem__content--before',
      offsetInlineEnd: 'auto',
      offsetInlineStart: componentTheme.iconPadding
    },
    contentAfter: {
      label: 'optionItem__content--after',
      offsetInlineEnd: componentTheme.iconPadding,
      offsetInlineStart: 'auto'
    }
  }
}

export default generateStyle
