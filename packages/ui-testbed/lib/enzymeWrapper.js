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
const runAxeCheck = require('@instructure/ui-axe-check').default
const { ReactWrapper, mount } = require('enzyme')
const keycode = require('keycode')

ReactWrapper.prototype.getA11yViolations = function (done, options) {
  runAxeCheck(this.getDOMNode(), options).then((result) => {
    if (result instanceof Error) {
      done(result)
    } else {
      done()
    }
  }, done)
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

ReactWrapper.prototype.dispatchNativeKeyboardEvent = function (type, keyCode) {
  const event = document.createEventObject ? document.createEventObject() : document.createEvent('Events')

  if (event.initEvent) {
    event.initEvent(type, true, true)
  }

  event.keyCode = keycode(keyCode)

  this.getDOMNode().dispatchEvent(event)
}

ReactWrapper.prototype.dispatchNativeMouseEvent = function (type, attrs) {
  const event = new MouseEvent(type, attrs)
  const domNode = this.getDOMNode()
  domNode.dispatchEvent(event)
}

ReactWrapper.prototype.keyDown = function (code) {
  const keyCode = keycode(code)
  this.simulate('keyDown', { keyCode: keyCode, key: keyCode, which: keyCode })
}

ReactWrapper.prototype.keyUp = function (code) {
  const keyCode = keycode(code)
  this.simulate('keyUp', { keyCode: keyCode, key: keyCode, which: keyCode })
}

ReactWrapper.prototype.click = function () {
  this.simulate('click')
}

ReactWrapper.prototype.mouseOver = function () {
  this.simulate('mouseOver')
}

ReactWrapper.prototype.mouseOut = function () {
  this.simulate('mouseOut')
}

ReactWrapper.prototype.blur = function () {
  this.simulate('blur')
}

ReactWrapper.prototype.focus = function () {
  this.getDOMNode().focus()
}

ReactWrapper.prototype.focused = function () {
  const domNode = this.getDOMNode()
  return domNode && domNode === document.activeElement
}

ReactWrapper.prototype.setValue = function (value) {
  const domNode = this.getDOMNode()

  this.simulate('focus')

  domNode.value = value

  this.simulate('keyUp')
  this.simulate('keyDown')

  this.simulate('change', { target: { value } })
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

ReactWrapper.prototype.findElementWithText = function (type, text) {
  return this.findWhere(n => n.type() === type && n.text() === text)
}

const originalRef = ReactWrapper.prototype.ref
ReactWrapper.prototype.ref = function () {
  const ref = arguments[0]
  const instance = this.instance()
  // eslint-disable-next-line no-prototype-builtins
  if (instance.hasOwnProperty(ref)) {
    return new ReactWrapper(instance[ref], true)
  } else {
    return originalRef.apply(this, arguments)
  }
}

module.exports = {
  ReactWrapper,
  mount
}
