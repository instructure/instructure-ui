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
import React from 'react'
import { generateInstanceCounterMap } from './generateInstanceCounterMap'
import { DeterministicIdContext } from './DeterministicIdContext'
type DeterministicIdProviderValue = Map<string, number>
type DeterministicIdProviderProps = React.PropsWithChildren<{
  instanceCounterMap?: DeterministicIdProviderValue
}>

const defaultContextValue = generateInstanceCounterMap()

/**
 * ---
 * category: components/utilities
 * ---
 * This is utility component for wrapping components with `DeterministicIdContext.Provider`
 * See detailed documentation about how to use it: [InstUISettingsProvider](/#InstUISettingsProvider)
 */

const DeterministicIdContextProvider = ({
  children,
  instanceCounterMap
}: DeterministicIdProviderProps) => {
  return (
    <DeterministicIdContext.Provider value={instanceCounterMap!}>
      {children}
    </DeterministicIdContext.Provider>
  )
}
DeterministicIdContextProvider.defaultProps = {
  instanceCounterMap: defaultContextValue
}

export { DeterministicIdContextProvider }

export type { DeterministicIdProviderValue }
