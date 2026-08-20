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

/**
 * @deprecated Id generation no longer uses an instance counter map. Ids are now
 * generated with React's built-in `useId` (see `useDeterministicId` /
 * `withDeterministicId`), which is SSR-safe and hydration-stable without any
 * shared counter. This map is retained only for backwards compatibility and is
 * no longer read; it will be removed in the next major version.
 */
const defaultDeterministicIDMap: DeterministicIdProviderValue = new Map<
  string,
  number
>()

/**
 * @deprecated This context is no longer consumed by the id generation utilities
 * and has no effect. It is retained only for backwards compatibility and will be
 * removed in the next major version.
 */
const DeterministicIdContext = React.createContext(defaultDeterministicIDMap)

export { DeterministicIdContext, defaultDeterministicIDMap }
