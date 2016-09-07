import { cloneElement } from 'react'
import $ from 'teaspoon'
import checkA11y from 'tests/util/a11y-check'
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

$.fn.getPropertyValue = function (property) {
  return window.getComputedStyle(this.dom()).getPropertyValue(property)
}

let wrappedA11yCheck

const setA11yCheckCallback = function (cb) {
  wrappedA11yCheck = function (node, options, done) {
    checkA11y(node, options, done)
    cb()
  }
}

const Assertion = global.chai.Assertion
global.chai.use(function (chai, utils) {
  utils.addMethod(Assertion.prototype, 'accessible', function (done, options = {}) {
    const obj = utils.flag(this, 'object')

    wrappedA11yCheck(obj.dom(), options, function (result) {
      try {
        new Assertion(result.violations.length).to.equal(0)
        done()
      } catch (e) {
        done(result.error)
      }
    })
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
      this.sandbox = sinon.sandbox.create({
        useFakeTimers: true
      })

      setA11yCheckCallback(() => {
        this.sandbox.clock.tick(1000) // so that the setTimeouts in axe-core are called
      })

      this.sandbox.stub(window, 'requestAnimationFrame', setTimeout)
      this.sandbox.stub(window, 'cancelAnimationFrame', clearTimeout)
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
      const displayName = this.subject.type.displayName
      console.warn(`Error in test teardown for ${displayName}: ${e}`) // eslint-disable-line no-console
    }

    this.rootNode && this.rootNode.remove()
    this.rootNode = undefined
  }

  render (props = {}, context) {
    const tick = () => {
      this.sandbox.clock.tick(1000)
    }

    const subject = cloneElement(this.subject, {
      ...this.subject.props,
      ...props
    })

    this.rootNode = document.createElement('div')

    this.$instance = $(subject).render(true, this.rootNode, context)

    const propsFn = this.$instance.props
    const unmountFn = this.$instance.unmount

    this.$instance.props = function (props) {
      const $instance = propsFn.call(this, props)
      tick()
      return $instance
    }

    this.$instance.unmount = function () {
      const $instance = unmountFn.apply(this, arguments)
      tick()
      return $instance
    }

    tick()

    return this.$instance
  }
}

global.createTestbed = function (subject) {
  return new ReactTestbed(subject)
}
