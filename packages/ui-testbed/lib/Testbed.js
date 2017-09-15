const sinon = require('sinon')
const { cloneElement } = require('react')
const mockRaf = require('mock-raf')
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
    this.mockRaf = mockRaf()

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
    this.mockRaf.step()
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

    this.stub(window, 'requestAnimationFrame', this.mockRaf.raf)
    this.stub(window, 'cancelAnimationFrame', this.mockRaf.cancel)

    this.sandbox.useFakeTimers()
  }

  teardown () {
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
      transform: none !important;
      transition: none !important;
      transition-property: none !important;
      animation: none !important;
    }
  `)

  require('./initConsole')()
  require('./chaiWrapper')(global.chai)
}

Testbed.wrap = (element) => {
  return new ReactWrapper(element, true)
}

module.exports = Testbed
