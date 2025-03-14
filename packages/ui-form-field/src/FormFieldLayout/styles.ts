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
import type { FormFieldLayoutTheme } from '@instructure/shared-types'
import { mapSpacingToShorthand } from '@instructure/emotion'

const generateGridLayout = (
  isInlineLayout: boolean,
  hasNewErrorMsgAndIsGroup: boolean,
  hasVisibleLabel: boolean,
  hasMessages: boolean
) => {
  if (isInlineLayout) {
    if (hasNewErrorMsgAndIsGroup) {
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
  if (hasNewErrorMsgAndIsGroup) {
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
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} styleProps
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: FormFieldLayoutTheme,
  props: FormFieldLayoutProps,
  styleProps: FormFieldStyleProps
): FormFieldLayoutStyle => {
  const { inline, layout, vAlign, labelAlign, margin } = props
  const { hasMessages, hasVisibleLabel, hasNewErrorMsgAndIsGroup } = styleProps
  const cssMargin = mapSpacingToShorthand(margin, componentTheme.spacing)
  const isInlineLayout = layout === 'inline'
  // This is quite ugly, we should simplify it
  const gridTemplateAreas = generateGridLayout(
    isInlineLayout,
    hasNewErrorMsgAndIsGroup,
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
    color: componentTheme.color,
    fontFamily: componentTheme.fontFamily,
    fontWeight: componentTheme.fontWeight,
    fontSize: componentTheme.fontSize,
    lineHeight: componentTheme.lineHeight,
    ...(isInlineLayout && {
      margin: '0',
      // when inline add a small padding between the label and the control
      paddingRight: componentTheme.inlinePadding,
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
            hasNewErrorMsgAndIsGroup,
            hasVisibleLabel,
            hasMessages
          )
        },
      columnGap: '0.375rem',
      rowGap: '0.75rem',
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
      '&:-webkit-any(label)': labelStyles
    },
    formFieldChildren: {
      label: 'formFieldLayout__children',
      gridArea: 'controls',
      // add a small margin between the message and the controls
      ...(hasMessages && hasNewErrorMsgAndIsGroup && { marginTop: '0.375rem' }),
      ...(isInlineLayout &&
        inline && {
          [`@media screen and (width >= ${componentTheme.stackedOrInlineBreakpoint})`]:
            {
              justifySelf: 'start'
            }
        })
    }
  }
}

export default generateStyle
