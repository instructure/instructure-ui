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

import sinon, { SinonStub, SinonStubbedInstance } from 'sinon'
import { ReactComponentWrapper } from './reactComponentWrapper'
import initConsole from './initConsole'
import React from 'react'

// Add "sandbox" to the global interface, so TS does not complain about
// global.sandbox
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      sandbox: Sandbox
      // this should not be needed, but the solutions in
      // https://github.com/squidfunk/karma-viewport/issues/35 dont seem to work
      viewport: any
    }
  }
}

/* istanbul ignore next */
class Sandbox {
  private _timeoutIds!: number[]
  private _sandbox!: sinon.SinonSandbox
  private _raf!: number[]
  private _attributes!: { document: Attr[]; body: Attr[] }
  private _addedNodes!: Node[]
  private _observer!: MutationObserver
  private teardownComplete!: boolean

  constructor() {
    // eslint-disable-next-line no-console
    console.info('[ui-test-sandbox] Initializing test sandbox...')
    try {
      // global Mocha hooks
      before(this.init.bind(this))
      beforeEach(this.setup.bind(this))
      afterEach(this.teardown.bind(this))
    } catch (e) {
      console.warn(`[ui-test-sandbox] error initializing test sandbox: ${e}`)
    }
  }

  init() {
    initConsole()

    this._timeoutIds = []
    const originalSetTimeout = global.setTimeout
    if (typeof originalSetTimeout === 'function') {
      // I could not figure out how to type these properly :(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      global.setTimeout = (...args) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const timeoutId = originalSetTimeout(...args)

        this._timeoutIds.push(timeoutId)
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
      mutations.map(
        (mutation) =>
          (this._addedNodes = this._addedNodes.concat(
            Array.from(mutation.addedNodes)
          ))
      )
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

    if (window.fetch != undefined) {
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

    this._observer.observe(document.body, { childList: true })
  }

  async teardown() {
    await ReactComponentWrapper.unmount()

    this._sandbox.restore()

    this._timeoutIds.forEach((timeoutId) => {
      clearTimeout(timeoutId)
    })
    this._timeoutIds = []

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

    this._addedNodes.forEach((node) => {
      if (node && typeof (node as ChildNode).remove === 'function') {
        ;(node as ChildNode).remove()
      }
    })
    this._addedNodes = []

    resetViewport()

    this.teardownComplete = true
  }

  stub<T, K extends keyof T>(
    obj?: T,
    method?: K,
    fn?: (...args: unknown[]) => unknown
  ): SinonStub | SinonStubbedInstance<T> {
    if (!this._sandbox) {
      throw new Error(
        '[ui-test-sandbox] a stub cannot be created outside an `it`, `before`, or `beforeEach` block.'
      )
    }
    if (typeof fn === 'function' && method && obj) {
      return this._sandbox.stub(obj, method).callsFake(fn) // SinonStub
    } else if (method && obj) {
      return this._sandbox.stub(obj, method) // SinonStub
    } else if (obj) {
      return this._sandbox.stub(obj) // SinonStubbedInstance
    }
    return this._sandbox.stub() // SinonStub
  }

  spy<T, K extends keyof T>(obj?: T, method?: K) {
    if (!this._sandbox) {
      throw new Error(
        '[ui-test-sandbox] a spy cannot be created outside an `it`, `before`, or `beforeEach` block.'
      )
    }
    if (obj && method) {
      return this._sandbox.spy<T, K>(obj, method)
    } else if (obj) {
      return this._sandbox.spy(obj as any)
    }
    return this._sandbox.spy()
  }

  mount(
    element: React.ComponentElement<Record<string, unknown>, React.Component>,
    options?: { props?: Record<string, unknown> | undefined }
  ) {
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
function setAttributes(element: HTMLElement, attributes: Attr[] = []) {
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
const sandbox: Sandbox = (global.sandbox = global.sandbox || new Sandbox())

const viewport = sandbox.viewport

const mount = (
  element: React.ComponentElement<Record<string, unknown>, React.Component>,
  options?: { props?: Record<string, unknown> | undefined }
) => sandbox.mount(element, options)

const unmount = sandbox.unmount

// K should be "K extends keyof T" so it can correctly type T's methods.
// but when its set K always extends string, so it never returns SinonStubbedInstance
const stub = <T, K>(
  obj?: T,
  method?: K,
  fn?: (...args: unknown[]) => unknown
): T extends Record<string, any>
  ? K extends string
    ? SinonStub
    : SinonStubbedInstance<T>
  : SinonStub => sandbox.stub(obj, method as unknown as keyof T, fn) as any

const spy = <T, K extends keyof T>(obj?: T, method?: K) =>
  sandbox.spy(obj, method)

export { viewport, mount, unmount, stub, spy }
