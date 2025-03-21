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

import { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@emotion/react'

import { TextDirectionContext } from '@instructure/ui-i18n'
import { DeterministicIdContextProvider } from '@instructure/ui-react-utils'

import { getTheme } from '../getTheme'

import type { ThemeOrOverride } from '../EmotionTypes'
import type { DeterministicIdProviderValue } from '@instructure/ui-react-utils'
import type { AsElementType } from '@instructure/shared-types'

type InstUIProviderProps = {
  children?: React.ReactNode

  /**
   * A full theme or an override object
   */
  theme?: ThemeOrOverride

  /**
   * @deprecated the `instanceCounterMap` prop is deprecated. You don't need to supply the
   * `instanceCounterMap` to the component. It handles it internally.
   *
   * A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) which keeps track of
   * specific InstUI components. (generally this is used for deterministic id generation for [SSR](/#server-side-rendering))
   */
  instanceCounterMap?: DeterministicIdProviderValue
} & (
  | {
      /**
       * The text direction to use in the descendants. If not provided, it uses the following in this priority order:
       *   - The value given in a parent `TextDirectionContext`
       *   - The `dir` prop of `document.documentElement` or its `direction` CSS prop
       *   - The default `ltr`
       */
      dir: 'ltr' | 'rtl'
      /**
       *  @deprecated remove in v11
       *  The element type to render as
       */
      as?: AsElementType
    }
  | {
      dir?: never
      /**
       *  @deprecated remove in v11
       *  The element type to render as
       */
      as?: never
    }
)

/**
 * ---
 * category: components/utilities
 * ---
 * @module InstUISettingsProvider
 */
function InstUISettingsProvider({
  children,
  theme = {},
  dir,
  instanceCounterMap,
  as
}: InstUIProviderProps) {
  const finalDir = dir || useContext(TextDirectionContext)

  if (process.env.NODE_ENV !== 'production' && finalDir === 'auto') {
    console.warn(
      "'auto' is not an supported value for the 'dir' prop. Please pass 'ltr' or 'rtl'"
    )
  }

  let providers = (
    <DeterministicIdContextProvider instanceCounterMap={instanceCounterMap}>
      <ThemeProvider theme={getTheme(theme)}>
        <TextDirectionContext.Provider value={finalDir}>
          {children}
        </TextDirectionContext.Provider>
      </ThemeProvider>
    </DeterministicIdContextProvider>
  )

  if (dir) {
    const Element = as || 'span'
    providers = <Element dir={finalDir}>{providers}</Element>
  } else if (as && process.env.NODE_ENV !== 'production') {
    console.warn(
      "The 'as' property should be used in conjunction with the 'dir' property!"
    )
  }

  return providers
}

InstUISettingsProvider.propTypes = {
  /* eslint-disable react/require-default-props */
  children: PropTypes.node,
  theme: PropTypes.object,
  dir: PropTypes.oneOf(['ltr', 'rtl']),
  instanceCounterMap: PropTypes.instanceOf(Map),
  as: PropTypes.string
  /* eslint-enable react/require-default-props */
}

export default InstUISettingsProvider
export { InstUISettingsProvider }
