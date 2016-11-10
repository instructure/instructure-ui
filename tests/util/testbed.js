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

global.chai.use(function (chai, utils) {
  utils.addMethod(Assertion.prototype, 'present', function () {
    const obj = utils.flag(this, 'object')
    return new Assertion(obj.dom()).to.exist
  })
})

export default class Testbed {
  constructor (subject) {
    this.subject = subject

    this.sandbox = sinon.sandbox.create()

    beforeEach(this.setup.bind(this))
    afterEach(this.teardown.bind(this))
  }

  setup () {
    this.rootNode = document.createElement('div')
    document.body.appendChild(this.rootNode)

    this.sandbox.useFakeTimers()

    setA11yCheckCallback(() => {
      this.sandbox.clock.tick(1000) // so that the setTimeouts in axe-core are called
    })

    this.sandbox.stub(window, 'requestAnimationFrame', setTimeout)
    this.sandbox.stub(window, 'cancelAnimationFrame', clearTimeout)
  }

  teardown () {
    this.sandbox.restore()

    try {
      if (this.$instance && this.$instance.root && this.$instance.unmount) {
        this.$instance.unmount()
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

    const tick = () => {
      this.sandbox.clock.tick(1000)
    }

    const subject = cloneElement(this.subject, {
      ...this.subject.props,
      ...props
    })

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
  return new Testbed(subject)
}
