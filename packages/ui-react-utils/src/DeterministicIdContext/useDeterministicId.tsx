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
import { generateId } from '@instructure/ui-utils'
import { DeterministicIdContext } from './DeterministicIdContext'

/**
 * A React hook that provides deterministic ID generation for functional components.
 *
 * This hook is the functional component equivalent of the `withDeterministicId` decorator.
 * It uses the `DeterministicIdContext` which is needed for deterministic id generation.
 *
 * The context is there for the users to pass an `instanceCounterMap` Map which is then used
 * in the child components to deterministically create ids for them based on the `instanceCounterMap`.
 * Read more about it here: [SSR guide](https://instructure.design/#server-side-rendering)
 *
 * @param componentName - Optional component name to use as the ID prefix.
 * @returns A function that generates deterministic IDs. The function accepts an optional instanceName parameter.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const deterministicId = useDeterministicId('MyComponent')
 *   const id = deterministicId() // generates: MyComponent___0
 *   const labelId = deterministicId('MyComponent-label') // generates: MyComponent-label___0
 *
 *   return <div id={id}>Content</div>
 * }
 * ```
 */
function useDeterministicId(
  componentName: string
): (instanceName?: string) => string {
  const instanceCounterMap = useContext(DeterministicIdContext)

  return (instanceName = componentName) => {
    return generateId(instanceName, instanceCounterMap)
  }
}

export default useDeterministicId
export { useDeterministicId }
