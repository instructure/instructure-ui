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

import { boxShadowObjectsToCSSString } from '@instructure/ui-themes'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'

import type { SegmentedControlStyle } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param _params Unused, the control has no style parameters.
 * @param  {Object} sharedTokens Shared token object
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['SegmentedControl']>,
  _params: undefined,
  sharedTokens: SharedTokens
): SegmentedControlStyle => {
  return {
    overflowWrapper: {
      label: 'segmentedControl__overflowWrapper',
      display: 'inline-flex',
      position: 'relative',
      maxWidth: '100%'
    },
    // the padding makes a hit area that reaches from the track edge past the
    // button, so a near miss can't land on the option underneath
    arrow: {
      label: 'segmentedControl__arrow',
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 1,
      // the shadow belongs to the floating button, not the padded hit area
      '& > *': {
        boxShadow: boxShadowObjectsToCSSString(
          sharedTokens.boxShadow.elevation3
        )
      }
    },
    arrowPrevious: {
      label: 'segmentedControl__arrowPrevious',
      insetInlineStart: 0,
      paddingInlineStart: componentTheme.trackPadding,
      paddingInlineEnd: componentTheme.arrowPaddingLg
    },
    arrowNext: {
      label: 'segmentedControl__arrowNext',
      insetInlineEnd: 0,
      paddingInlineStart: componentTheme.arrowPaddingLg,
      paddingInlineEnd: componentTheme.trackPadding
    },
    segmentedControl: {
      label: 'segmentedControl',
      display: 'inline-flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      maxWidth: '100%',
      gap: componentTheme.trackGap,
      padding: componentTheme.trackPadding,
      borderRadius: componentTheme.TrackBorderRadius,
      background: componentTheme.trackBackgroundColor,
      opacity: componentTheme.opacityBase,
      minWidth: 0,
      overflowX: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': { display: 'none' },
      '& > [role="radio"]': { flexShrink: 0 }
    }
  }
}

export default generateStyle
