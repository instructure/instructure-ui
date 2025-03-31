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
import type { DeterministicIdProviderValue } from './DeterministicIdContextProvider'

declare global {
  // eslint-disable-next-line no-var
  var __INSTUI_GLOBAL_INSTANCE_COUNTER__: Map<string, number>
}
const instUIInstanceCounter = '__INSTUI_GLOBAL_INSTANCE_COUNTER__'

/**
 * Returns a global (window-level) instance counter map.
 * This needs to be global so that IDs are unique across application instances,
 * e.g. in module federation applications are loaded as a .js blob, this method
 * makes sure that there are no duplicate IDs across instances.
 */
function generateInstanceCounterMap(): DeterministicIdProviderValue {
  if (globalThis[instUIInstanceCounter]) {
    return globalThis[instUIInstanceCounter]
  }
  const map = new Map<string, number>()
  globalThis[instUIInstanceCounter] = map
  return map
}

const defaultDeterministicIDMap = generateInstanceCounterMap()

const DeterministicIdContext = React.createContext(defaultDeterministicIDMap)

export { DeterministicIdContext, defaultDeterministicIDMap }
