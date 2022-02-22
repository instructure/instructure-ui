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

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@emotion/react'

import { TextDirectionContext } from '@instructure/ui-i18n'
import { DeterministicIdContextProvider } from '@instructure/ui-react-utils'

import { getTheme } from '../EmotionThemeProvider'

import type { ThemeOrOverride } from '../EmotionTypes'
import type { DeterministicIdProviderValue } from '@instructure/ui-react-utils'

type InstUIProviderProps = {
  children?: React.ReactNode

  /**
   * A full theme or an override object
   */
  theme?: ThemeOrOverride

  /**
   * The text direction to use in the descendants. If not provided, it uses the following in this priority order:
   *   - The value given in a parent `TextDirectionContext`
   *   - The `dir` prop of `document.documentElement` or its `direction` CSS prop
   *   - The default `ltr`
   */
  dir?: 'ltr' | 'rtl'

  /**
   * A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) which keeps track of specific InstUI components. (generally this is used for deterministic id generation for [SSR](/#server-side-rendering))
   */
  instanceCounterMap?: DeterministicIdProviderValue
}

/**
 * ---
 * category: components/utilities
 * ---
 * @module InstUISettingsProvider
 * @tsProps
 *
 * Wrapper for emotion js's [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype).
 *
 * Applies the given theme. It handles either a full theme, or an overrides object.
 * You can also specify the requested text direction for its descendants.
 *
 * It accepts the following props:
 * - theme - A full theme or an override object.
 * - dir - The text direction to use in the descendants. If not
 * given it uses the following in this priority order:
 *   - The value given in a parent `TextDirectionContext`
 *   - The `dir` prop of `document.documentElement` or its `direction` CSS prop
 *   - `ltr`
 * - instanceCounterMap - A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * which keeps track of specific InstUI components. (generally this is used for deterministic id generation for [SSR](/#server-side-rendering))
 *
 * ```js
 *
 * import { canvas, instructure } from '@instructure/ui-themes'
 * import { InstUISettingsProvider } from '@instructure/emotion'
 *
 * <InstUISettingsProvider theme={canvas}>
 *   <div>Canvas themed part</div>
 *
 *   <InstUISettingsProvider
 *     theme={{
 *       themeOverrides: {
 *         canvas: {
 *           colors: {
 *             backgroundLightest: '#fefefe'
 *           },
 *           borders: {
 *             style: 'dashed'
 *           }
 *         }
 *       }
 *     }}
 *   >
 *     <div>Canvas with new 'backgroundLightest'</div>
 *   </InstUISettingsProvider>
 *
 *   <InstUISettingsProvider theme={instructure} dir="rtl">
 *     <div>Instructure themed part with RTL text</div>
 *   </InstUISettingsProvider>
 *
 *    //this is mostly needed for Server Side Rendering, to read more:
 *    //read our [SSR](/#server-side-rendering) guide
 *    const counter = generateInstanceCounterMap()
 *    counter.set("Alert", 5)
 *   <InstUISettingsProvider instanceCounterMap={counter}>
 *     //this Alert's rendered DOM Node will have [id="Alert_5"] on it
 *     <Alert>Test!</Alert>
 *   </InstUISettingsProvider>
 * </InstUISettingsProvider>
 * ```
 */
function InstUISettingsProvider({
  children,
  theme = {},
  dir,
  instanceCounterMap
}: InstUIProviderProps) {
  const finalDir = dir || useContext(TextDirectionContext)

  if (process.env.NODE_ENV !== 'production' && finalDir === 'auto') {
    console.warn(
      "'auto' is not an supported value for the 'dir' prop. Please pass 'ltr' or 'rtl'"
    )
  }

  return (
    <DeterministicIdContextProvider instanceCounterMap={instanceCounterMap}>
      <ThemeProvider theme={getTheme(theme)}>
        <TextDirectionContext.Provider value={finalDir}>
          {children}
        </TextDirectionContext.Provider>
      </ThemeProvider>
    </DeterministicIdContextProvider>
  )
}

InstUISettingsProvider.propTypes = {
  /* eslint-disable react/require-default-props */
  children: PropTypes.node,
  theme: PropTypes.object,
  dir: PropTypes.oneOf(['ltr', 'rtl']),
  instanceCounterMap: PropTypes.instanceOf(Map)
  /* eslint-enable react/require-default-props */
}

InstUISettingsProvider.defaultProps = {
  theme: {}
}

export default InstUISettingsProvider
export { InstUISettingsProvider }
