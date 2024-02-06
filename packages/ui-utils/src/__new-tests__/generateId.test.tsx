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
import '@testing-library/jest-dom'
import { generateId } from '../generateId'

describe('generateId', () => {
  it('should generate unique ids for the same instance', () => {
    const seed = new Map<string, number>()
    const component = 'TestComponent'

    const inst1 = generateId(component, seed)
    const inst2 = generateId(component, seed)

    expect(inst1).not.toEqual(inst2)
  })

  it('should create ids deterministicly', () => {
    const seed1 = new Map<string, number>()
    const component = 'TestComponent'

    // Simulate rendering component: TestComponent
    const render1 = generateId(component, seed1)

    // Suppose we have a refresh, meaning the instanceCounter will be reseted:
    const seed2 = new Map<string, number>()
    const render2 = generateId(component, seed2)

    expect(render1).toEqual(render2)
  })

  it('should not create the same id for the same instance.', () => {
    const counter = new Map<string, boolean>()
    const seed = new Map<string, number>()
    const component = 'TestComponent'

    for (let i = 0; i <= 20000; i++) {
      const id = generateId(component, seed)

      if (!counter.has(id)) {
        counter.set(id, false)
      } else {
        counter.set(id, true)
      }

      expect(counter.get(id)).toBe(false)
    }
  })
})
