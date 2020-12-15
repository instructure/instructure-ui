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

import generateComponentTheme from './theme'
import { error } from '@instructure/console/macro'

/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {String} props.delimiter
 * @param  {String} props.spacing
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (theme, themeOverride, props, state) => {
  const componentTheme = generateComponentTheme(theme, themeOverride)

  const { size, delimiter, spacing } = props

  const withDelimiter = delimiter !== 'none'
  const withSpacing = spacing !== 'none'

  error(
    !(withDelimiter && withSpacing),
    `[InlineList] \`itemSpacing\` has no effect inside Lists with the \`delimiter\` prop set to anything other than \`none\`.`
  )

  const sizeVariants = {
    small: { fontSize: componentTheme.fontSizeSmall },
    medium: { fontSize: componentTheme.fontSizeMedium },
    large: { fontSize: componentTheme.fontSizeLarge }
  }

  const spacingVariants = {
    'xxx-small': {
      marginInlineStart: componentTheme.spacingXXXSmall,
      marginInlineEnd: componentTheme.spacingXXXSmall
    },
    'xx-small': {
      marginInlineStart: componentTheme.spacingXXSmall,
      marginInlineEnd: componentTheme.spacingXXSmall
    },
    'x-small': {
      marginInlineStart: componentTheme.spacingXSmall,
      marginInlineEnd: componentTheme.spacingXSmall
    },
    small: {
      marginInlineStart: componentTheme.spacingSmall,
      marginInlineEnd: componentTheme.spacingSmall
    },
    medium: {
      marginInlineStart: componentTheme.spacingMedium,
      marginInlineEnd: componentTheme.spacingMedium
    },
    large: {
      marginInlineStart: componentTheme.spacingLarge,
      marginInlineEnd: componentTheme.spacingLarge
    },
    'x-large': {
      marginInlineStart: componentTheme.spacingXLarge,
      marginInlineEnd: componentTheme.spacingXLarge
    },
    'xx-large': {
      marginInlineStart: componentTheme.spacingXXLarge,
      marginInlineEnd: componentTheme.spacingXXLarge
    }
  }

  const delimiterVariants = {
    none: {
      marginInlineStart: componentTheme.noneSpacing,
      marginInlineEnd: componentTheme.noneSpacing
    },
    pipe: {
      marginInlineStart: componentTheme.pipeSpacing,
      marginInlineEnd: componentTheme.pipeSpacing,
      '&::after': { content: '"\\007C"' }
    },
    slash: {
      marginInlineStart: componentTheme.slashSpacing,
      marginInlineEnd: componentTheme.slashSpacing,
      '&::after': { content: '"\\002F"' }
    },
    arrow: {
      marginInlineStart: componentTheme.arrowSpacing,
      marginInlineEnd: componentTheme.arrowSpacing,
      '&::after': { content: '"\\003E"' }
    }
  }

  return {
    inlineListItem: {
      label: 'inlineListItem',
      fontWeight: componentTheme.fontWeight,
      fontFamily: componentTheme.fontFamily,
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      lineHeight: componentTheme.lineHeight,
      color: componentTheme.color,
      ...(withSpacing && !withDelimiter && spacingVariants[spacing]),
      ...sizeVariants[size],
      '&:first-of-type': { marginInlineStart: 0 },
      '&:last-of-type': { marginInlineEnd: 0 }
    },
    delimiter: {
      label: 'inlineListItem__delimiter',
      ...delimiterVariants[delimiter],
      '[class$=-inlineListItem]:last-of-type > &:last-child::after': {
        content: 'none'
      }
    }
  }
}

export default generateStyle
