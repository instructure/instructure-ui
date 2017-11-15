const { ReactWrapper, mount } = require('enzyme')
const keycode = require('keycode')

const checkA11y = require('./checkA11y')

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

ReactWrapper.prototype.focus = function () {
  this.getDOMNode().focus()
}

ReactWrapper.prototype.focused = function () {
  const domNode = this.getDOMNode()
  return domNode && domNode === document.activeElement
}

ReactWrapper.prototype.setValue = function (value) {
  this.simulate('focus')
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

ReactWrapper.prototype.getA11yViolations = function (options, callback) {
  checkA11y(this.getDOMNode(), options, callback)
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
