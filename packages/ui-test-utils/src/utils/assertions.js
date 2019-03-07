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
import { elementToString } from './elementToString'
import { wrapQueryResult } from './queryResult'
import { isElement } from './isElement'
import { matches } from './matchers'

export default function assertions (chai, utils) {
  const { flag, inspect } = utils
  const { Assertion } = chai

  function wrapObj (obj) {
    if (isElement(obj)) {
      return wrapQueryResult(obj)
    } else if (obj && typeof obj.getDOMNode === 'function') {
      return obj
    }
  }

  function addAssertion (name, assertion) {
    if (Assertion.prototype[name]) {
      overwriteMethod(name, assertion)
    } else {
      addMethod(name, assertion)
    }
  }

  function overwriteProperty (name, assertion) {
    Assertion.overwriteProperty(name, function (_super) {
      return wrapOverwriteAssertion(assertion, _super)
    })
  }

  function overwriteMethod (name, assertion) {
    Assertion.overwriteMethod(name, function (_super) {
      return wrapOverwriteAssertion(assertion, _super)
    })
  }

  function addMethod (name, assertion) {
    Assertion.addMethod(name, wrapAssertion(assertion))
  }

  function addChainableMethod (name, assertion) {
    Assertion.addChainableMethod(name, wrapAssertion(assertion))
  }

  function overwriteChainableMethod (name, assertion) {
    Assertion.overwriteChainableMethod(name, function (_super) {
      return wrapOverwriteAssertion(assertion, _super)
    }, function (_super) {
      return function () {
        _super.call(this)
      }
    })
  }

  function wrapOverwriteAssertion (assertion, _super) {
    return function (arg1, arg2) {
      const wrapper = wrapObj(flag(this, 'object'))
      if (!wrapper) {
        return _super.apply(this, arguments)
      }
      assertion.call(this, {
        markup: () => wrapper.toString(),
        sig: inspect(wrapper.getDOMNode()),
        wrapper,
        arg1,
        arg2,
        flag,
        inspect
      })
    }
  }

  function wrapAssertion (assertion) {
    return function (arg1, arg2) {
      const wrapper = wrapObj(flag(this, 'object'))
      const config = {
        markup: () => wrapper.toString(),
        sig: inspect(wrapper.getDOMNode()),
        wrapper,
        arg1,
        flag,
        inspect
      }
      if (arguments.length > 1) {
        config.arg2 = arg2
      }
      assertion.call(this, config)
    }
  }

  overwriteProperty('not', function () {
    flag(this, 'negate', true)
  })

  addChainableMethod('exactly', function exactly ({ flag, arg1 }) {
    flag(this, 'exactlyCount', arg1)
  })

  addAssertion('text', function text ({ wrapper, markup, flag, arg1, arg2, sig }) {
    const actual = wrapper.text()

    if (typeof arg1 !== 'undefined') {
      if (flag(this, 'contains')) {
        this.assert(
          actual.indexOf(String(arg1)) > -1,
          () => `expected ${sig} to contain text #{exp}, but it has #{act} ${markup()}`,
          () => `expected ${sig} not to contain text #{exp}, but it has #{act} ${markup()}`,
          arg1,
          actual
        )
      } else {
        this.assert(
          matches(actual, String(arg1), arg2),
          () => `expected ${sig} to have text #{exp}, but it has #{act} ${markup()}`,
          () => `expected ${sig} to not have text #{exp}, but it has #{act} ${markup()}`,
          arg1,
          actual
        )
      }
    }

    flag(this, 'object', actual)
  })

  overwriteChainableMethod('contain', function contain ({ wrapper, markup, arg1, sig }) {
    this.assert(
      wrapper.contains(arg1),
      () => `expected ${sig} to contain ${elementToString(arg1)} ${markup()}`,
      () => `expected ${sig} to not contain ${elementToString(arg1)} ${markup()}`,
      arg1
    )
  })

  addAssertion('className', function className ({ wrapper, markup, arg1, sig }) {
    const actual = wrapper.classNames()

    this.assert(
      wrapper.hasClass(arg1),
      () => `expected ${sig} to have a #{exp} class, but it has #{act} ${markup()}`,
      () => `expected ${sig} to not have a #{exp} class, but it has #{act} ${markup()}`,
      arg1,
      actual
    )
  })

  addAssertion('match', function match ({ wrapper, markup, arg1, sig }) {
    this.assert(
      wrapper.matches(arg1),
      () => `expected ${sig} to match #{exp} ${markup()}`,
      () => `expected ${sig} to not match #{exp} ${markup()}`,
      arg1
    )
  })

  addAssertion('visible', booleanAssertion('visible', 'visible'))
  addAssertion('descendants', listAndCountAssertion('descendants', 'descendants'))
  addAssertion('children', listAndCountAssertion('children', 'children'))
  addAssertion('ancestors', listAndCountAssertion('ancestors', 'ancestors'))
  addAssertion('parents', listAndCountAssertion('parents', 'parents'))
  addAssertion('attribute', propAndValueAssertion('attribute', 'attribute'))
  addAssertion('style', propAndValueAssertion('style', 'computed CSS style'))
  addAssertion('bounds', propAndValueAssertion('bounds', 'bounding client rect'))
  addAssertion('id', valueAssertion('id', 'id'))
  addAssertion('visible', booleanAssertion('visible', 'visible'))
  addAssertion('clickable', booleanAssertion('clickable', 'clickable'))
  addAssertion('focus', booleanAssertion('containsFocus', 'focused or contain the focused element'))
  addAssertion('focused', booleanAssertion('focused', 'focused'))
  addAssertion('focusable', booleanAssertion('focusable', 'focusable'))
  addAssertion('tabbable', booleanAssertion('tabbable', 'tabbable'))
  addAssertion('checked', booleanAssertion('checked', 'checked'))
  addAssertion('selected', booleanAssertion('selected', 'selected'))
  addAssertion('disabled', booleanAssertion('disabled', 'disabled'))
  addAssertion('enabled', booleanAssertion('enabled', 'enabled'))
  addAssertion('readonly', booleanAssertion('readonly', 'readonly'))
  addAssertion('accessible', booleanAssertion('accessible', 'accessible'))
  addAssertion('role', valueAssertion('role', 'role'))
  addAssertion('title', valueAssertion('title', 'title'))
  addAssertion('value', valueAssertion('value', 'value'))
  addAssertion('label', valueAssertion('label', 'label'))
}

function propAndValueAssertion (assertion, desc) {
  return function (args) {
    const { wrapper, markup, flag, inspect, arg1, arg2, arg3, sig } = args
    const actual = wrapper[assertion](arg1)

    if (!flag(this, 'negate') || !arg2) {
      this.assert(
        typeof actual !== 'undefined',
        () => `expected ${sig} to have a #{exp} ${desc} ${markup()}`,
        () => `expected ${sig} to not have a #{exp} ${desc} ${markup()}`,
        arg1
      )
    }

    if (arg2) {
      this.assert(
        matches(actual, arg2, arg3),
        () => `expected ${sig} to have a ${inspect(arg1)} ${desc} with the value #{exp}, but the value was #{act} ${markup()}`,
        () => `expected ${sig} to not have a ${inspect(arg1)} ${desc} with the value #{act} ${markup()}`,
        arg2,
        actual
      )
    }

    flag(this, 'object', actual)
  }
}

function booleanAssertion (assertion, desc) {
  return function ({ wrapper, markup, sig }) {
    this.assert(
      wrapper[assertion](),
      () => `expected ${sig} to be ${desc} ${markup()}`,
      () => `expected ${sig} to not be ${desc} ${markup()}`
    )
  }
}

function valueAssertion (assertion, desc) {
  return function ({ wrapper, markup, arg1, arg2, sig }) {
    const actual = wrapper[assertion]()

    this.assert(
      matches(wrapper[assertion](), arg1, arg2),
      () => `expected ${sig} to have a #{exp} ${desc}, but it has #{act} ${markup()}`,
      () => `expected ${sig} to not have a #{exp} ${desc}, but it has #{act} ${markup()}`,
      arg1,
      actual
    )
  }
}

function listAndCountAssertion (assertion, desc) {
  return function ({ wrapper, markup, arg1, sig, flag }) {
    const exactlyCount = flag(this, 'exactlyCount')

    if (exactlyCount || exactlyCount === 0) {
      const count = wrapper[assertion](arg1).length

      this.assert(
          count === exactlyCount,
          () => `expected ${sig} to have ${exactlyCount} ${desc} #{exp} but actually found ${count} ${markup()}`,
          () => `expected ${sig} to not have ${exactlyCount} ${desc} #{exp} but actually found ${count} ${markup()}`,
          arg1
      )
    } else {
      this.assert(
          (wrapper[assertion](arg1).length > 0),
          () => `expected ${sig} to have ${desc} #{exp} ${markup()}`,
          () => `expected ${sig} to not have ${desc} #{exp} ${markup()}`,
          arg1
      )
    }
  }
}
