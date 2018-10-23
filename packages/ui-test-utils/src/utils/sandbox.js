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
import fetchMock from 'fetch-mock'

import StyleSheet from '@instructure/ui-stylesheet'

import ReactComponentWrapper from './reactComponentWrapper'

import initConsole from './initConsole'

class Sandbox {
  constructor () {
    initConsole()

    // eslint-disable-next-line
    console.log('[ui-test-utils] Initializing test sandbox...')

    this._sandbox = sinon.createSandbox()

    this._attributes = {
      document: [...document.documentElement.attributes],
      body: [...document.body.attributes]
    }

    this._addedNodes = []
    this._observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        Array.from(mutation.addedNodes).forEach((addedNode) => {
          this._addedNodes.push(addedNode)
        })
      })
    })

    // global mocha beforeEach
    beforeEach(this.setup.bind(this))
  }

  teardown () {
    StyleSheet.flush()

    this._observer.disconnect()

    this._sandbox.resetHistory()
    this._sandbox.restore()

    ReactComponentWrapper.unmount()

    window.localStorage.clear()
    window.sessionStorage.clear()

    setAttributes(document.documentElement, this._attributes.document)
    setAttributes(document.body, this._attributes.body)

    this._addedNodes.forEach((node) => node && typeof node.remove === 'function' && node.remove())
    this._addedNodes = []

    fetchMock.restore()
  }

  setup () {
    this.teardown()

    document.documentElement.setAttribute('dir', 'ltr')
    document.documentElement.setAttribute('lang', 'en-US')

    this._observer.observe(document.head, { childList: true })
    this._observer.observe(document.body, { childList: true })

    // We need to call 'mock' at least once
    // in order to get fetch-mock to error out on unexpected actual fetch calls,
    // so we call it with a bogus path that should never get hit.
    fetchMock.mock('bananas', 'bananas')
  }

  stub (obj, method, fn) {
    if (typeof fn === 'function') {
      return this._sandbox.stub(obj, method).callsFake(fn)
    } else {
      return this._sandbox.stub()
    }
  }

  spy (obj, method) {
    return this._sandbox.spy(obj, method)
  }

  async mount (element, context) {
    return ReactComponentWrapper.mount(element, { context })
  }
}

function setAttributes (element, attributes = []) {
  if (element && element.attributes) {
    [...element.attributes].forEach((attribute) => {
      element.removeAttribute(attribute.name)
    })
    attributes.forEach((attribute) => {
      element.setAttribute(attribute.name, attribute.value)
    })
  }
}

// only allow one Sandbox instance
const sandbox = new Sandbox()
const mount = (element, context) => sandbox.mount(element, context)
const stub = (obj, method, fn) => sandbox.stub(obj, method, fn)
const spy = (obj, method) => sandbox.spy(obj, method)

export {
  mount,
  stub,
  spy
}
