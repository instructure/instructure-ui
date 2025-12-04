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

import type {
  FormFieldLayoutProps,
  FormFieldLayoutStyle,
  FormFieldStyleProps
} from './props'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import { calcMarginFromShorthand } from '@instructure/emotion'

type StyleParams = FormFieldStyleProps & {
  inline: FormFieldLayoutProps['inline']
  layout: FormFieldLayoutProps['layout']
  vAlign: FormFieldLayoutProps['vAlign']
  labelAlign: FormFieldLayoutProps['labelAlign']
  margin: FormFieldLayoutProps['margin']
  messages: FormFieldLayoutProps['messages']
  isRequired: FormFieldLayoutProps['isRequired']
  invalid: boolean
}

const generateGridLayout = (
  isInlineLayout: boolean,
  hasErrorMsgAndIsGroup: boolean,
  hasVisibleLabel: boolean,
  hasMessages: boolean
) => {
  if (isInlineLayout) {
    if (hasErrorMsgAndIsGroup) {
      if (hasMessages) {
        return `${hasVisibleLabel ? ' "label messages"' : '. messages'}
                                      ". controls"`
      } else {
        return `${hasVisibleLabel ? ' "label controls"' : '. controls'}`
      }
    } else {
      return `${hasVisibleLabel ? ' "label controls"' : '. controls'}
              ${hasMessages ? ' ". messages"' : ''}`
    }
  }
  // stacked layout -- in this case we could use a simple `Flex`
  if (hasErrorMsgAndIsGroup) {
    return `${hasVisibleLabel ? ' "label"' : ''}
            ${hasMessages ? ' "messages"' : ''}
            "controls"`
  } else {
    return `${hasVisibleLabel ? ' "label"' : ''}
            "controls"
            ${hasMessages ? ' "messages"' : ''}`
  }
}
/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @param sharedTokens Shared token object that stores common values for the theme.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewComponentTypes['FormFieldLayout'],
  params: StyleParams,
  sharedTokens: SharedTokens
): FormFieldLayoutStyle => {
  const { inline, layout, vAlign, labelAlign, margin, messages } = params
  const { hasMessages, hasVisibleLabel, hasErrorMsgAndIsGroup } = params
  const cssMargin = calcMarginFromShorthand(margin, sharedTokens.spacing)
  const isInlineLayout = layout === 'inline'

  const hasNonEmptyMessages = messages?.reduce(
    (acc, message) => acc || message.type !== 'screenreader-only',
    false
  )

  // This is quite ugly, we should simplify it
  const gridTemplateAreas = generateGridLayout(
    isInlineLayout,
    hasErrorMsgAndIsGroup,
    hasVisibleLabel,
    hasMessages
  )
  let gridTemplateColumns = '100%' // stacked layout
  if (isInlineLayout) {
    gridTemplateColumns = '1fr 3fr'
    if (inline) {
      gridTemplateColumns = 'auto 3fr'
    }
  }
  const labelStyles = {
    all: 'initial',
    display: 'block',
    gridArea: 'label',
    color: componentTheme.textColor,
    fontFamily: componentTheme.fontFamily,
    fontWeight: componentTheme.fontWeight,
    fontSize: componentTheme.fontSize,
    lineHeight: componentTheme.lineHeight,
    ...(isInlineLayout && {
      margin: '0',
      // when inline add a small padding between the label and the control
      paddingRight: componentTheme.gapPrimitives,
      // and use the horizontal alignment prop
      [`@media screen and (width >= ${componentTheme.stackedOrInlineBreakpoint})`]:
        {
          textAlign: labelAlign
        }
    })
  }

  let alignItems = 'start'
  if (vAlign == 'top') {
    alignItems = 'start'
  } else if (vAlign == 'middle') {
    alignItems = 'center'
  } else if (vAlign == 'bottom') {
    alignItems = 'end'
  }
  return {
    formFieldLayout: {
      label: 'formFieldLayout',
      all: 'initial',
      border: '0',
      padding: '0',
      margin: cssMargin,
      minWidth: '0',
      direction: 'inherit',
      textAlign: 'start',
      opacity: 'inherit',
      display: 'grid',
      alignItems: alignItems,
      verticalAlign: 'middle', // removes margin in inline layouts
      gridTemplateColumns: gridTemplateColumns,
      gridTemplateAreas: gridTemplateAreas,
      [`@media screen and (width < ${componentTheme.stackedOrInlineBreakpoint})`]:
        {
          // for small screens use the stacked layout
          gridTemplateColumns: '100%',
          gridTemplateAreas: generateGridLayout(
            false,
            hasErrorMsgAndIsGroup,
            hasVisibleLabel,
            hasMessages
          )
        },
      columnGap: '0.375rem',
      rowGap: hasNonEmptyMessages ? componentTheme.gapPrimitives : '0',
      width: '100%',
      ...(inline && {
        display: 'inline-grid',
        width: 'auto'
      })
    },
    formFieldLabel: {
      label: 'formFieldLayout__label',
      ...labelStyles,
      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
      '&:is(label)': labelStyles,
      '&:-webkit-any(label)': labelStyles,

      paddingBottom: hasNonEmptyMessages ? '0' : componentTheme.gapPrimitives
    },
    formFieldChildren: {
      label: 'formFieldLayout__children',
      gridArea: 'controls',
      // add a small margin between the message and the controls
      ...(hasMessages && hasErrorMsgAndIsGroup && { marginTop: '0.375rem' }),
      ...(isInlineLayout &&
        inline && {
          [`@media screen and (width >= ${componentTheme.stackedOrInlineBreakpoint})`]:
            {
              justifySelf: 'start'
            }
        })
    },
    requiredAsterisk: {
      label: 'formFieldLayout__requiredAsterisk',
      color: componentTheme.asteriskColor
    }
  }
}

export default generateStyle
