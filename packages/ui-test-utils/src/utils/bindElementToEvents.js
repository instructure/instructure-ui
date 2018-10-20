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

import keycode from 'keycode'

export function bindElementToEvents (element, events) {
  if (element instanceof Element) {
    return Object.entries(events).reduce((bound, [key, fn]) => {
      if (['keyDown', 'keyPress', 'keyUp'].includes(key)) {
        // eslint-disable-next-line no-param-reassign
        bound[key] = fireKeyboardEvent.bind(null, fn.bind(null, element))
      } if (key === 'focus') {
        // eslint-disable-next-line no-param-reassign
        bound[key] = fireFocusEvent.bind(null, element, fn.bind(null, element))
      } else {
        bound[key] = fn.bind(null, element) // eslint-disable-line no-param-reassign
      }
      return bound
    }, {})
  } else {
    console.warn('[ui-test-utils] could not bind events to invalid Element')
  }
}

function fireFocusEvent (element, fireEvent, init) {
  if (init) {
    fireEvent(init)
    console.warn(`[ui-test-utils] passing FocusEvent initilization prevents programmatic focus.
Test event handlers (with event initialization) and focus state behavior separately.
Note: this means that .focused will be false unless you call .focus without event initialization.`)
  } else {
    // We need to call Element.focus here because firing the FocusEvent doesn't actually move focus.
    element.focus()
  }
}

function fireKeyboardEvent (fireEvent, whichKey, init) {
  const keyCode = (typeof whichKey === 'string') ? keycode(whichKey) : whichKey
  const key = (typeof whichKey === 'number') ? keycode(whichKey) : whichKey

  fireEvent({
    ...init,
    key,
    which: keyCode,
    keyCode
  })
}
