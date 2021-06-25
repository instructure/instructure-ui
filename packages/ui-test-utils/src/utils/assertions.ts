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

import React, { ReactInstance } from 'react'
import { findDOMNode } from 'react-dom'

import {
  elementToString,
  wrapQueryResult,
  isElement,
  matches
} from '@instructure/ui-test-queries'
import { WrappedRef } from '@instructure/ui-test-sandbox/src/utils/reactComponentWrapper'
import { QueryOrHelperType } from '@instructure/ui-test-queries/src/utils/bindElementToUtilities'

type AssertionParams = {
  wrapper?: QueryOrHelperType
  markup: () => string
  flag?: any
  arg1?: any
  arg2?: any
  arg3?: any
  sig?: string
  inspect?: any //ChaiUtils.inspect
}
type AssertionMethod = (arg: AssertionParams) => void

export default function assertions(
  chai: Chai.ChaiStatic,
  utils: Chai.ChaiUtils
) {
  const { flag, inspect } = utils
  const { Assertion } = chai

  function wrapObj(obj: ReactInstance | undefined | Element | WrappedRef) {
    if (obj && typeof (obj as WrappedRef).getDOMNode === 'function') {
      return obj as unknown as QueryOrHelperType
    }

    let node

    if (isElement(obj)) {
      node = obj as Element
    } else if (React.isValidElement(obj)) {
      node = findDOMNode(obj as ReactInstance)
    }

    if (node) {
      return wrapQueryResult(node as Element)
    }
    return undefined
  }

  function addAssertion(name: string, assertion: AssertionMethod) {
    // @ts-expect-error don't know how to type this..
    if (Assertion.prototype[name]) {
      overwriteMethod(name, assertion)
    } else {
      addMethod(name, assertion)
    }
  }

  function overwriteProperty(name: string, assertion: AssertionMethod) {
    Assertion.overwriteProperty(
      name,
      function (_super?: (...args: any[]) => any) {
        return wrapOverwriteAssertion(assertion, _super!)
      }
    )
  }

  function overwriteMethod(name: string, assertion: AssertionMethod) {
    Assertion.overwriteMethod(name, function (_super) {
      return wrapOverwriteAssertion(assertion, _super)
    })
  }

  function addMethod(name: string, assertion: AssertionMethod) {
    Assertion.addMethod(name, wrapAssertion(assertion))
  }

  function addChainableMethod(name: string, assertion: AssertionMethod) {
    Assertion.addChainableMethod(name, wrapAssertion(assertion))
  }

  function overwriteChainableMethod(name: string, assertion: AssertionMethod) {
    Assertion.overwriteChainableMethod(
      name,
      function (_super) {
        return wrapOverwriteAssertion(assertion, _super)
      },
      function (_super?: () => unknown) {
        return function (this: unknown) {
          _super!.call(this)
        }
      }
    )
  }

  function wrapOverwriteAssertion(
    assertion: AssertionMethod,
    _super: (...args: any[]) => any
  ) {
    return function (this: any, arg1: any, arg2: any) {
      const wrapper = wrapObj(flag(this, 'object'))

      if (!wrapper) {
        // @ts-expect-error TODO this needs new syntax
        // eslint-disable-next-line prefer-rest-params
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

  function wrapAssertion(assertion: AssertionMethod) {
    return function (this: any, arg1: any, arg2: any) {
      const wrapper = wrapObj(flag(this, 'object'))

      const config: Partial<AssertionParams> = {
        wrapper,
        arg1,
        flag,
        inspect
      }

      if (wrapper) {
        config.markup = () => wrapper.toString()
        config.sig = inspect(wrapper.getDOMNode())
      }

      if (arguments.length > 1) {
        config.arg2 = arg2
      }

      assertion.call(this, config as AssertionParams)
    }
  }

  overwriteProperty('not', function (this: Record<string, any>) {
    flag(this, 'negate', true)
  })

  addChainableMethod(
    'exactly',
    function exactly(this: unknown, { flag, arg1 }) {
      flag(this, 'exactlyCount', arg1)
    }
  )

  addAssertion(
    'text',
    function text(
      this: Chai.AssertionPrototype,
      { wrapper, markup, flag, arg1, arg2, sig }
    ) {
      const actual = wrapper!.text() // TODO check if this is this never null

      if (typeof arg1 !== 'undefined') {
        if (flag(this, 'contains')) {
          this.assert(
            actual && actual.indexOf(String(arg1)) > -1,
            () =>
              `expected ${sig} to contain text #{exp}, but it has #{act} ${markup()}`,
            () =>
              `expected ${sig} not to contain text #{exp}, but it has #{act} ${markup()}`,
            arg1,
            actual
          )
        } else {
          this.assert(
            actual && matches(actual, arg1, arg2),
            () =>
              `expected ${sig} to have text #{exp}, but it has #{act} ${markup()}`,
            () =>
              `expected ${sig} to not have text #{exp}, but it has #{act} ${markup()}`,
            arg1,
            actual
          )
        }
      }

      flag(this, 'object', actual)
    }
  )

  overwriteChainableMethod(
    'contain',
    function contain(
      this: Chai.AssertionPrototype,
      { wrapper, markup, arg1, sig }
    ) {
      if (arg1) {
        this.assert(
          wrapper && wrapper.contains(arg1),
          () =>
            `expected ${sig} to contain ${elementToString(arg1)} ${markup()}`,
          () =>
            `expected ${sig} to not contain ${elementToString(
              arg1
            )} ${markup()}`,
          arg1
        )
      }
    }
  )

  addAssertion(
    'className',
    function className(
      this: Chai.AssertionPrototype,
      { wrapper, markup, arg1, sig }: AssertionParams
    ) {
      const actual = wrapper!.classNames() // TODO check if this is this never null

      this.assert(
        wrapper && wrapper.hasClass(arg1),
        () =>
          `expected ${sig} to have a #{exp} class, but it has #{act} ${markup()}`,
        () =>
          `expected ${sig} to not have a #{exp} class, but it has #{act} ${markup()}`,
        arg1,
        actual
      )
    }
  )

  addAssertion(
    'match',
    function match(
      this: Chai.AssertionPrototype,
      { wrapper, markup, arg1, sig }: AssertionParams
    ) {
      this.assert(
        wrapper && wrapper.matches(arg1),
        () => `expected ${sig} to match #{exp} ${markup()}`,
        () => `expected ${sig} to not match #{exp} ${markup()}`,
        arg1
      )
    }
  )

  addAssertion(
    'descendants',
    listAndCountAssertion('descendants', 'descendants')
  )
  addAssertion('children', listAndCountAssertion('children', 'children'))
  addAssertion('ancestors', listAndCountAssertion('ancestors', 'ancestors'))
  addAssertion('parents', listAndCountAssertion('parents', 'parents'))
  addAssertion('attribute', propAndValueAssertion('attribute', 'attribute'))
  addAssertion('style', propAndValueAssertion('style', 'computed CSS style'))
  addAssertion(
    'bounds',
    propAndValueAssertion('bounds', 'bounding client rect')
  )
  addAssertion('tagName', valueAssertion('tagName', 'tag name'))
  addAssertion('id', valueAssertion('id', 'id'))
  addAssertion('visible', booleanAssertion('visible', 'visible'))
  addAssertion('clickable', booleanAssertion('clickable', 'clickable'))
  addAssertion(
    'focus',
    booleanAssertion('containsFocus', 'focused or contain the focused element')
  )
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

function getActual(
  wrapper: QueryOrHelperType | undefined,
  assertion: string,
  ...args: unknown[]
) {
  const methodOrProperty = wrapper
    ? (wrapper as Record<string, unknown>)[assertion]
    : undefined
  if (typeof methodOrProperty === 'function') {
    return methodOrProperty(...args)
  } else {
    return methodOrProperty
  }
}

function propAndValueAssertion(assertion: string, desc: string) {
  return function (this: Chai.AssertionPrototype, args: AssertionParams) {
    const { wrapper, markup, flag, inspect, arg1, arg2, arg3, sig } = args
    const actual = getActual(wrapper, assertion, arg1)

    if (arg2) {
      this.assert(
        actual && matches(actual, arg2, arg3),
        () =>
          `expected ${sig} to have a ${inspect(
            arg1
          )} ${desc} with the value #{exp}, but the value was #{act} ${markup()}`,
        () =>
          `expected ${sig} to not have a ${inspect(
            arg1
          )} ${desc} with the value #{act} ${markup()}`,
        arg2,
        actual
      )
    } else {
      this.assert(
        typeof actual !== 'undefined' && actual !== null,
        () => `expected ${sig} to have a #{exp} ${desc} ${markup()}`,
        () => `expected ${sig} to not have a #{exp} ${desc} ${markup()}`,
        arg1,
        actual
      )
    }

    flag(this, 'object', actual)
  }
}

function booleanAssertion(assertion: string, desc: string) {
  return function (
    this: Chai.AssertionPrototype,
    { wrapper, markup, sig }: AssertionParams
  ) {
    const actual = getActual(wrapper, assertion)
    this.assert(
      actual,
      () => `expected ${sig} to be ${desc} ${markup()}`,
      () => `expected ${sig} to not be ${desc} ${markup()}`,
      undefined
    )
  }
}

function valueAssertion(assertion: string, desc: string) {
  return function (
    this: Chai.AssertionPrototype,
    { wrapper, markup, arg1, arg2, sig }: AssertionParams
  ) {
    const actual = getActual(wrapper, assertion)

    this.assert(
      matches(actual, arg1, arg2),
      () =>
        `expected ${sig} to have a #{exp} ${desc}, but it has #{act} ${markup()}`,
      () =>
        `expected ${sig} to not have a #{exp} ${desc}, but it has #{act} ${markup()}`,
      arg1,
      actual
    )
  }
}

function listAndCountAssertion(assertion: string, desc: string) {
  return function (
    this: Chai.AssertionPrototype,
    { wrapper, markup, arg1, sig, flag }: AssertionParams
  ) {
    const exactlyCount = flag(this, 'exactlyCount')
    const actual = getActual(wrapper, assertion, arg1)
    const count = actual.length

    if (exactlyCount || exactlyCount === 0) {
      this.assert(
        count === exactlyCount,
        () =>
          `expected ${sig} to have ${exactlyCount} ${desc} #{exp} but actually found ${count} ${markup()}`,
        () =>
          `expected ${sig} to not have ${exactlyCount} ${desc} #{exp} but actually found ${count} ${markup()}`,
        arg1
      )
    } else {
      this.assert(
        count > 0,
        () => `expected ${sig} to have ${desc} #{exp} ${markup()}`,
        () => `expected ${sig} to not have ${desc} #{exp} ${markup()}`,
        arg1
      )
    }
  }
}
