import { cloneElement } from 'react'
import $ from 'teaspoon'
import checkA11y from 'tests/util/a11y-check'
import createMockRaf from 'mock-raf'
import keycode from 'keycode'

$.fn.getAttribute = function (attrName) {
  return this
    .dom()
    .getAttribute(attrName)
}

$.fn.dispatchNativeEvent = function (type, attrs) {
  const event = new Event(type)
  this.dom().dispatchEvent(event, attrs)
}

$.fn.keyDown = function (code) {
  const keyCode = keycode(code)
  this.trigger('keyDown', { keyCode: keyCode, key: keyCode, which: keyCode })
}

$.fn.focused = function () {
  return this.dom() === document.activeElement
}

$.fn.getKey = function () {
  return this.unwrap()._reactInternalInstance._currentElement.key.replace('.$', '')
}

let wrappedA11yCheck

const setA11yCheckCallback = function (cb) {
  wrappedA11yCheck = function (node, options) {
    checkA11y(node, options)
    cb()
  }
}
const Assertion = global.chai.Assertion

global.chai.use(function (chai, utils) {
  utils.addMethod(Assertion.prototype, 'accessible', function (done, options = {}) {
    const obj = utils.flag(this, 'object')

    options.onFailure = options.onFailure || function (err, violations) {
      done(new Error(err))
      new Assertion(violations.length).to.equal(0)
    }

    options.onSuccess = options.onSuccess || function () {
      done()
      new Assertion(0).to.equal(0)
    }

    wrappedA11yCheck(obj.dom(), options)
  })
})

export default class ReactTestbed {
  constructor (subject) {
    this.subject = subject

    beforeEach(this.setup.bind(this, subject))
    afterEach(this.teardown.bind(this))
  }

  setup (subject) {
    try {
      this.mockRaf = createMockRaf()

      this.sandbox = sinon.sandbox.create({
        useFakeTimers: true
      })

      setA11yCheckCallback(() => {
        this.sandbox.clock.tick(1000) // so that the setTimeouts in axe-core are called
      })

      this.sandbox.stub(window, 'requestAnimationFrame', this.mockRaf.raf)
      this.sandbox.stub(window, 'cancelAnimationFrame', this.mockRaf.cancel)
    } catch (e) {
      console.warn('Error in test setup: ' + e) // eslint-disable-line no-console
    }
  }

  teardown () {
    try {
      if (this.sandbox && this.sandbox.restore) {
        this.sandbox.restore()
      }

      if (this.$instance && this.$instance.root && this.$instance.unmount) {
        this.$instance.unmount()
      }
    } catch (e) {
      this.rootNode && this.rootNode.remove()
      this.rootNode = undefined

      console.warn('Error in test teardown: ' + e) // eslint-disable-line no-console
    }
  }

  render (props = {}, context) {
    const subject = cloneElement(this.subject, {
      ...this.subject.props,
      ...props
    })
    this.rootNode = document.createElement('div')

    this.$instance = $(subject).render(true, this.rootNode, context)

    // to make sure any transitions are complete:
    this.mockRaf.step(10)
    this.sandbox.clock.tick(1000)

    return this.$instance
  }

  props (props, callback) {
    this.$instance.props(props, () => {
      // to make sure any transitions are complete:
      this.mockRaf.step(10)
      this.sandbox.clock.tick(1000)

      if (typeof callback === 'function') {
        callback()
      }
    })
  }
}

global.createTestbed = function (subject) {
  return new ReactTestbed(subject)
}
