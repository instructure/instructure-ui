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
import { querySelector } from './query-helpers'

export function bindElementToEvents (element, events) {
  if (element instanceof Element) {
    return Object.entries(events).reduce((bound, [key, fn]) => {
      if (['keyDown', 'keyPress', 'keyUp'].includes(key)) {
        // eslint-disable-next-line no-param-reassign
        bound[key] = fireKeyboardEvent.bind(null, element, fn)
      } else if (key === 'focus') {
        // eslint-disable-next-line no-param-reassign
        bound[key] = fireFocusEvent.bind(null, element, fn)
      } else if (key === 'click') {
        // eslint-disable-next-line no-param-reassign
        bound[key] = fireClickEvent.bind(null, element, fn)
      } else {
        // eslint-disable-next-line no-param-reassign
        bound[key] = fireDOMEvent.bind(null, element, fn)
      }
      return bound
    }, {})
  } else {
    throw new Error(`[ui-test-utils] could not bind events to invalid Element: ${element}`)
  }
}

function fireDOMEvent (element, fn, init, options = { timeout: 0 }) {
  const fireEvent = fn.bind(null, element)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(fireEvent(init))
      } catch (e) {
        reject(e)
      }
    }, options.timeout)
  })
}

function fireClickEvent (element, fn, init, options = { timeout: 0, clickable: true })  {
  let clickable = element

  if (options.clickable) {
    clickable = querySelector(element, { clickable: true })
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (clickable instanceof Element) {
          const fireEvent = fn.bind(null, clickable)
          resolve(fireEvent(init))
        } else {
          reject(
            new Error(`[ui-test-utils] could not fire a 'click' event on an element that is not 'clickable'`)
          )
        }
      } catch (e) {
        reject(e)
      }
    }, options.timeout)
  })
}



function fireFocusEvent (element, fn, init, options = { timeout: 0, focusable: true }) {
  let focusable = element

  if (options.focusable) {
    focusable = querySelector(element, { focusable: true })
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (focusable instanceof Element)  {
          if (init) {
            const fireEvent = fn.bind(null, focusable)

            console.warn(`[ui-test-utils] passing FocusEvent initilization prevents programmatic focus.
        Test event handlers (with event initialization) and focus state behavior separately.
        Note: this means that .focused will be false unless you call .focus without event initialization.`)

            resolve(fireEvent(init))
          } else {
            // We need to call Element.focus here because firing the FocusEvent doesn't actually move focus.
            resolve(focusable.focus())
          }
        } else {
          reject(
            new Error(`[ui-test-utils] could not fire a 'focus' event on an element that is not 'focusable': ${element}`)
          )
        }
      } catch (e) {
        reject(e)
      }
    }, options.timeout)
  })

}

function fireKeyboardEvent (element, fn, whichKey, init, options = { timeout: 0, focusable: true }) {
  let focusable = element

  if (options.focusable) {
    focusable = querySelector(element, { focusable: true })
  }

  const keyCode = (typeof whichKey === 'string') ? keycode(whichKey) : whichKey
  const key = (typeof whichKey === 'number') ? keycode(whichKey) : whichKey

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (focusable instanceof Element) {
          const fireEvent = fn.bind(null, focusable)
          resolve(fireEvent({
            ...init,
            key,
            which: keyCode,
            keyCode
          }))
        } else {
          reject(
            new Error(`[ui-test-utils] could not fire a ${key} event on an element that is not 'focusable': ${element}`)
          )
        }
      } catch (e) {
        reject(e)
      }
    }, options.timeout)
  })
}
