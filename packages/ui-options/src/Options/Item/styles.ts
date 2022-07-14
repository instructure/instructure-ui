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

import type { OptionsItemTheme } from '@instructure/shared-types'
import type {
  OptionsItemProps,
  OptionsItemStyle,
  OptionsItemStyleProps
} from './props'

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
const generateStyle = (
  componentTheme: OptionsItemTheme,
  props: OptionsItemProps,
  state: OptionsItemStyleProps
): OptionsItemStyle => {
  const {
    variant,
    children,
    renderBeforeLabel: hasContentBeforeLabel,
    renderAfterLabel: hasContentAfterLabel,
    beforeLabelContentVAlign,
    afterLabelContentVAlign
  } = props
  const { color } = state

  const containsList = matchComponentTypes(children, ['Options'])

  // used for label and description too
  const colorAndVariantMap = {
    primary: {
      default: {
        background: componentTheme.background,
        color: componentTheme.color
      },
      highlighted: {
        background: componentTheme.highlightedBackground,
        color: componentTheme.highlightedLabelColor
      },
      selected: {
        background: componentTheme.selectedBackground,
        color: componentTheme.highlightedLabelColor
      },
      disabled: {
        background: componentTheme.background,
        color: componentTheme.color,
        cursor: 'not-allowed',
        opacity: 0.5
      },
      'highlighted-disabled': {
        background: componentTheme.highlightedBackground,
        color: componentTheme.highlightedLabelColor,
        cursor: 'not-allowed',
        opacity: 0.5
      }
    },
    'primary-inverse': {
      default: {
        background: componentTheme.backgroundInverse,
        color: componentTheme.colorInverse
      },
      highlighted: {
        background: componentTheme.highlightedBackgroundInverse,
        color: componentTheme.highlightedLabelColorInverse
      },
      selected: {
        background: componentTheme.selectedBackgroundInverse,
        color: componentTheme.highlightedLabelColorInverse
      },
      disabled: {
        background: componentTheme.backgroundInverse,
        color: componentTheme.colorInverse,
        cursor: 'not-allowed',
        opacity: 0.6
      },
      'highlighted-disabled': {
        background: componentTheme.highlightedBackgroundInverse,
        color: componentTheme.highlightedLabelColorInverse,
        cursor: 'not-allowed',
        opacity: 0.6
      }
    }
  }

  const descriptionColorVariants = {
    primary: {
      color: componentTheme.descriptionColor
    },
    'primary-inverse': {
      color: componentTheme.descriptionColorInverse
    }
  }

  const getContentVAlign = (type: 'before' | 'after') => {
    const vAlign =
      type === 'before' ? beforeLabelContentVAlign : afterLabelContentVAlign

    const vOffset =
      type === 'before'
        ? componentTheme.beforeLabelContentVOffset
        : componentTheme.afterLabelContentVOffset

    return {
      start: {
        alignItems: 'flex-start',
        paddingBlockStart: vOffset
      },
      center: {
        alignItems: 'center',
        paddingBlockStart: vOffset,
        paddingBlockEnd: vOffset
      },
      end: {
        alignItems: 'flex-end',
        paddingBlockEnd: vOffset
      }
    }[vAlign!]
  }

  const linkStyles = { textDecoration: 'none', color: 'currentColor' }

  const transition = 'background 200ms'

  return {
    item: {
      label: 'optionItem',
      cursor: 'pointer',
      display: 'block',
      fontSize: componentTheme.fontSize,
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,
      outline: 'none',
      position: 'relative',
      transition,
      userSelect: 'none',
      ...(color && colorAndVariantMap[color][variant!]),
      ...(containsList && { cursor: 'default' }),

      // for nested items
      '[class*=-optionItem] &': {
        // except if it has icon before
        ...(!hasContentBeforeLabel && {
          '[class$=-optionItem__container]': {
            paddingInlineStart: componentTheme.nestedPadding
          },
          '[class$=-optionItem__content--before]': {
            insetInlineStart: componentTheme.nestedPadding
          }
        })
      }
    },
    container: {
      label: 'optionItem__container',
      display: 'block',
      outline: 'none',
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
        }),

      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
      '&:is(a)': {
        '&, &:link, &:visited, &:active, &:hover, &:focus': linkStyles
      },
      '&:-webkit-any(a)': {
        '&, &:link, &:visited, &:active, &:hover, &:focus': linkStyles
      }
    },
    content: {
      label: 'optionItem__content',
      display: 'flex',
      height: '100%',
      boxSizing: 'border-box',
      pointerEvents: 'none',
      position: 'absolute',
      top: '0'
    },
    contentBefore: {
      label: 'optionItem__content--before',
      insetInlineEnd: 'auto',
      insetInlineStart: componentTheme.iconPadding,
      ...getContentVAlign('before')
    },
    contentAfter: {
      label: 'optionItem__content--after',
      insetInlineEnd: componentTheme.iconPadding,
      insetInlineStart: 'auto',
      ...getContentVAlign('after')
    },
    description: {
      label: 'optionItem__description',
      display: 'block',
      transition,
      paddingBlockStart: componentTheme.descriptionPaddingStart,
      fontWeight: componentTheme.descriptionFontWeight,
      fontSize: componentTheme.descriptionFontSize,
      lineHeight: componentTheme.descriptionLineHeight,
      ...(color && {
        ...descriptionColorVariants[color],
        ...colorAndVariantMap[color][variant!]
      }),
      background: 'none' // needed to clear variant background
    }
  }
}

export default generateStyle
