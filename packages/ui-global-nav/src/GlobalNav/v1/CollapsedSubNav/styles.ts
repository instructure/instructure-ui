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

import { calcFocusOutlineStyles } from '@instructure/emotion'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import type { CollapsedSubNavStyle } from './props.js'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param sharedTokens Shared token object that stores common values for the theme.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['SubNav']>,
  _params: undefined,
  sharedTokens: SharedTokens
): CollapsedSubNavStyle => {
  // SubNav has no border width token
  const borderWidth = '0.0625rem'

  return {
    collapsedSubNav: {
      label: 'collapsedSubNav',
      width: componentTheme.minimizedWidth,
      flexShrink: 0,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      // the strip widens on hover, and the icon moves out with its outer edge
      alignItems: 'flex-end',
      margin: 0,
      padding: 0,
      paddingTop: `var(--globalNav-collapseButtonTop, ${componentTheme.minimizedVerticalPadding})`,
      border: 'none',
      borderInlineStart: `${borderWidth} solid ${componentTheme.borderColor}`,
      // the strip is the end of the rail card, so it takes the card's end corners
      borderStartEndRadius: 'inherit',
      borderEndEndRadius: 'inherit',
      backgroundColor: componentTheme.backgroundColor,
      color: componentTheme.textColor,
      cursor: 'pointer',
      ...calcFocusOutlineStyles(
        {
          ...sharedTokens.focusOutline,
          // an outside ring would cover the main nav divider and the card border
          inset: `calc(-1 * ${sharedTokens.focusOutline.width})`
        },
        { focusPosition: 'inset' }
      ),
      '&:hover': {
        width: componentTheme.minimizedHoverWidth
      }
    },
    icon: {
      label: 'collapsedSubNav__icon',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // the width of the strip at rest, so the icon is centered until the strip widens
      width: `calc(${componentTheme.minimizedWidth} - ${borderWidth})`,
      // the height of the rail's collapse button, so both icons share a center line
      height: 'var(--globalNav-collapseButtonHeight)'
    }
  }
}

export default generateStyle
