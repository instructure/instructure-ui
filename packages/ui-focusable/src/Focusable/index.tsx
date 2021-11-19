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

import { cloneElement, Component } from 'react'

import {
  addInputModeListener,
  addEventListener,
  containsActiveElement,
  findFocusable
} from '@instructure/ui-dom-utils'
import { logWarn as warn } from '@instructure/console'

import { propTypes, allowedProps, FocusableState } from './props'
import type { FocusableProps } from './props'
import { createChainedFunction } from '@instructure/ui-utils'

type HTMLElementWithType = HTMLElement & {
  type?: keyof typeof Focusable.inputTypes
}

/**
---
category: components/utilities
---
@tsProps
**/
class Focusable extends Component<FocusableProps, FocusableState> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    children: null
  }

  static inputTypes = {
    text: true,
    search: true,
    url: true,
    tel: true,
    email: true,
    password: true,
    number: true,
    date: true,
    month: true,
    week: true,
    time: true,
    datetime: true,
    'datetime-local': true
  }

  _focusListener: { remove(): void } | null = null
  _blurListener: { remove(): void } | null = null
  _inputModeListener: {
    isKeyboardMode(): boolean
    remove(): void
  } | null = null

  state: FocusableState = {
    focused: false,
    focusable: undefined
  }

  componentDidMount() {
    const { focusable, focused } = this
    this.addFocusableListeners(focused, focusable)
    this._inputModeListener = addInputModeListener({
      onInputModeChange: this.handleInputModeChange
    })
    this.setState({
      focusable,
      focused
    })
  }

  getSnapshotBeforeUpdate(prevProps: FocusableProps) {
    const { render, children } = this.props
    // prevent blur from firing when focusable element is replaced
    if (prevProps.children !== children || prevProps.render !== render) {
      this.removeFocusableListeners()
    }
    return null
  }

  componentDidUpdate() {
    const focusable = this.focusable
    if (!focusable && this.state.focusable) {
      this.removeFocusableListeners()

      this.setState({
        focusable: undefined,
        focused: false
      })
    } else if (focusable !== this.state.focusable) {
      this.removeFocusableListeners()
      if (this.state.focused) {
        ;(focusable as HTMLElement).focus()
      }
      this.addFocusableListeners(this.state.focused, focusable)
      this.setState({ focusable })
    } else {
      this.addFocusableListeners(this.state.focused, focusable)
    }
  }

  componentWillUnmount() {
    if (this._inputModeListener) {
      this._inputModeListener.remove()
      this._inputModeListener = null
    }
    this.removeFocusableListeners()
  }

  addFocusableListeners(focused: boolean, focusable?: HTMLElement) {
    if (!focusable) return

    if (focused && !this._blurListener) {
      this._blurListener = addEventListener(
        focusable,
        'blur',
        this.handleBlur,
        true
      )
    } else if (!this._focusListener) {
      this._focusListener = addEventListener(
        focusable,
        'focus',
        this.handleFocus,
        true
      )
    }
  }

  removeFocusableListeners() {
    this.removeFocusListener()
    this.removeBlurListener()
  }

  removeFocusListener() {
    if (this._focusListener) {
      this._focusListener.remove()
      this._focusListener = null
    }
  }

  removeBlurListener() {
    if (this._blurListener) {
      this._blurListener.remove()
      this._blurListener = null
    }
  }

  handleInputModeChange = () => {
    this.forceUpdate()
  }

  handleFocus = () => {
    this.removeFocusListener()
    this.setState({ focused: true })
  }

  handleBlur = () => {
    this.removeBlurListener()
    this.setState({ focused: false })
  }

  get focused() {
    return containsActiveElement(this)
  }

  get focusable() {
    const focusableArr = findFocusable(this, () => true, true) || []
    const focusableCount = (focusableArr && focusableArr.length) || 0

    warn(
      focusableCount === 1,
      `[Focusable] Exactly one focusable child is required (${focusableCount} found).`
    )

    const focusable = focusableArr ? focusableArr[0] : false

    if (focusable && typeof (focusable as HTMLElement).focus === 'function') {
      return focusable as HTMLElement
    } else {
      return undefined
    }
  }

  get focusVisible() {
    const { focusable, focused } = this.state
    return this.isFocusVisible(focused, focusable)
  }

  focus() {
    const { focusable } = this
    if (focusable) {
      focusable.focus()
    }
  }

  ref: Element | null = null

  attachRef = (el: Element) => {
    this.ref = el
  }

  isFocusVisible(focused: boolean, focusable?: HTMLElementWithType) {
    if (!focusable || !focused) return false

    // always show focus for keyboard input mode
    if (this._inputModeListener && this._inputModeListener.isKeyboardMode())
      return true
    // note: the type property exist on input fields like HtmlInputElement
    const { tagName, type, isContentEditable } = focusable

    if (tagName == 'INPUT' && Focusable.inputTypes[type!]) {
      return true
    }
    if (tagName == 'TEXTAREA') {
      return true
    }
    if (isContentEditable) {
      return true
    }
    return false
  }

  render() {
    const { children, render = children } = this.props
    const { focusable, focused } = this.state

    if (typeof render === 'function') {
      const rendered = render({
        focused,
        focusable,
        focusVisible: this.isFocusVisible(focused, focusable),
        attachRef: this.attachRef
      })
      return cloneElement(rendered, {
        ref: rendered.ref
          ? createChainedFunction(rendered.ref, this.attachRef)
          : this.attachRef
      })
    } else {
      return null
    }
  }
}

export default Focusable
export { Focusable }
