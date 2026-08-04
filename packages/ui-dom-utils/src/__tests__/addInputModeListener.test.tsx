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

import { fireEvent } from '@testing-library/dom'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'
import { addInputModeListener } from '../addInputModeListener.js'

describe('addInputModeListener', () => {
  it('should handle input mode changes', async () => {
    const handleInputModeChange = vi.fn()

    await render(
      <div>
        <button id="button-1">hello</button>
        <button>world</button>
      </div>
    )

    const inputModeListener = addInputModeListener({
      onInputModeChange: handleInputModeChange
    })

    const button = page.getByRole('button', { name: 'hello' }).element()

    fireEvent.mouseUp(button)
    expect(inputModeListener.isKeyboardMode()).toBe(false)

    fireEvent.keyDown(button)
    expect(inputModeListener.isKeyboardMode()).toBe(true)
    expect(handleInputModeChange).toHaveBeenCalledTimes(2)

    inputModeListener.remove()

    fireEvent.mouseUp(button)
    expect(inputModeListener.isKeyboardMode()).toBe(true)
    expect(handleInputModeChange).toHaveBeenCalledTimes(2)
  })
})
