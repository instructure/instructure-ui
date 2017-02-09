import { cloneElement } from 'react'
import { mount, ReactWrapper } from 'enzyme'
import keycode from 'keycode'

import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme'

import checkA11y from 'tests/util/a11y-check'

const override = function (object, methodName, extra) {
  object[methodName] = (function (original, after) { // eslint-disable-line
    return function () {
      const result = original && original.apply(this, arguments)
      after.apply(this, arguments)
      return result
    }
  })(object[methodName], extra)
}

ReactWrapper.prototype.unwrap = function () {
  return this.node
}

ReactWrapper.prototype.getAttribute = function (attrName) {
  return this.getDOMNode().getAttribute(attrName)
}

ReactWrapper.prototype.dispatchNativeEvent = function (type, attrs) {
  const event = new Event(type)
  const domNode = this.getDOMNode()

  domNode.dispatchEvent(event, attrs)
}

ReactWrapper.prototype.keyDown = function (code) {
  const keyCode = keycode(code)
  this.simulate('keyDown', { keyCode: keyCode, key: keyCode, which: keyCode })
}

ReactWrapper.prototype.focused = function () {
  const domNode = this.getDOMNode()
  return domNode && (domNode === document.activeElement)
}

ReactWrapper.prototype.getKey = function () {
  return this.key()
}

ReactWrapper.prototype.getComputedStyle = function () {
  const domNode = this.getDOMNode()
  return domNode && window && window.getComputedStyle(domNode)
}

ReactWrapper.prototype.tagName = function () {
  const domNode = this.getDOMNode()
  return domNode && domNode.tagName.toUpperCase()
}

ReactWrapper.prototype.findText = function (text) {
  return this.findWhere(n => n.text() === text)
}

ReactWrapper.prototype.getA11yViolations = function (options, callback) {
  checkA11y(this.getDOMNode(), options, callback)
}

const originalRef = ReactWrapper.prototype.ref
ReactWrapper.prototype.ref = function () {
  const ref = arguments[0]
  const instance = this.instance()
  if (instance.hasOwnProperty(ref)) {
    return new ReactWrapper(instance[ref], true)
  } else {
    return originalRef.apply(this, arguments)
  }
}

const Assertion = global.chai.Assertion
global.chai.use(function (chai, utils) {
  utils.addMethod(Assertion.prototype, 'accessible', function (done, options = {}) {
    const obj = utils.flag(this, 'object')

    obj.getA11yViolations(options, (result) => {
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
  utils.addProperty(Assertion.prototype, 'present', function () {
    const obj = utils.flag(this, 'object')
    return new Assertion(obj.getDOMNode()).to.exist
  })
})

global.chai.use(require('chai-string'))

export default class Testbed {
  constructor (subject) {
    this.subject = subject
    this.sandbox = sinon.sandbox.create()

    beforeEach(this.setup.bind(this))
    afterEach(this.teardown.bind(this))
  }

  /* eslint-disable max-len */
  static testImage = 'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='
  /* eslint-enable max-len */

  static wrap (element) {
    return new ReactWrapper(element, true)
  }

  setup () {
    ApplyTheme.setDefaultTheme('canvas')

    this.rootNode = document.createElement('div')
    document.body.appendChild(this.rootNode)

    this.sandbox.useFakeTimers()
    this.sandbox.stub(window, 'requestAnimationFrame', setTimeout)
    this.sandbox.stub(window, 'cancelAnimationFrame', clearTimeout)
  }

  teardown () {
    this.sandbox.restore()

    try {
      if (this.$instance && typeof this.$instance.unmount === 'function') {
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

    const subject = cloneElement(this.subject, {
      ...this.subject.props,
      ...props
    })

    this.$instance = mount(subject, { attachTo: this.rootNode, context })

    // call tick after methods that would cause a re-render/trigger a transition
    const { clock } = this.sandbox
    const tick = () => clock.tick(1000)

    override(ReactWrapper.prototype, 'setProps', tick)
    override(ReactWrapper.prototype, 'setState', tick)
    override(ReactWrapper.prototype, 'setContext', tick)
    override(ReactWrapper.prototype, 'unmount', tick)

    // axe uses setTimeout so we need to call clock.tick here too
    override(ReactWrapper.prototype, 'getA11yViolations', tick)

    tick()

    return this.$instance
  }
}

global.Testbed = Testbed
