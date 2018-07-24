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
const ReactDOM = require('react-dom')
const sinon = require('sinon')
const chai = require('chai')
const { cloneElement } = require('react')
const { StyleSheet } = require('glamor/lib/sheet')

const { ReactWrapper, mount } = require('./enzymeWrapper')

const realSetTimeout = setTimeout
const realConsoleError = console.error

const override = function (object, methodName, extra) {
  // eslint-disable-next-line no-param-reassign, wrap-iife
  object[methodName] = (function (original, after) {
    return function () {
      const result = original && original.apply(this, arguments)
      after.apply(this, arguments)
      return result
    }
  })(object[methodName], extra)
}

// this is a hack so that we can test for prop type validation errors in our tests
const overrideConsoleError = function (firstMessage, ...rest) {
  if (typeof firstMessage === 'string' && firstMessage.startsWith('Warning:')) {
    throw new Error(`Unexpected React Warning: ${firstMessage}`)
  }

  return realConsoleError(firstMessage, ...rest)
}

class Testbed {
  constructor (subject) {
    this.subject = subject
    this.sandbox = sinon.createSandbox()

    beforeEach(this.setup.bind(this))
    afterEach(this.setup.bind(this))
  }

  get wrapper () {
    return new ReactWrapper(this.rootNode, true)
  }

  tick (ms = 300) {
    this.sandbox.clock.tick(ms)
  }

  raf () {
    this.sandbox.clock.runToFrame()
  }

  stub (obj, method, fn) {
    if (typeof fn === 'function') {
      return this.sandbox.stub(obj, method).callsFake(fn)
    } else {
      return this.sandbox.stub()
    }
  }

  spy (obj, method) {
    return this.sandbox.spy(obj, method)
  }

  defer () {
    return realSetTimeout.apply(window, arguments)
  }

  disableCSSTransitions () {
    document.body.classList.add('no-transition')
  }

  enableCSSTransitions () {
    document.body.classList.remove('no-transition')
  }

  setup () {
    this.teardown()

    document.documentElement.setAttribute('dir', 'ltr')
    document.documentElement.setAttribute('lang', 'en-US')

    this.rootNode = document.createElement('div')
    this.rootNode.setAttribute('data-ui-testbed', 'true')
    document.body.appendChild(this.rootNode)

    this.disableCSSTransitions()

    this.sandbox.useFakeTimers()

    console.error = overrideConsoleError
  }

  teardown () {
    this.sandbox.resetHistory()
    this.sandbox.restore()

    this.unmount()

    this.rootNode && this.rootNode.parentNode && this.rootNode.parentNode.removeChild(this.rootNode)
    this.rootNode = document.querySelector('[data-ui-testbed]')
    this.rootNode && this.rootNode.parentNode && this.rootNode.parentNode.removeChild(this.rootNode)
    this.rootNode = null
  }

  unmount () {
    if (this.$instance && typeof this.$instance.unmount === 'function') {
      this.$instance.unmount()
    }

    this.rootNode && ReactDOM.unmountComponentAtNode(this.rootNode)
    this.$instance = null
  }

  setTextDirection (dir) {
    document.documentElement.setAttribute('dir', dir)
  }

  render (props = {}, context) {
    if (!this.subject) {
      return
    }

    if (this.$instance) {
      this.unmount()
    }

    const subject = cloneElement(this.subject, Object.assign({}, this.subject.props, props))

    this.$instance = mount(subject, { attachTo: this.rootNode, context })

    // axe uses setTimeout so we need to call clock.tick here too
    override(ReactWrapper.prototype, 'getA11yViolations', () => {
      this.sandbox.clock && this.sandbox.clock.tick(1000)
    })

    return this.$instance
  }
}

Testbed.init = () => {
  const sheet = new StyleSheet({ speedy: true, maxLength: 40 })

  sheet.inject()
  sheet.insert(`
    .no-transition * {
      transition-property: none !important;
      -o-transition-property: none !important;
      -moz-transition-property: none !important;
      -ms-transition-property: none !important;
      -webkit-transition-property: none !important;

      transform: none !important;
      -o-transform: none !important;
      -moz-transform: none !important;
      -ms-transform: none !important;
      -webkit-transform: none !important;

      animation: none !important;
      -o-animation: none !important;
      -moz-animation: none !important;
      -ms-animation: none !important;
      -webkit-animation: none !important;
    }
  `)

  require('./chaiWrapper')(chai)
  global.sinon = sinon

  // clear the console before rebundling.
  /* eslint-disable no-console */
  if (typeof console.clear === 'function') {
    console.clear()
  }
  /* eslint-enable no-console */

  process.once('unhandledRejection', (error) => {
    console.error(`Unhandled rejection: ${error.stack}`)
    process.exit(1)
  })
}

Testbed.wrap = (element) => {
  return new ReactWrapper(element, true)
}

module.exports = Testbed
