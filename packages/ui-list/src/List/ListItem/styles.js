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

import { error } from '@instructure/console/macro'

/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {String} props.delimiter
 * @param  {String} props.spacing
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (componentTheme, props, state) => {
  const { size, delimiter, spacing } = props

  const withDelimiter = delimiter !== 'none'
  const withSpacing = spacing !== 'none'

  error(
    !(withDelimiter && withSpacing),
    `[List] \`itemSpacing\` has no effect inside Lists with the \`delimiter\` prop set to anything other than \`none\`.`
  )

  const sizeVariants = {
    small: { fontSize: componentTheme.fontSizeSmall },
    medium: { fontSize: componentTheme.fontSizeMedium },
    large: { fontSize: componentTheme.fontSizeLarge }
  }

  const spacingVariants = {
    'xxx-small': {
      marginTop: componentTheme.spacingXXXSmall,
      marginBottom: componentTheme.spacingXXXSmall
    },
    'xx-small': {
      marginTop: componentTheme.spacingXXSmall,
      marginBottom: componentTheme.spacingXXSmall
    },
    'x-small': {
      marginTop: componentTheme.spacingXSmall,
      marginBottom: componentTheme.spacingXSmall
    },
    small: {
      marginTop: componentTheme.spacingSmall,
      marginBottom: componentTheme.spacingSmall
    },
    medium: {
      marginTop: componentTheme.spacingMedium,
      marginBottom: componentTheme.spacingMedium
    },
    large: {
      marginTop: componentTheme.spacingLarge,
      marginBottom: componentTheme.spacingLarge
    },
    'x-large': {
      marginTop: componentTheme.spacingXLarge,
      marginBottom: componentTheme.spacingXLarge
    },
    'xx-large': {
      marginTop: componentTheme.spacingXXLarge,
      marginBottom: componentTheme.spacingXXLarge
    }
  }

  const delimiterVariants = {
    dashed: {
      listStylePosition: 'inside',
      '&:not(:first-of-type)': {
        borderTop: componentTheme.delimiterDashedBorder
      }
    },
    solid: {
      listStylePosition: 'inside',
      '&:not(:first-of-type)': {
        borderTop: componentTheme.delimiterSolidBorder
      }
    }
  }

  return {
    listItem: {
      label: 'listItem',
      fontWeight: componentTheme.fontWeight,
      fontFamily: componentTheme.fontFamily,
      lineHeight: componentTheme.lineHeight,
      color: componentTheme.color,
      padding: 0,
      ...sizeVariants[size],
      ...(withSpacing && !withDelimiter && spacingVariants[spacing]),
      ...(withDelimiter && delimiterVariants[delimiter]),

      '&:first-of-type': { marginTop: '0' },
      '&:last-of-type': { marginBottom: '0' }
    }
  }
}

export default generateStyle
