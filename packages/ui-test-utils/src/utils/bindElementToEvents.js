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

import { isElement } from './isElement'
import { find } from './queries'

export function bindElementToEvents (element, events) {
  return Object.entries(events).reduce((bound, [key, fn]) => {
    if (['keyDown', 'keyPress', 'keyUp'].includes(key)) {
      // eslint-disable-next-line no-param-reassign
      bound[key] = fireKeyboardEvent.bind(null, element, fn)
    } else if (['focus'].includes(key)) {
      // eslint-disable-next-line no-param-reassign
      bound[key] = fireFocusEvent.bind(null, element, fn)
    } else if (['blur'].includes(key)) {
      // eslint-disable-next-line no-param-reassign
      bound[key] = fireBlurEvent.bind(null, element, fn)
    } else if (['click'].includes(key)) {
      // eslint-disable-next-line no-param-reassign
      bound[key] = fireClickEvent.bind(null, element, fn)
    } else if (['dblClick'].includes(key) ||
      key.startsWith('mouse') ||
      key.startsWith('drag') ||
      key.startsWith('touch')
    ) {
      // eslint-disable-next-line no-param-reassign
      bound[key] = firePointerEvent.bind(null, element, fn)
    } else {
      // eslint-disable-next-line no-param-reassign
      bound[key] = fireDOMEvent.bind(null, element, fn)
    }
    return bound
  }, {})
}

function fireDOMEvent (element, fn, init, options = {}) {
  const fireEvent = fn.bind(null, element)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(fireEvent(init))
      } catch (e) {
        reject(e)
      }
    }, 0)
  })
}

async function firePointerEvent (element, fn, init, options = { clickable: true })  {
  let clickable = element

  if (options.clickable) {
    clickable = await find(element, ':clickable')
  }

  if (clickable && typeof clickable.getDOMNode === 'function') {
    clickable = clickable.getDOMNode()
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (isElement(clickable)) {
          const fireEvent = fn.bind(null, clickable)
          resolve(fireEvent(init))
        } else {
          reject(
            new Error(`[ui-test-utils] could not fire a pointer event on an element that is not 'clickable': ${element}`)
          )
        }
      } catch (e) {
        /* istanbul ignore next */
        reject(e)
      }
    }, 0)
  })
}

async function fireClickEvent (element, fn, init, options = { clickable: true, simulate: false })  {
  let clickable = element

  if (options.clickable) {
    clickable = await find(element, ':clickable')
  }

  if (clickable && typeof clickable.getDOMNode === 'function') {
    clickable = clickable.getDOMNode()
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (isElement(clickable)) {
          if (!options.simulate) {
            const fireEvent = fn.bind(null, clickable)
            resolve(fireEvent(init))
          } else {
            resolve(clickable.click())
          }
        } else {
          reject(
            new Error(`[ui-test-utils] could not fire a click event on an element that is not 'clickable': ${element}`)
          )
        }
      } catch (e) {
        /* istanbul ignore next */
        reject(e)
      }
    }, 0)
  })
}

async function fireBlurEvent (element, fn, init, options = { focusable: true, simulate: false }) {
  let focusable = element

  if (options.focusable) {
    focusable = await find(element, ':focusable')
  }

  if (focusable && typeof focusable.getDOMNode === 'function') {
    focusable = focusable.getDOMNode()
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (isElement(focusable))  {
          if (!options.simulate) {
            const fireEvent = fn.bind(null, focusable)

            console.warn(`[ui-test-utils] passing FocusEvent initilization prevents programmatic blur.
        Test event handlers (with event initialization) and focus state behavior separately.
        Note: this means that .focused will be true unless you call .blur without event initialization.`)

            resolve(fireEvent(init))
          } else {
            // We need to call Element.blur here because firing the FocusEvent doesn't actually move focus.
            resolve(focusable.blur())
          }
        } else {
          reject(
            new Error(`[ui-test-utils] could not fire a 'blur' event on an element that is not 'focusable': ${element}`)
          )
        }
      } catch (e) {
        /* istanbul ignore next */
        reject(e)
      }
    }, 0)
  })
}

async function fireFocusEvent (element, fn, init, options = { focusable: true, simulate: false }) {
  let focusable = element

  if (options.focusable) {
    focusable = await find(element, ':focusable')
  }

  if (focusable && typeof focusable.getDOMNode === 'function') {
    focusable = focusable.getDOMNode()
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (isElement(focusable))  {
          if (!init || options.simulate) {
            // We need to call Element.focus here because firing the FocusEvent doesn't actually move focus.
            resolve(focusable.focus())
          } else {
            const fireEvent = fn.bind(null, focusable)

            console.warn(`[ui-test-utils] passing FocusEvent initilization prevents programmatic focus.
        Test event handlers (with event initialization) and focus state behavior separately.
        Note: this means that .focused will be false unless you call .focus without event initialization.`)

            resolve(fireEvent(init))
          }
        } else {
          reject(
            new Error(`[ui-test-utils] could not fire a 'focus' event on an element that is not 'focusable': ${element}`)
          )
        }
      } catch (e) {
        /* istanbul ignore next */
        reject(e)
      }
    }, 0)
  })
}

async function fireKeyboardEvent (element, fn, whichKey, init, options = { focusable: true }) {
  let focusable = element

  if (options.focusable) {
    focusable = await find(element, ':focusable')
  }

  if (focusable && typeof focusable.getDOMNode === 'function') {
    focusable = focusable.getDOMNode()
  }

  const keyCode = (typeof whichKey === 'string') ? keycode(whichKey) : whichKey
  const key = (typeof whichKey === 'number') ? keycode(whichKey) : whichKey

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (isElement(focusable)) {
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
        /* istanbul ignore next */
        reject(e)
      }
    }, 0)
  })
}
