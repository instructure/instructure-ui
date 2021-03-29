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
import sinon from 'sinon'

import { ReactComponentWrapper } from './reactComponentWrapper'

import initConsole from './initConsole'

/* istanbul ignore next */
class Sandbox {
  constructor() {
    // eslint-disable-next-line no-console
    console.info('[ui-test-sandbox] Initializing test sandbox...')
    try {
      // global Mocha (or Jest?) hooks
      before(this.init.bind(this))
      beforeEach(this.setup.bind(this))
      afterEach(this.teardown.bind(this))
    } catch (e) {
      console.warn(`[ui-test-sandbox] error initializing test sandbox: ${e}`)
    }
  }

  init() {
    initConsole()

    this._timeouts = []
    const originalSetTimeout = global.setTimeout
    if (typeof originalSetTimeout === 'function') {
      global.setTimeout = (...args) => {
        const timeoutId = originalSetTimeout(...args)
        this._timeouts.push(timeoutId)
        return timeoutId
      }
    }

    this._raf = []
    const originalWindowRequestAnimationFrame = window.requestAnimationFrame
    if (typeof originalWindowRequestAnimationFrame === 'function') {
      window.requestAnimationFrame = (...args) => {
        const requestId = originalWindowRequestAnimationFrame.apply(
          window,
          args
        )
        this._raf.push(requestId)
        return requestId
      }
    }

    this._sandbox = sinon.createSandbox()

    this._attributes = {
      document: [...document.documentElement.attributes],
      body: [...document.body.attributes]
    }

    this._addedNodes = []
    this._observer = new MutationObserver((mutations) => {
      const addedNodes = Array.from(mutations).map((mutation) =>
        Array.from(mutation.addedNodes)
      )
      this._addedNodes = this._addedNodes.concat(addedNodes)
    })

    resetViewport()

    this.teardownComplete = true
  }

  async setup() {
    if (!this.teardownComplete) {
      await this.teardown()
    }

    document.documentElement.setAttribute('dir', 'ltr')
    document.documentElement.setAttribute('lang', 'en-US')

    this._sandbox.restore()

    if (window.fetch) {
      this._sandbox.stub(window, 'fetch').callsFake(() => {
        return Promise.resolve(
          new window.Response(
            JSON.stringify({
              key: 'value'
            }),
            {
              //the fetch API returns a resolved window Response object
              status: 200,
              headers: {
                'Content-type': 'application/json'
              }
            }
          )
        )
      })
    }

    this._observer.observe(document.head, { childList: true })
    this._observer.observe(document.body, { childList: true })
  }

  async teardown() {
    await ReactComponentWrapper.unmount()

    this._sandbox.restore()

    this._timeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId)
    })
    this._timeouts = []

    this._raf.forEach((requestId) => {
      window.cancelAnimationFrame(requestId)
    })
    this._raf = []

    window.localStorage && window.localStorage.clear()
    window.sessionStorage && window.sessionStorage.clear()

    setAttributes(document.documentElement, this._attributes.document)
    setAttributes(document.body, this._attributes.body)

    this._observer.disconnect()
    this._observer.takeRecords()

    this._addedNodes.forEach(
      (node) => node && typeof node.remove === 'function' && node.remove()
    )
    this._addedNodes = []

    resetViewport()

    this.teardownComplete = true
  }

  stub(obj, method, fn) {
    if (!this._sandbox) {
      throw new Error(
        '[ui-test-sandbox] a stub cannot be created outside an `it`, `before`, or `beforeEach` block.'
      )
    }

    if (typeof fn === 'function') {
      return this._sandbox.stub(obj, method).callsFake(fn)
    } else {
      return this._sandbox.stub(obj, method)
    }
  }

  spy(obj, method) {
    if (!this._sandbox) {
      throw new Error(
        '[ui-test-sandbox] a spy cannot be created outside an `it`, `before`, or `beforeEach` block.'
      )
    }

    return this._sandbox.spy(obj, method)
  }

  mount(element, options) {
    return ReactComponentWrapper.mount(element, options)
  }

  unmount() {
    return ReactComponentWrapper.unmount()
  }

  viewport() {
    if (!global.viewport) {
      console.error(
        '[ui-test-sandbox] the `viewport` global has not been configured. See https://github.com/squidfunk/karma-viewport.'
      )
    }
    return global.viewport
  }
}

function resetViewport() {
  if (global.viewport && typeof global.viewport.reset === 'function') {
    global.viewport.reset()
  }
}

/* istanbul ignore next */
function setAttributes(element, attributes = []) {
  if (element && element.attributes) {
    ;[...element.attributes].forEach((attribute) => {
      element.removeAttribute(attribute.name)
    })
    attributes.forEach((attribute) => {
      element.setAttribute(attribute.name, attribute.value)
    })
  }
}

// only allow one Sandbox instance
const sandbox = (global.sandbox = global.sandbox || new Sandbox())
const viewport = sandbox.viewport
const mount = (element, context) => sandbox.mount(element, context)
const unmount = sandbox.unmount
const stub = (obj, method, fn) => sandbox.stub(obj, method, fn)
const spy = (obj, method) => sandbox.spy(obj, method)

export { viewport, mount, unmount, stub, spy }
