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

const sinon = require('sinon')
const { cloneElement } = require('react')
const { StyleSheet } = require('glamor/lib/sheet')

const { ReactWrapper, mount } = require('./enzymeWrapper')

const realSetTimeout = setTimeout

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

class Testbed {
  constructor (subject) {
    this.subject = subject
    this.sandbox = sinon.sandbox.create()

    beforeEach(this.setup.bind(this))
    afterEach(this.teardown.bind(this))
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
    this.rootNode = document.createElement('div')
    document.body.appendChild(this.rootNode)
    this.disableCSSTransitions()

    this.sandbox.useFakeTimers()
  }

  teardown () {
    this.sandbox.resetHistory()
    this.sandbox.restore()

    try {
      if (this.$instance && typeof this.$instance.unmount === 'function') {
        this.$instance.unmount()
        this.$instance = null
      }
    } catch (e) {
      const { type, name } = this.subject || {}
      const s = (type && (type.displayName || type.name)) || name
      console.warn(`Error in test teardown for ${s}: ${e}`) // eslint-disable-line no-console
    }

    this.rootNode && this.rootNode.remove()
    this.rootNode = undefined
  }

  render (props = {}, context) {
    if (!this.subject) {
      return
    }

    if (this.$instance) {
      const { type, name } = this.subject || {}
      const s = (type && (type.displayName || type.name)) || name
      console.warn(
        // eslint-disable-line no-console
        `Testbed.render called more than once in the same test for ${s} !!`
      )
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

  require('./initConsole')()
  require('./chaiWrapper')(global.chai)
  global.sinon = sinon
}

Testbed.wrap = (element) => {
  return new ReactWrapper(element, true)
}

module.exports = Testbed
